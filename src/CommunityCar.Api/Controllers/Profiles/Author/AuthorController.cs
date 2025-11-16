using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Application.Interfaces;
using CommunityCar.Shared.Interfaces;

namespace CommunityCar.Api.Controllers.Profiles.Author;

[ApiController]
[Route("api/v1/author/profile")]
[Authorize(Roles = "Author")]
public class AuthorController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ICurrentUser _currentUser;

    public AuthorController(IAuthService authService, ICurrentUser currentUser)
    {
        _authService = authService;
        _currentUser = currentUser;
    }

    #region Author Profile Management

    /// <summary>
    /// Get author profile with writing and publication information
    /// </summary>
    [HttpGet("me")]
    public async Task<IActionResult> GetAuthorProfile()
    {
        try
        {
            var userId = _currentUser.UserId;
            var profile = await _authService.GetUserProfileAsync(userId);

            // Add author-specific data
            var authorProfile = new
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
                // Author-specific fields
                PenName = "AutoExpert Writer",
                AuthorBio = "Experienced automotive journalist with 8 years of writing about cars, maintenance, and industry trends.",
                Specialties = new[] { "Car Reviews", "Maintenance Guides", "Industry News", "DIY Tutorials" },
                PublishedArticles = 145,
                TotalViews = 250000,
                AverageRating = 4.6,
                BooksPublished = 3,
                YearsWriting = 8,
                Publications = new[]
                {
                    new { Name = "Car & Driver Magazine", Articles = 25 },
                    new { Name = "Auto News", Articles = 18 },
                    new { Name = "Mechanic Monthly", Articles = 12 }
                },
                Awards = new[] { "Best Automotive Writer 2022", "Reader's Choice Award 2023" },
                SocialMedia = new
                {
                    Twitter = "@AutoExpertWriter",
                    LinkedIn = "linkedin.com/in/autoexpert",
                    Website = "https://autoexpertwriter.com"
                }
            };

            return Ok(authorProfile);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve author profile" });
        }
    }

    /// <summary>
    /// Update author profile
    /// </summary>
    [HttpPut("me")]
    public async Task<IActionResult> UpdateAuthorProfile([FromBody] UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var userId = _currentUser.UserId;
            var success = await _authService.UpdateUserProfileAsync(userId, request);

            if (!success)
                return BadRequest("Failed to update author profile");

            return Ok(new { Message = "Author profile updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to update author profile" });
        }
    }

    /// <summary>
    /// Upload author profile picture
    /// </summary>
    [HttpPost("me/profile-picture")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadAuthorProfilePicture([FromForm] IFormFile file)
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
            var fileUrl = $"/images/Profiles/Author/{userId}_profile{extension}";

            return Ok(new { ProfilePictureUrl = fileUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to upload author profile picture" });
        }
    }

    /// <summary>
    /// Get author writing statistics
    /// </summary>
    [HttpGet("writing-stats")]
    public async Task<IActionResult> GetAuthorWritingStats()
    {
        try
        {
            var stats = new
            {
                TotalArticles = 145,
                PublishedThisMonth = 8,
                TotalViews = 250000,
                AverageViewsPerArticle = 1724,
                TotalLikes = 8500,
                TotalShares = 1200,
                AverageRating = 4.6,
                TopPerformingArticles = new[]
                {
                    new { Title = "Top 10 Car Maintenance Tips", Views = 15000, Rating = 4.8 },
                    new { Title = "Electric Car Buying Guide", Views = 12500, Rating = 4.7 },
                    new { Title = "Winter Car Care", Views = 10000, Rating = 4.5 }
                },
                MonthlyStats = new[]
                {
                    new { Month = "Jan", Articles = 12, Views = 22000, Rating = 4.5 },
                    new { Month = "Feb", Articles = 15, Views = 28000, Rating = 4.7 },
                    new { Month = "Mar", Articles = 10, Views = 19000, Rating = 4.6 }
                },
                Categories = new[]
                {
                    new { Category = "Maintenance", Articles = 45, Views = 75000 },
                    new { Category = "Reviews", Articles = 38, Views = 62000 },
                    new { Category = "Guides", Articles = 32, Views = 58000 }
                }
            };

            return Ok(stats);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Failed to retrieve author writing statistics" });
        }
    }

    #endregion
}