using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;
using CommunityCar.Shared.Constants;

namespace CommunityCar.Api.Controllers.Profiles.Vendor;

[ApiController]
[Route("api/v1/vendor/profile")]
[Authorize(Roles = RoleConstants.Vendor)]
public class VendorController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ICurrentUser _currentUser;

    public VendorController(IAuthService authService, ICurrentUser currentUser)
    {
        _authService = authService;
        _currentUser = currentUser;
    }

    #region Vendor Profile Management

    /// <summary>
    /// Get vendor profile with business information
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetVendorProfile()
    {
        try
        {
            var userId = _currentUser.Id;
            var profile = await _authService.GetUserProfileAsync(userId);

            // Add vendor-specific data
            var vendorProfile = new
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
                // Vendor-specific fields
                BusinessName = "AutoParts Pro",
                BusinessType = "Automotive Parts",
                BusinessAddress = "123 Main St, City, State",
                BusinessPhone = "+1-555-0123",
                BusinessEmail = "business@autopartspro.com",
                Website = "https://autopartspro.com",
                IsBusinessVerified = true,
                TotalProducts = 150,
                TotalOrders = 450,
                Rating = 4.8,
                VendorSince = DateTime.UtcNow.AddMonths(-12)
            };

            return Ok(vendorProfile);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve vendor profile" });
        }
    }

    /// <summary>
    /// Update vendor profile
    /// </summary>
    [HttpPut("me")]
    public async Task<IActionResult> UpdateVendorProfile([FromBody] UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var userId = _currentUser.Id;
            var success = await _authService.UpdateUserProfileAsync(userId, request);

            if (!success)
                return BadRequest("Failed to update vendor profile");

            return Ok(new { Message = "Vendor profile updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to update vendor profile" });
        }
    }

    /// <summary>
    /// Upload vendor profile picture
    /// </summary>
    [HttpPost("me/profile-picture")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadVendorProfilePicture([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
        var extension = Path.GetExtension(file.FileName).ToLower();

        if (!allowedExtensions.Contains(extension))
            return BadRequest("Invalid file type. Only JPG and PNG are allowed.");

        if (file.Length > 3 * 1024 * 1024) // 3MB limit
            return BadRequest("File size too large. Maximum size is 3MB.");

        try
        {
            var userId = _currentUser.Id;
            var fileUrl = $"/images/Profiles/Vendor/{userId}_profile{extension}";

            return Ok(new { ProfilePictureUrl = fileUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to upload vendor profile picture" });
        }
    }

    /// <summary>
    /// Get vendor business statistics
    /// </summary>
    [HttpGet("business-stats")]
    public async Task<IActionResult> GetVendorBusinessStats()
    {
        try
        {
            var stats = new
            {
                TotalProducts = 150,
                ActiveProducts = 145,
                TotalOrders = 450,
                PendingOrders = 12,
                CompletedOrders = 438,
                Revenue = 125000.50,
                AverageRating = 4.8,
                TotalReviews = 89,
                MonthlyGrowth = 15.5,
                TopSellingProducts = new[]
                {
                    new { ProductId = "P001", Name = "Brake Pads", Sales = 45 },
                    new { ProductId = "P002", Name = "Oil Filter", Sales = 38 },
                    new { ProductId = "P003", Name = "Spark Plugs", Sales = 32 }
                }
            };

            return Ok(stats);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve vendor business statistics" });
        }
    }

    #endregion
}