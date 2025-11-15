using CommunityCar.Api.Services;
using CommunityCar.Application.Interfaces;
using CommunityCar.Domain.Entities;
using CommunityCar.Domain.Interfaces;
using CommunityCar.Infrastructure.Identity.Services;
using CommunityCar.Infrastructure.Persistence;
using CommunityCar.ML.Car.Services;
using CommunityCar.Shared.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add OpenAPI/Swagger
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Identity
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// Add Google and Facebook Authentication
builder.Services.AddAuthentication()
    .AddGoogle(options =>
    {
        options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
        options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
    })
    .AddFacebook(options =>
    {
        options.AppId = builder.Configuration["Authentication:Facebook:AppId"];
        options.AppSecret = builder.Configuration["Authentication:Facebook:AppSecret"];
    });

// Register services
builder.Services.AddScoped<CommunityCar.Domain.Interfaces.IAiSuggestionService, AiSuggestionService>();
builder.Services.AddScoped<IPostService, CommunityCar.Application.Services.PostService>();
builder.Services.AddScoped<IAuthService, CommunityCar.Infrastructure.Identity.Services.AuthService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CommunityCar.Api.Services.CurrentUserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();