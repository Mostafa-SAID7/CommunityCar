using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;
using CommunityCar.Domain.Interfaces;
using System.Security.Claims;

namespace CommunityCar.Api.Controllers.v1;

[ApiController]
[Route("api/v1/users")]
[Authorize]
public class SocialController : ControllerBase
{
    private readonly ILeaderboardService _leaderboardService;

    public SocialController(ILeaderboardService leaderboardService)
    {
        _leaderboardService = leaderboardService;
    }

    #region Social Features

    /// <summary>
    /// Follow a user
    /// </summary>
    [HttpPost("{userId}/follow")]
    public async Task<IActionResult> FollowUser(string userId)
    {
        var currentUserId = GetCurrentUserId();
        var success = await _leaderboardService.FollowUserAsync(Guid.Parse(currentUserId), Guid.Parse(userId));

        if (!success)
            return BadRequest("Failed to follow user");

        return Ok(new { Message = "User followed successfully" });
    }

    /// <summary>
    /// Unfollow a user
    /// </summary>
    [HttpDelete("{userId}/follow")]
    public async Task<IActionResult> UnfollowUser(string userId)
    {
        var currentUserId = GetCurrentUserId();
        var success = await _leaderboardService.UnfollowUserAsync(Guid.Parse(currentUserId), Guid.Parse(userId));

        if (!success)
            return BadRequest("Failed to unfollow user");

        return Ok(new { Message = "User unfollowed successfully" });
    }

    /// <summary>
    /// Check if current user is following another user
    /// </summary>
    [HttpGet("{userId}/is-following")]
    public async Task<IActionResult> IsFollowing(string userId)
    {
        var currentUserId = GetCurrentUserId();
        var isFollowing = await _leaderboardService.IsUserFollowingAsync(Guid.Parse(currentUserId), Guid.Parse(userId));

        return Ok(new { IsFollowing = isFollowing });
    }

    /// <summary>
    /// Get users followed by current user
    /// </summary>
    [HttpGet("me/following")]
    public async Task<IActionResult> GetFollowing([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var currentUserId = GetCurrentUserId();
        var following = await _leaderboardService.GetFollowingAsync(Guid.Parse(currentUserId), pageSize);

        return Ok(new
        {
            Following = following,
            Page = page,
            PageSize = pageSize,
            TotalCount = following.Count()
        });
    }

    /// <summary>
    /// Get followers of current user
    /// </summary>
    [HttpGet("me/followers")]
    public async Task<IActionResult> GetFollowers([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var currentUserId = GetCurrentUserId();
        var followers = await _leaderboardService.GetFollowersAsync(Guid.Parse(currentUserId), pageSize);

        return Ok(new
        {
            Followers = followers,
            Page = page,
            PageSize = pageSize,
            TotalCount = followers.Count()
        });
    }

    /// <summary>
    /// Get followers of a specific user
    /// </summary>
    [HttpGet("{userId}/followers")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserFollowers(string userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var followers = await _leaderboardService.GetFollowersAsync(Guid.Parse(userId), pageSize);

        return Ok(new
        {
            Followers = followers,
            Page = page,
            PageSize = pageSize,
            TotalCount = followers.Count()
        });
    }

    /// <summary>
    /// Get users followed by a specific user
    /// </summary>
    [HttpGet("{userId}/following")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserFollowing(string userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var following = await _leaderboardService.GetFollowingAsync(Guid.Parse(userId), pageSize);

        return Ok(new
        {
            Following = following,
            Page = page,
            PageSize = pageSize,
            TotalCount = following.Count()
        });
    }

    #endregion

    #region Helper Methods

    private string GetCurrentUserId()
    {
        // This would typically get the user ID from the JWT token claims
        // For now, return a placeholder - implement based on your authentication system
        return User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
    }

    #endregion
}