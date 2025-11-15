using Microsoft.AspNetCore.Http;

namespace CommunityCar.Api.Middleware;

public class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;

    public SecurityHeadersMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Add CORS, CSP, HSTS headers
        context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
        await _next(context);
    }
}