using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.System;

[ApiController]
[Route("api/v1/system/subscription")]
[Authorize]
public class SubscriptionController : ControllerBase
{
    /// <summary>
    /// Get current user's subscription
    /// </summary>
    [HttpGet]
    public IActionResult GetSubscription()
    {
        return Ok(new { Plan = "Premium", Status = "Active", ExpiresAt = "2024-12-31" });
    }

    /// <summary>
    /// Subscribe to a plan
    /// </summary>
    [HttpPost]
    public IActionResult Subscribe([FromBody] object subscription)
    {
        return Ok(new { Message = "Subscription created" });
    }

    /// <summary>
    /// Cancel subscription
    /// </summary>
    [HttpDelete]
    public IActionResult CancelSubscription()
    {
        return Ok(new { Message = "Subscription cancelled" });
    }
}