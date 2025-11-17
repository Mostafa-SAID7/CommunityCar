using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;
using CommunityCar.Domain.Interfaces;
using CommunityCar.Shared.DTOs.Request.Identity;
using CommunityCar.Shared.DTOs.Request.Notifications;
using System.Security.Claims;

namespace CommunityCar.Api.Controllers.v1;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILeaderboardService _leaderboardService;

    public UsersController(IAuthService authService, ILeaderboardService leaderboardService)
    {
        _authService = authService;
        _leaderboardService = leaderboardService;
    }

    #region Profile Management

    /// <summary>
    /// Get current user's profile
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetMyProfile()
    {
        var userId = GetCurrentUserId();
    
        return Ok();
    }

    /// <summary>
    /// Get user profile by ID
    /// </summary>
    [HttpGet("{userId}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserProfile(string userId)
    {
        try
        {
           
            return Ok();
        }
        catch (KeyNotFoundException)
        {
            return NotFound("User not found");
        }
    }

    /// <summary>
    /// Update current user's profile
    /// </summary>
    [HttpPut("me")]
    public async Task<IActionResult> UpdateMyProfile([FromBody] UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = GetCurrentUserId();


        return Ok(new { Message = "Profile updated successfully" });
    }

    /// <summary>
    /// Upload profile picture
    /// </summary>
    [HttpPost("me/profile-picture")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadProfilePicture([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        // Validate file type and size
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
        var extension = Path.GetExtension(file.FileName).ToLower();

        if (!allowedExtensions.Contains(extension))
            return BadRequest("Invalid file type. Only JPG, PNG, and GIF are allowed.");

        if (file.Length > 5 * 1024 * 1024) // 5MB limit
            return BadRequest("File size too large. Maximum size is 5MB.");

        // Implementation would upload to storage service
        // For now, return placeholder response
        var userId = GetCurrentUserId();
        var fileUrl = $"https://storage.example.com/profiles/{userId}/profile{extension}";

        return Ok(new { ProfilePictureUrl = fileUrl });
    }

    /// <summary>
    /// Upload cover picture
    /// </summary>
    [HttpPost("me/cover-picture")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadCoverPicture([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        // Validate file type and size
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
        var extension = Path.GetExtension(file.FileName).ToLower();

        if (!allowedExtensions.Contains(extension))
            return BadRequest("Invalid file type. Only JPG, PNG, and GIF are allowed.");

        if (file.Length > 10 * 1024 * 1024) // 10MB limit
            return BadRequest("File size too large. Maximum size is 10MB.");

        // Implementation would upload to storage service
        // For now, return placeholder response
        var userId = GetCurrentUserId();
        var fileUrl = $"https://storage.example.com/profiles/{userId}/cover{extension}";

        return Ok(new { CoverPictureUrl = fileUrl });
    }

    #endregion

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

    #region Gamification Integration

    /// <summary>
    /// Get current user's leaderboard statistics
    /// </summary>
    [HttpGet("me/stats")]
    public async Task<IActionResult> GetMyStats()
    {
        var userId = GetCurrentUserId();
        var stats = await _leaderboardService.GetUserLeaderboardStatsAsync(Guid.Parse(userId));

        return Ok(stats);
    }

    /// <summary>
    /// Get user's leaderboard statistics
    /// </summary>
    [HttpGet("{userId}/stats")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserStats(string userId)
    {
        var stats = await _leaderboardService.GetUserLeaderboardStatsAsync(Guid.Parse(userId));

        return Ok(stats);
    }

    /// <summary>
    /// Get current user's progression
    /// </summary>
    [HttpGet("me/progression")]
    public async Task<IActionResult> GetMyProgression()
    {
        var userId = GetCurrentUserId();
        var progression = await _leaderboardService.GetUserProgressionAsync(Guid.Parse(userId));

        return Ok(progression);
    }

    /// <summary>
    /// Get user's progression
    /// </summary>
    [HttpGet("{userId}/progression")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserProgression(string userId)
    {
        var progression = await _leaderboardService.GetUserProgressionAsync(Guid.Parse(userId));

        return Ok(progression);
    }

    /// <summary>
    /// Get current user's streak
    /// </summary>
    [HttpGet("me/streak")]
    public async Task<IActionResult> GetMyStreak()
    {
        var userId = GetCurrentUserId();
        var streak = await _leaderboardService.GetUserStreakAsync(Guid.Parse(userId));

        return Ok(streak);
    }

    /// <summary>
    /// Get user's streak
    /// </summary>
    [HttpGet("{userId}/streak")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserStreak(string userId)
    {
        var streak = await _leaderboardService.GetUserStreakAsync(Guid.Parse(userId));

        return Ok(streak);
    }

    /// <summary>
    /// Get current user's community statistics
    /// </summary>
    [HttpGet("me/community-stats")]
    public async Task<IActionResult> GetMyCommunityStats()
    {
        var userId = GetCurrentUserId();
        var stats = await _leaderboardService.GetUserCommunityStatsAsync(Guid.Parse(userId));

        return Ok(stats);
    }

    /// <summary>
    /// Get user's community statistics
    /// </summary>
    [HttpGet("{userId}/community-stats")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserCommunityStats(string userId)
    {
        var stats = await _leaderboardService.GetUserCommunityStatsAsync(Guid.Parse(userId));

        return Ok(stats);
    }

    #endregion

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
        var suggestions = await _leaderboardService.GetLeaderboardAsync(count);

        return Ok(new
        {
            Suggestions = suggestions,
            Count = count
        });
    }

    #endregion

    #region Notification Settings

    /// <summary>
    /// Get current user's notification settings
    /// </summary>
    [HttpGet("me/notification-settings")]
    public async Task<IActionResult> GetNotificationSettings()
    {
        // This would require a notification settings service
        // For now, return placeholder
        return Ok(new
        {
            EmailNotifications = new
            {
                OnNewFollower = true,
                OnAchievement = true,
                OnMention = true,
                OnComment = true,
                OnLike = true,
                OnLeaderboardChange = true,
                OnCompetition = true,
                WeeklyDigest = true,
                Marketing = false
            },
            PushNotifications = new
            {
                OnNewFollower = true,
                OnAchievement = true,
                OnMention = true,
                OnComment = true,
                OnLike = true,
                OnLeaderboardChange = true,
                OnCompetition = true
            },
            QuietHours = new
            {
                Enabled = false,
                Start = "22:00",
                End = "08:00"
            }
        });
    }

    /// <summary>
    /// Update notification settings
    /// </summary>
    [HttpPut("me/notification-settings")]
    public async Task<IActionResult> UpdateNotificationSettings([FromBody] NotificationSettingsUpdateRequest request)
    {
        // Implementation would update notification settings
        // For now, return success
        return Ok(new { Message = "Notification settings updated successfully" });
    }

    #endregion

    #region Privacy Settings

    /// <summary>
    /// Get current user's privacy settings
    /// </summary>
    [HttpGet("me/privacy")]
    public async Task<IActionResult> GetPrivacySettings()
    {
        // This would require privacy settings service
        // For now, return placeholder
        return Ok(new
        {
            IsPrivate = false,
            ShowOnlineStatus = true,
            ShowLastSeen = true,
            AllowMessagesFrom = "everyone", // everyone, followers, none
            AllowTagging = true,
            DataSharing = new
            {
                Analytics = true,
                Marketing = false,
                ThirdParty = false
            }
        });
    }

    /// <summary>
    /// Update privacy settings
    /// </summary>
    [HttpPut("me/privacy")]
    public async Task<IActionResult> UpdatePrivacySettings([FromBody] PrivacySettingsUpdateRequest request)
    {
        // Implementation would update privacy settings
        // For now, return success
        return Ok(new { Message = "Privacy settings updated successfully" });
    }

    #endregion

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

    #region Helper Methods

    private string GetCurrentUserId()
    {
        // This would typically get the user ID from the JWT token claims
        // For now, return a placeholder - implement based on your authentication system
        return User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
    }

    #endregion
}


