using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.v1;

[ApiController]
[Route("api/v1/users")]
[Authorize]
public class ActivityController : ControllerBase
{
    #region Activity and History

    /// <summary>
    /// Get current user's recent activity
    /// </summary>
    [HttpGet("me/activity")]
    public async Task<IActionResult> GetMyActivity([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        // Implementation would track and return user activity
        // For now, return placeholder
        var activities = new[]
        {
            new { Type = "achievement", Description = "Earned 'First Post' achievement", Timestamp = DateTime.UtcNow.AddHours(-2) },
            new { Type = "follow", Description = "Started following John Doe", Timestamp = DateTime.UtcNow.AddHours(-4) },
            new { Type = "post", Description = "Created a new post", Timestamp = DateTime.UtcNow.AddHours(-6) }
        };

        return Ok(new
        {
            Activities = activities,
            Page = page,
            PageSize = pageSize,
            TotalCount = activities.Length
        });
    }

    /// <summary>
    /// Get user's public activity
    /// </summary>
    [HttpGet("{userId}/activity")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserActivity(string userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        // Implementation would return public activity only
        // For now, return placeholder
        var activities = new[]
        {
            new { Type = "achievement", Description = "Earned an achievement", Timestamp = DateTime.UtcNow.AddHours(-2), IsPublic = true },
            new { Type = "post", Description = "Created a new post", Timestamp = DateTime.UtcNow.AddHours(-6), IsPublic = true }
        }.Where(a => a.IsPublic);

        return Ok(new
        {
            Activities = activities,
            Page = page,
            PageSize = pageSize,
            TotalCount = activities.Count()
        });
    }

    #endregion
}