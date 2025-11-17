using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;
using CommunityCar.Shared.Constants;
using CommunityCar.Domain.Interfaces;
using CommunityCar.Shared.Interfaces;

namespace CommunityCar.Api.Controllers.Profiles.Affiliate;

[ApiController]
[Route("api/v1/affiliate/profile")]
[Authorize(Roles = RoleConstants.Affiliate)]
public class AffiliateController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ICurrentUser _currentUser;

    public AffiliateController(IAuthService authService, ICurrentUser currentUser)
    {
        _authService = authService;
        _currentUser = currentUser;
    }

    #region Affiliate Profile Management

    /// <summary>
    /// Get affiliate profile with marketing information
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetAffiliateProfile()
    {
        return Ok();
    }

    /// <summary>
    /// Update affiliate profile
    /// </summary>
    [HttpPut("me")]
    public async Task<IActionResult> UpdateAffiliateProfile([FromBody] UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok();

    }

    /// <summary>
    /// Upload affiliate profile picture
    /// </summary>
    [HttpPost("me/profile-picture")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadAffiliateProfilePicture([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
        var extension = Path.GetExtension(file.FileName).ToLower();

        if (!allowedExtensions.Contains(extension))
            return BadRequest("Invalid file type. Only JPG and PNG are allowed.");

        if (file.Length > 3 * 1024 * 1024) // 3MB limit
            return BadRequest("File size too large. Maximum size is 3MB.");

        return Ok();

    }

    /// <summary>
    /// Get affiliate performance statistics
    /// </summary>
    [HttpGet("performance")]
    public async Task<IActionResult> GetAffiliatePerformance()
    {
        try
        {
            var performance = new
            {
                TotalClicks = 1250,
                TotalConversions = 45,
                ConversionRate = 3.6,
                CommissionEarned = 1250.75,
                CommissionPending = 450.25,
                AverageCommissionPerConversion = 27.79,
                MonthlyStats = new[]
                {
                    new { Month = "Jan", Clicks = 120, Conversions = 5, Commission = 125.50 },
                    new { Month = "Feb", Clicks = 150, Conversions = 8, Commission = 198.75 },
                    new { Month = "Mar", Clicks = 180, Conversions = 12, Commission = 312.25 }
                },
                TopCampaigns = new[]
                {
                    new { Campaign = "Brake Pads", Clicks = 450, Conversions = 18, Commission = 450.00 },
                    new { Campaign = "Oil Change", Clicks = 380, Conversions = 15, Commission = 375.00 }
                }
            };

            return Ok(performance);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve affiliate performance" });
        }
    }

    #endregion
}