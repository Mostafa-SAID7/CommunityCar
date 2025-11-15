using CommunityCar.Api.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CommunityCar.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCustomServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Register custom services
        services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
        return services;
    }
}