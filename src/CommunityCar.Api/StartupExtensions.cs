using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace CommunityCar.Api;

public static class StartupExtensions
{
    public static IServiceCollection AddAuth(this IServiceCollection services)
    {
        // Add ASP.NET Identity, JWT
        return services;
    }

    public static IServiceCollection AddEfCore(this IServiceCollection services)
    {
        // Add DbContext
        return services;
    }

    public static IServiceCollection AddSignalR(this IServiceCollection services)
    {
        // Add SignalR
        return services;
    }

    public static IServiceCollection AddAiServices(this IServiceCollection services)
    {
        // Register ML services
        return services;
    }

    public static IServiceCollection AddSerilog(this IServiceCollection services)
    {
        // Configure Serilog
        return services;
    }
}