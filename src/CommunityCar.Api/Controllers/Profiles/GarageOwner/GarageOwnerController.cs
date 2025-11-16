using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;
using CommunityCar.Shared.Interfaces;

namespace CommunityCar.Api.Controllers.Profiles.GarageOwner;

[ApiController]
[Route("api/v1/garage-owner/profile")]
[Authorize(Roles = "GarageOwner")]
public class GarageOwnerController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ICurrentUser _currentUser;

    public GarageOwnerController(IAuthService authService, ICurrentUser currentUser)
    {
        _authService = authService;
        _currentUser = currentUser;
    }

    #region Garage Owner Profile Management

    /// <summary>
    /// Get garage owner profile with business information
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetGarageOwnerProfile()
    {
        try
        {
            var userId = _currentUser.Id;
            var profile = await _authService.GetUserProfileAsync(userId);

            // Add garage owner-specific data
            var garageOwnerProfile = new
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
                // Garage owner-specific fields
                GarageName = "Premium Auto Service",
                BusinessLicense = "GARAGE2023001",
                GarageAddress = "456 Service Lane, City, State",
                Phone = "+1-555-0199",
                Email = "service@premiumauto.com",
                Website = "https://premiumauto.com",
                OperatingHours = "Mon-Fri: 8AM-6PM, Sat: 8AM-4PM",
                ServicesOffered = new[] { "Oil Change", "Brake Service", "Engine Repair", "Transmission", "Diagnostics" },
                Certifications = new[] { "ASE Certified", "BBB Accredited", "Insured & Bonded" },
                YearsInBusiness = 12,
                TotalCustomers = 2500,
                AverageRating = 4.7,
                TotalReviews = 180,
                GarageCapacity = 8,
                EmergencyService = true,
                WarrantyOffered = true
            };

            return Ok(garageOwnerProfile);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve garage owner profile" });
        }
    }

    /// <summary>
    /// Update garage owner profile
    /// </summary>
    [HttpPut("me")]
    public async Task<IActionResult> UpdateGarageOwnerProfile([FromBody] UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var userId = _currentUser.Id;
            var success = await _authService.UpdateUserProfileAsync(userId, request);

            if (!success)
                return BadRequest("Failed to update garage owner profile");

            return Ok(new { Message = "Garage owner profile updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to update garage owner profile" });
        }
    }

    /// <summary>
    /// Upload garage owner profile picture
    /// </summary>
    [HttpPost("me/profile-picture")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadGarageOwnerProfilePicture([FromForm] IFormFile file)
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
            var fileUrl = $"/images/Profiles/GarageOwner/{userId}_profile{extension}";

            return Ok(new { ProfilePictureUrl = fileUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to upload garage owner profile picture" });
        }
    }

    /// <summary>
    /// Get garage business statistics
    /// </summary>
    [HttpGet("business-stats")]
    public async Task<IActionResult> GetGarageBusinessStats()
    {
        try
        {
            var stats = new
            {
                TotalAppointments = 1250,
                CompletedServices = 1200,
                Revenue = 185000.50,
                AverageServiceValue = 154.17,
                CustomerRetentionRate = 78.5,
                AverageRating = 4.7,
                TotalReviews = 180,
                MonthlyStats = new[]
                {
                    new { Month = "Jan", Appointments = 95, Revenue = 14500.00, Rating = 4.6 },
                    new { Month = "Feb", Appointments = 110, Revenue = 16800.00, Rating = 4.8 },
                    new { Month = "Mar", Appointments = 105, Revenue = 16200.00, Rating = 4.7 }
                },
                TopServices = new[]
                {
                    new { Service = "Oil Change", Count = 320, Revenue = 9600.00 },
                    new { Service = "Brake Service", Count = 180, Revenue = 18000.00 },
                    new { Service = "Diagnostics", Count = 150, Revenue = 7500.00 }
                },
                PeakHours = new[]
                {
                    new { Hour = "9AM", Appointments = 25 },
                    new { Hour = "10AM", Appointments = 30 },
                    new { Hour = "2PM", Appointments = 28 }
                }
            };

            return Ok(stats);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve garage business statistics" });
        }
    }

    #endregion
}