// System and Microsoft namespaces
using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

// Project-specific namespaces
using AutoMapper;
using Microsoft.OpenApi.Models;
using CommunityCar.Api.Filters;
using CommunityCar.Api.Services;
using CommunityCar.Api.Swagger;
using CommunityCar.Application.Interfaces;
using CommunityCar.Application.Services;
using CommunityCar.Domain.Entities;
using CommunityCar.Domain.Entities.Identity;
using CommunityCar.Infrastructure.Identity.Services;
using CommunityCar.Infrastructure.Persistence;
using CommunityCar.Infrastructure.Persistence.Repositories;
using CommunityCar.ML.Car.Services;
using CommunityCar.Shared.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Validate critical configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Database connection string 'DefaultConnection' not found.");
var googleClientId = builder.Configuration["SocialAuth:Google:ClientId"]
    ?? throw new InvalidOperationException("Google ClientId not configured.");
var googleClientSecret = builder.Configuration["SocialAuth:Google:ClientSecret"]
    ?? throw new InvalidOperationException("Google ClientSecret not configured.");
var facebookAppId = builder.Configuration["SocialAuth:Facebook:AppId"]
    ?? throw new InvalidOperationException("Facebook AppId not configured.");
var facebookAppSecret = builder.Configuration["SocialAuth:Facebook:AppSecret"]
    ?? throw new InvalidOperationException("Facebook AppSecret not configured.");

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Handle circular references
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true;
    });

// Add OpenAPI/Swagger
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CommunityCar API",
        Version = "v1",
        Description = "A comprehensive API for the CommunityCar platform with gamification features",
        Contact = new OpenApiContact
        {
            Name = "CommunityCar Team",
            Email = "support@communitycar.com"
        }
    });
    
    // Add JWT Bearer authentication
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT token (format: Bearer {token})"
    });
    
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
    
    // Ignore circular references and navigation properties
    options.CustomSchemaIds(type => type.FullName?.Replace("+", "."));
    
    // Exclude problematic types from schema generation
    options.IgnoreObsoleteProperties();
    options.UseInlineDefinitionsForEnums();
    
    // Only include controllers in the API project
    options.DocInclusionPredicate((docName, apiDesc) =>
    {
        return apiDesc.GroupName == null || apiDesc.GroupName == docName;
    });
    
    // Exclude domain entities - only use DTOs
    options.SchemaFilter<ExcludeDomainEntitiesSchemaFilter>();
    
    // Suppress schema warnings
    options.IgnoreObsoleteActions();
    
    // Configure to avoid database access during schema generation
    options.UseAllOfToExtendReferenceSchemas();
    options.SupportNonNullableReferenceTypes();

    // Map IFormFile to binary format for Swagger
    options.MapType<IFormFile>(() => new OpenApiSchema { Type = "string", Format = "binary" });
});

// Add DbContext with optimized options
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null);
    }));

// Add Identity with enhanced options
builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

// Add Google and Facebook Authentication with validated configs
builder.Services.AddAuthentication()
    .AddGoogle(options =>
    {
        options.ClientId = googleClientId;
        options.ClientSecret = googleClientSecret;
    })
    .AddFacebook(options =>
    {
        options.AppId = facebookAppId;
        options.AppSecret = facebookAppSecret;
    });

// Register repositories
builder.Services.AddScoped<IRepository<Post>, PostRepository>();

// Register application services
builder.Services.AddScoped<CommunityCar.Domain.Interfaces.IAiSuggestionService, AiSuggestionService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUser, CurrentUserService>();

// Add AutoMapper
var mapperConfig = new MapperConfiguration(cfg =>
{
    cfg.AddProfile<CommunityCar.Application.Mappings.MappingProfile>();
});
var mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton<IMapper>(mapper);

// Add health checks
builder.Services.AddHealthChecks();

// Add CORS (adjust origins as needed)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:4200", "https://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "CommunityCar API v1");
        options.RoutePrefix = "swagger";
        options.DisplayRequestDuration();
        options.EnableDeepLinking();
        options.EnableFilter();
        options.ShowExtensions();
    });
}

// Global exception handling with detailed error responses
app.UseExceptionHandler(options =>
{
    options.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";
        
        var exceptionHandlerPathFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>();
        if (exceptionHandlerPathFeature?.Error != null)
        {
            var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
            logger.LogError(exceptionHandlerPathFeature.Error, "Unhandled exception occurred");
            
            // Return error details in development
            if (app.Environment.IsDevelopment())
            {
                await context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(new
                {
                    error = exceptionHandlerPathFeature.Error.Message,
                    stackTrace = exceptionHandlerPathFeature.Error.StackTrace
                }));
            }
        }
    });
});

// Security headers
app.UseMiddleware<CommunityCar.Api.Middleware.SecurityHeadersMiddleware>();

// Rate limiting
app.UseMiddleware<CommunityCar.Api.Middleware.RateLimitingMiddleware>();

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigins");
app.UseAuthentication();
app.UseAuthorization();

// Map health checks
app.MapHealthChecks("/health");

// Map controllers
app.MapControllers();

app.Run();
