using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace CommunityCar.Api.Swagger;

public static class SwaggerConfiguration
{
    public static IServiceCollection AddCustomSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
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
                },
                License = new OpenApiLicense
                {
                    Name = "MIT License",
                    Url = new Uri("https://opensource.org/licenses/MIT")
                }
            });

            // Add JWT Bearer token support
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "Enter JWT token in the format: Bearer {token}"
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

            // Group endpoints by controller
            options.TagActionsBy(api => new[] { api.GroupName ?? api.ActionDescriptor.RouteValues["controller"] });
            options.DocInclusionPredicate((name, api) => true);

            // Enable XML comments
            var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            if (File.Exists(xmlPath))
            {
                options.IncludeXmlComments(xmlPath);
            }

            // Map IFormFile to binary format for Swagger
            options.MapType<IFormFile>(() => new OpenApiSchema { Type = "string", Format = "binary" });

            // Custom operation filter for file uploads
            options.OperationFilter<FileUploadOperationFilter>();
        });

        return services;
    }

    public static IApplicationBuilder UseCustomSwagger(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "CommunityCar API v1");
            options.RoutePrefix = "swagger";
            options.DocumentTitle = "CommunityCar API Documentation";
            options.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
            options.DefaultModelsExpandDepth(-1); // Hide models section
            options.DisplayRequestDuration();
            options.EnableTryItOutByDefault();
        });

        return app;
    }
}

// Custom operation filter for file uploads
public class FileUploadOperationFilter : Swashbuckle.AspNetCore.SwaggerGen.IOperationFilter
{
    public void Apply(OpenApiOperation operation, Swashbuckle.AspNetCore.SwaggerGen.OperationFilterContext context)
    {
        var fileUploadMime = "multipart/form-data";
        var fileParams = context.MethodInfo.GetParameters()
            .Where(p => p.ParameterType == typeof(IFormFile) || p.ParameterType == typeof(IEnumerable<IFormFile>))
            .ToArray();

        if (!fileParams.Any())
            return;

        // Ensure request body exists
        if (operation.RequestBody == null)
        {
            operation.RequestBody = new OpenApiRequestBody();
        }

        // Add or update the multipart/form-data content
        operation.RequestBody.Content[fileUploadMime] = new OpenApiMediaType
        {
            Schema = new OpenApiSchema
            {
                Type = "object",
                Properties = fileParams.ToDictionary(
                    param => param.Name!,
                    param => new OpenApiSchema
                    {
                        Type = "string",
                        Format = "binary"
                    }
                ),
                Required = fileParams.Select(param => param.Name!).ToHashSet()
            }
        };
    }
}