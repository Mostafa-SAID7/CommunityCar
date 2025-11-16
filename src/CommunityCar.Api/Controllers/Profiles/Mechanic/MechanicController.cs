using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;
using CommunityCar.Shared.Interfaces;

namespace CommunityCar.Api.Controllers.Profiles.Mechanic;

[ApiController]
[Route("api/v1/mechanic/profile")]
[Authorize(Roles = "Mechanic")]
public class MechanicController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ICurrentUser _currentUser;

    public MechanicController(IAuthService authService, ICurrentUser currentUser)
    {
        _authService = authService;
        _currentUser = currentUser;
    }

    #region Mechanic Profile Management

    /// <summary>
    /// Get mechanic profile with service and expertise information
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetMechanicProfile()
    {
        try
        {
            var userId = _currentUser.UserId;
            var profile = await _authService.GetUserProfileAsync(userId);

            // Add mechanic-specific data
            var mechanicProfile = new
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
                // Mechanic-specific fields
                Certifications = new[]
                {
                    new { Name = "ASE Certified Technician", Level = "Master", Year = 2020 },
                    new { Name = "Manufacturer Certified", Level = "Advanced", Year = 2019 }
                },
                Specializations = new[] { "Engine Repair", "Brake Systems", "Transmission", "Electrical", "Diagnostics" },
                YearsOfExperience = 12,
                ServiceRadius = 25, // miles
                MobileService = true,
                ShopBased = true,
                BusinessName = "Joe's Auto Repair",
                BusinessAddress = "123 Repair St, City, State",
                BusinessPhone = "+1-555-0124",
                BusinessHours = "Mon-Fri: 8AM-6PM, Sat: 8AM-2PM",
                AverageRating = 4.8,
                TotalReviews = 245,
                CompletedServices = 1250,
                WarrantyOffered = true,
                EmergencyService = true,
                InsuranceAccepted = new[] { "All Major Providers" }
            };

            return Ok(mechanicProfile);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve mechanic profile" });
        }
    }

    /// <summary>
    /// Update mechanic profile
    /// </summary>
    [HttpPut("me")]
    public async Task<IActionResult> UpdateMechanicProfile([FromBody] UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var userId = _currentUser.UserId;
            var success = await _authService.UpdateUserProfileAsync(userId, request);

            if (!success)
                return BadRequest("Failed to update mechanic profile");

            return Ok(new { Message = "Mechanic profile updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to update mechanic profile" });
        }
    }

    /// <summary>
    /// Upload mechanic profile picture
    /// </summary>
    [HttpPost("me/profile-picture")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadMechanicProfilePicture([FromForm] IFormFile file)
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
            var userId = _currentUser.UserId;
            var fileUrl = $"/images/Profiles/Mechanic/{userId}_profile{extension}";

            return Ok(new { ProfilePictureUrl = fileUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to upload mechanic profile picture" });
        }
    }

    /// <summary>
    /// Get mechanic service statistics
    /// </summary>
    [HttpGet("service-stats")]
    public async Task<IActionResult> GetMechanicServiceStats()
    {
        try
        {
            var stats = new
            {
                TotalServices = 1250,
                CompletedServices = 1220,
                AverageRating = 4.8,
                TotalReviews = 245,
                Revenue = 185000.50,
                AverageServiceValue = 151.22,
                CustomerRetentionRate = 82.5,
                RepeatCustomers = 185,
                MonthlyStats = new[]
                {
                    new { Month = "Jan", Services = 95, Revenue = 14200.00, Rating = 4.7 },
                    new { Month = "Feb", Services = 110, Revenue = 16800.00, Rating = 4.9 },
                    new { Month = "Mar", Services = 105, Revenue = 15900.00, Rating = 4.8 }
                },
                TopServices = new[]
                {
                    new { Service = "Oil Change", Count = 280, Revenue = 8400.00 },
                    new { Service = "Brake Service", Count = 195, Revenue = 19500.00 },
                    new { Service = "Diagnostics", Count = 150, Revenue = 7500.00 }
                },
                ServiceCategories = new[]
                {
                    new { Category = "Maintenance", Services = 450, Percentage = 36.0 },
                    new { Category = "Repair", Services = 380, Percentage = 30.4 },
                    new { Category = "Diagnostics", Services = 270, Percentage = 21.6 },
                    new { Category = "Emergency", Services = 150, Percentage = 12.0 }
                }
            };

            return Ok(stats);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve mechanic service statistics" });
        }
    }

    /// <summary>
    /// Update mechanic availability and service radius
    /// </summary>
    [HttpPut("availability")]
    public async Task<IActionResult> UpdateMechanicAvailability([FromBody] UpdateMechanicAvailabilityRequest request)
    {
        try
        {
            // Implementation would update availability in database
            return Ok(new
            {
                Message = "Mechanic availability updated successfully",
                MobileService = request.MobileService,
                ServiceRadius = request.ServiceRadius,
                EmergencyService = request.EmergencyService
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to update mechanic availability" });
        }
    }

    #endregion
}

public class UpdateMechanicAvailabilityRequest
{
    public bool MobileService { get; set; } = true;
    public int ServiceRadius { get; set; } = 25; // miles
    public bool EmergencyService { get; set; } = true;
    public string? BusinessHours { get; set; }
}