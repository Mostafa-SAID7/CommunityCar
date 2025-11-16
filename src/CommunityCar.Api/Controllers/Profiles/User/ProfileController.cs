using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;

namespace CommunityCar.Api.Controllers.v1;

[ApiController]
[Route("api/v1/users")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly IAuthService _authService;

    public ProfileController(IAuthService authService)
    {
        _authService = authService;
    }

    #region Profile Management

    /// <summary>
    /// Get current user's profile
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetMyProfile()
    {
        var userId = GetCurrentUserId();
        var profile = await _authService.GetUserProfileAsync(userId);
        return Ok(profile);
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
            var profile = await _authService.GetUserProfileAsync(userId);
            return Ok(profile);
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
    public async Task<IActionResult> UpdateMyProfile([FromBody] CommunityCar.Application.Interfaces.UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = GetCurrentUserId();
        var success = await _authService.UpdateUserProfileAsync(userId, request);

        if (!success)
            return BadRequest("Failed to update profile");

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

    #region Helper Methods

    private string GetCurrentUserId()
    {
        // This would typically get the user ID from the JWT token claims
        // For now, return a placeholder - implement based on your authentication system
        return User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
    }

    #endregion
}