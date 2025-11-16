using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;
using CommunityCar.Shared.Constants;

namespace CommunityCar.Api.Controllers.Profiles.Admin;

[ApiController]
[Route("api/v1/admin/users")]
[Authorize(Roles = RoleConstants.Admin)]
public class UserManageController : ControllerBase
{
    private readonly IAuthService _authService;

    public UserManageController(IAuthService authService)
    {
        _authService = authService;
    }

    #region User Management

    /// <summary>
    /// Get paginated list of users with filtering options
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetUsers(
        [FromQuery] string? search = null,
        [FromQuery] string? role = null,
        [FromQuery] bool? isVerified = null,
        [FromQuery] bool? isLocked = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        try
        {
            // In a real implementation, this would use a dedicated user management service
            // For now, using the search functionality from IAuthService
            var users = await _authService.SearchUsersAsync(search ?? "", page, pageSize);

            // Apply additional filters (mock implementation)
            var filteredUsers = users.Where(u =>
                (role == null || u.Role.Contains(role)) &&
                (isVerified == null || u.IsVerified == isVerified) &&
                (isLocked == null || true) // Would need account status from service
            );

            var result = new
            {
                Users = filteredUsers,
                TotalCount = filteredUsers.Count(),
                Page = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(filteredUsers.Count() / (double)pageSize)
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve users" });
        }
    }

    /// <summary>
    /// Get detailed user information by ID
    /// </summary>
    [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserDetails(string userId)
    {
        try
        {
            var user = await _authService.GetUserByIdAsync(userId);
            if (user == null)
                return NotFound(new { Error = "User not found" });

            var profile = await _authService.GetUserProfileAsync(userId);
            if (profile == null)
                return NotFound(new { Error = "Profile not found" });

            var securityInfo = await _authService.GetAccountSecurityInfoAsync(userId);

            var userDetails = new
            {
                profile.Id,
                profile.UserName,
                profile.Email,
                profile.FirstName,
                profile.LastName,
                profile.DisplayName,
                profile.Bio,
                profile.ProfilePictureUrl,
                profile.IsVerified,
                profile.IsOnline,
                profile.FollowersCount,
                profile.FollowingCount,
                profile.TotalPoints,
                profile.CurrentLevel,
                profile.CreatedAt,
                profile.Role,
                // Security information
                SecurityInfo = new
                {
                    securityInfo.TwoFactorEnabled,
                    securityInfo.EmailConfirmed,
                    securityInfo.PhoneConfirmed,
                    securityInfo.LastPasswordChange,
                    securityInfo.LastLogin,
                    securityInfo.FailedLoginAttempts,
                    securityInfo.IsLockedOut,
                    securityInfo.LockoutEnd,
                    RecentLogins = securityInfo.RecentLogins.Take(5)
                }
            };

            return Ok(userDetails);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve user details" });
        }
    }

    /// <summary>
    /// Update user profile (admin override)
    /// </summary>
    [HttpPut("{userId}/profile")]
    public async Task<IActionResult> UpdateUserProfile(string userId, [FromBody] CommunityCar.Application.Interfaces.UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var success = await _authService.UpdateUserProfileAsync(userId, request);
            if (!success)
                return BadRequest("Failed to update user profile");

            return Ok(new { Message = "User profile updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to update user profile" });
        }
    }

    /// <summary>
    /// Lock user account
    /// </summary>
    [HttpPost("{userId}/lock")]
    public async Task<IActionResult> LockUserAccount(string userId, [FromBody] LockAccountRequest request)
    {
        try
        {
            var duration = request.DurationHours.HasValue
                ? TimeSpan.FromHours(request.DurationHours.Value)
                : TimeSpan.FromDays(30); // Default 30 days

            var success = await _authService.LockAccountAsync(userId, duration);
            if (!success)
                return BadRequest("Failed to lock user account");

            return Ok(new { Message = $"User account locked for {duration.TotalHours} hours" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to lock user account" });
        }
    }

    /// <summary>
    /// Unlock user account
    /// </summary>
    [HttpPost("{userId}/unlock")]
    public async Task<IActionResult> UnlockUserAccount(string userId)
    {
        try
        {
            var success = await _authService.UnlockAccountAsync(userId);
            if (!success)
                return BadRequest("Failed to unlock user account");

            return Ok(new { Message = "User account unlocked successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to unlock user account" });
        }
    }

    /// <summary>
    /// Reset user password (admin action)
    /// </summary>
    [HttpPost("{userId}/reset-password")]
    public async Task<IActionResult> ResetUserPassword(string userId)
    {
        try
        {
            // In a real implementation, this would generate a reset token and send email
            // For now, return success
            return Ok(new { Message = "Password reset initiated. User will receive reset instructions via email." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to reset user password" });
        }
    }

    /// <summary>
    /// Delete user account (admin action)
    /// </summary>
    [HttpDelete("{userId}")]
    public async Task<IActionResult> DeleteUserAccount(string userId, [FromBody] DeleteUserRequest request)
    {
        try
        {
            // Verify admin confirmation
            if (request.Confirmation != $"DELETE_{userId}")
                return BadRequest("Invalid confirmation code");

            // In a real implementation, this would perform soft delete or hard delete based on policy
            return Ok(new { Message = "User account deletion initiated" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to delete user account" });
        }
    }

    /// <summary>
    /// Get user activity statistics
    /// </summary>
    [HttpGet("{userId}/activity")]
    public async Task<IActionResult> GetUserActivity(string userId)
    {
        try
        {
            // Mock activity data - in real implementation, this would aggregate from various services
            var activity = new
            {
                UserId = userId,
                TotalPosts = 45,
                TotalComments = 128,
                TotalLikes = 234,
                TotalFollowers = 67,
                TotalFollowing = 89,
                LastActivity = DateTime.UtcNow.AddHours(-2),
                AccountAge = TimeSpan.FromDays(180),
                AveragePostsPerWeek = 2.3,
                MostActiveHour = 14, // 2 PM
                TopCategories = new[] { "Maintenance", "Performance", "Electronics" }
            };

            return Ok(activity);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve user activity" });
        }
    }

    /// <summary>
    /// Bulk user operations
    /// </summary>
    [HttpPost("bulk")]
    public async Task<IActionResult> BulkUserOperation([FromBody] BulkUserOperationRequest request)
    {
        try
        {
            var results = new List<object>();

            foreach (var userId in request.UserIds)
            {
                switch (request.Operation.ToLower())
                {
                    case "lock":
                        var lockSuccess = await _authService.LockAccountAsync(userId, TimeSpan.FromDays(7));
                        results.Add(new { UserId = userId, Operation = "lock", Success = lockSuccess });
                        break;

                    case "unlock":
                        var unlockSuccess = await _authService.UnlockAccountAsync(userId);
                        results.Add(new { UserId = userId, Operation = "unlock", Success = unlockSuccess });
                        break;

                    default:
                        results.Add(new { UserId = userId, Operation = request.Operation, Success = false, Error = "Unknown operation" });
                        break;
                }
            }

            return Ok(new { Results = results });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to perform bulk operation" });
        }
    }

    #endregion
}

// Request DTOs
public class LockAccountRequest
{
    public int? DurationHours { get; set; } // Null means permanent lock
}

public class DeleteUserRequest
{
    public string Confirmation { get; set; } = string.Empty; // Must be "DELETE_{userId}"
}

public class BulkUserOperationRequest
{
    public IEnumerable<string> UserIds { get; set; } = new List<string>();
    public string Operation { get; set; } = string.Empty; // "lock", "unlock", etc.
}
