using Microsoft.AspNetCore.Http;

namespace CommunityCar.Api.Middleware;

public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;

    public RateLimitingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Implement rate limiting on write endpoints
        await _next(context);
    }
}