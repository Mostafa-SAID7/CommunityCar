using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;
using CommunityCar.Shared.Constants;

namespace CommunityCar.Api.Controllers.Profiles.Expert;

[ApiController]
[Route("api/v1/expert/profile")]
[Authorize(Roles = RoleConstants.Expert)]
public class ExpertController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ICurrentUser _currentUser;

    public ExpertController(IAuthService authService, ICurrentUser currentUser)
    {
        _authService = authService;
        _currentUser = currentUser;
    }

    #region Expert Profile Management

    /// <summary>
    /// Get expert profile with expertise and certification information
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetExpertProfile()
    {
        try
        {
            var userId = _currentUser.Id;
            var profile = await _authService.GetUserProfileAsync(userId);

            // Add expert-specific data
            var expertProfile = new
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
                // Expert-specific fields
                ExpertiseAreas = new[] { "Engine Repair", "Transmission", "Diagnostics", "Performance Tuning" },
                Certifications = new[]
                {
                    new { Name = "ASE Master Technician", Issuer = "ASE", Year = 2020, ValidUntil = 2025 },
                    new { Name = "BMW Master Technician", Issuer = "BMW", Year = 2019, ValidUntil = 2024 }
                },
                YearsOfExperience = 15,
                Specializations = new[] { "German Cars", "Performance Vehicles", "Classic Cars" },
                Rating = 4.9,
                TotalConsultations = 1250,
                SuccessRate = 98.5,
                Languages = new[] { "English", "Spanish" },
                AvailabilityStatus = "Available",
                HourlyRate = 125.00,
                CompletedProjects = 450
            };

            return Ok(expertProfile);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve expert profile" });
        }
    }

    /// <summary>
    /// Update expert profile
    /// </summary>
    [HttpPut("me")]
    public async Task<IActionResult> UpdateExpertProfile([FromBody] UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var userId = _currentUser.Id;
            var success = await _authService.UpdateUserProfileAsync(userId, request);

            if (!success)
                return BadRequest("Failed to update expert profile");

            return Ok(new { Message = "Expert profile updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to update expert profile" });
        }
    }

    /// <summary>
    /// Upload expert profile picture
    /// </summary>
    [HttpPost("me/profile-picture")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadExpertProfilePicture([FromForm] IFormFile file)
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
            var fileUrl = $"/images/Profiles/Expert/{userId}_profile{extension}";

            return Ok(new { ProfilePictureUrl = fileUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to upload expert profile picture" });
        }
    }

    /// <summary>
    /// Get expert performance and consultation statistics
    /// </summary>
    [HttpGet("expert-stats")]
    public async Task<IActionResult> GetExpertStats()
    {
        try
        {
            var stats = new
            {
                TotalConsultations = 1250,
                CompletedConsultations = 1220,
                AverageRating = 4.9,
                TotalReviews = 380,
                SuccessRate = 98.5,
                AverageResponseTime = "2 hours",
                TopSpecializations = new[]
                {
                    new { Area = "Engine Repair", Consultations = 450, Rating = 4.8 },
                    new { Area = "Transmission", Consultations = 320, Rating = 4.9 },
                    new { Area = "Diagnostics", Consultations = 280, Rating = 5.0 }
                },
                MonthlyStats = new[]
                {
                    new { Month = "Jan", Consultations = 45, Revenue = 5625.00, Rating = 4.8 },
                    new { Month = "Feb", Consultations = 52, Revenue = 6500.00, Rating = 4.9 },
                    new { Month = "Mar", Consultations = 48, Revenue = 6000.00, Rating = 5.0 }
                },
                ClientRetentionRate = 85.5,
                RepeatClients = 320
            };

            return Ok(stats);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve expert statistics" });
        }
    }

    /// <summary>
    /// Update expert availability status
    /// </summary>
    [HttpPut("availability")]
    public async Task<IActionResult> UpdateAvailability([FromBody] UpdateAvailabilityRequest request)
    {
        try
        {
            // Implementation would update availability in database
            return Ok(new { Message = $"Availability updated to {request.Status}" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to update availability" });
        }
    }

    #endregion
}

public class UpdateAvailabilityRequest
{
    public string Status { get; set; } = "Available"; // Available, Busy, Offline
    public string? Message { get; set; }
}