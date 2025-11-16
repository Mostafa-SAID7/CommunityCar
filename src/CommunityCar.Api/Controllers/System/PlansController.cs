using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.System;

[ApiController]
[Route("api/v1/system/plans")]
public class PlansController : ControllerBase
{
    /// <summary>
    /// Get all available plans
    /// </summary>
    [HttpGet]
    public IActionResult GetPlans()
    {
        return Ok(new[]
        {
            new { Id = 1, Name = "Basic", Price = 9.99, Features = new[] { "Basic support", "5GB storage" } },
            new { Id = 2, Name = "Premium", Price = 19.99, Features = new[] { "Priority support", "50GB storage", "Advanced features" } }
        });
    }

    /// <summary>
    /// Get plan by ID
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetPlan(int id)
    {
        return Ok(new { Id = id, Name = "Plan Details", Price = 19.99, Description = "Premium features" });
    }
}