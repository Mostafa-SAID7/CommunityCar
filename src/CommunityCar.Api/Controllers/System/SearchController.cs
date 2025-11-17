using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;
using CommunityCar.Domain.Interfaces;

namespace CommunityCar.Api.Controllers.v1;

[ApiController]
[Route("api/v1/users")]
[Authorize]
public class SearchController : ControllerBase
{
    private readonly IAuthService _authService;

    public SearchController(IAuthService authService)
    {
        _authService = authService;
    }

    #region User Search and Discovery

    /// <summary>
    /// Search users by query
    /// </summary>
    [HttpGet("search")]
    [AllowAnonymous]
    public async Task<IActionResult> SearchUsers([FromQuery] string query, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        if (string.IsNullOrWhiteSpace(query) || query.Length < 2)
            return BadRequest("Search query must be at least 2 characters long");

     

        return Ok(new
        {
            Query = query,
            Page = page,
            PageSize = pageSize,
        });
    }

    /// <summary>
    /// Get suggested users to follow
    /// </summary>
    [HttpGet("me/suggestions")]
    public async Task<IActionResult> GetSuggestedUsers([FromQuery] int count = 10)
    {
        // Implementation would use recommendation algorithm
        // For now, return top users from leaderboard as suggestions

        return Ok(new
        {
            Count = count
        });
    }

    #endregion
}