using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Linq;

namespace CommunityCar.Api.Filters;

public class ExcludeDomainEntitiesSchemaFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        // Exclude domain entities from Swagger schema
        var type = context.Type;
        var typeNamespace = type.Namespace;
        
        if (typeNamespace != null && 
            (typeNamespace.Contains("CommunityCar.Domain.Entities") ||
             typeNamespace.Contains("CommunityCar.Domain.Common") ||
             type == typeof(System.Security.Claims.ClaimsPrincipal) ||
             type == typeof(Microsoft.AspNetCore.Http.HttpContext)))
        {
            // Replace with a simple object schema
            schema.Properties?.Clear();
            schema.Type = "object";
            schema.AdditionalProperties = null;
        }
        
        // Remove navigation properties that cause circular references
        if (schema.Properties != null)
        {
            var propertiesToRemove = schema.Properties
                .Where(p => p.Key.Contains("Author") || 
                           p.Key.Contains("Post") || 
                           p.Key.Contains("User") ||
                           p.Key.Contains("Answers") ||
                           p.Key.Contains("Reactions") ||
                           p.Key.Contains("Comments") ||
                           p.Key.Contains("Followers") ||
                           p.Key.Contains("Following"))
                .Select(p => p.Key)
                .ToList();
            
            foreach (var prop in propertiesToRemove)
            {
                schema.Properties.Remove(prop);
            }
        }
    }
}
