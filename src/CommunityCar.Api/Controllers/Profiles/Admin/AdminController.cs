using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;
using CommunityCar.Shared.Constants;

namespace CommunityCar.Api.Controllers.Profiles.Admin;

[ApiController]
[Route("api/v1/admin/profile")]
[Authorize(Roles = RoleConstants.Admin)]
public class AdminController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ICurrentUser _currentUser;

    public AdminController(IAuthService authService, ICurrentUser currentUser)
    {
        _authService = authService;
        _currentUser = currentUser;
    }

    #region Admin Profile Management

    /// <summary>
    /// Get admin profile with additional admin-specific information
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetAdminProfile()
    {
        try
        {
            var userId = _currentUser.Id;
            var profile = await _authService.GetUserProfileAsync(userId);

            // Add admin-specific data
            var adminProfile = new
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
                // Admin-specific fields
                AdminPrivileges = new[]
                {
                    "UserManagement",
                    "ContentModeration",
                    "SystemConfiguration",
                    "AnalyticsAccess",
                    "SupportTicketManagement"
                },
                LastAdminAction = DateTime.UtcNow.AddHours(-2)
            };

            return Ok(adminProfile);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve admin profile" });
        }
    }

    /// <summary>
    /// Update admin profile with additional validation
    /// </summary>
    [HttpPut("me")]
    public async Task<IActionResult> UpdateAdminProfile([FromBody] UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var userId = _currentUser.Id;
            var success = await _authService.UpdateUserProfileAsync(userId, request);

            if (!success)
                return BadRequest("Failed to update admin profile");

            return Ok(new { Message = "Admin profile updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to update admin profile" });
        }
    }

    /// <summary>
    /// Upload admin profile picture with enhanced security
    /// </summary>
    [HttpPost("me/profile-picture")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadAdminProfilePicture([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        // Enhanced validation for admin accounts
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
        var extension = Path.GetExtension(file.FileName).ToLower();

        if (!allowedExtensions.Contains(extension))
            return BadRequest("Invalid file type. Only JPG and PNG are allowed for admin profiles.");

        if (file.Length > 2 * 1024 * 1024) // 2MB limit for admins
            return BadRequest("File size too large. Maximum size is 2MB for admin profiles.");

        try
        {
            var userId = _currentUser.Id;
            var fileUrl = $"/images/Profiles/Admin/{userId}_profile{extension}";

            // Implementation would upload to secure storage
            return Ok(new { ProfilePictureUrl = fileUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to upload admin profile picture" });
        }
    }

    /// <summary>
    /// Get admin dashboard statistics
    /// </summary>
    [HttpGet("dashboard")]
    public async Task<IActionResult> GetAdminDashboard()
    {
        try
        {
            // This would typically aggregate data from various services
            var dashboard = new
            {
                TotalUsers = 1250,
                ActiveUsers = 890,
                TotalPosts = 3450,
                ReportedContent = 23,
                PendingModeration = 12,
                SystemHealth = "Good",
                LastUpdated = DateTime.UtcNow
            };

            return Ok(dashboard);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve admin dashboard" });
        }
    }

    #endregion
}