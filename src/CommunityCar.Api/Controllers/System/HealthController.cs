using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.System;

[ApiController]
[Route("api/v1/system/health")]
public class HealthController : ControllerBase
{
    /// <summary>
    /// Basic health check endpoint
    /// </summary>
    [HttpGet]
    public IActionResult GetHealth()
    {
        return Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow });
    }

    /// <summary>
    /// Detailed health check
    /// </summary>
    [HttpGet("detailed")]
    public IActionResult GetDetailedHealth()
    {
        // Implementation would check database, services, etc.
        return Ok(new
        {
            Status = "Healthy",
            Database = "Connected",
            Services = "All running",
            Timestamp = DateTime.UtcNow
        });
    }
}