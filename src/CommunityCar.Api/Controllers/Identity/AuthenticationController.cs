using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using IAuthService = CommunityCar.Application.Interfaces.IAuthService;
using CommunityCar.Shared.DTOs.Identity;

namespace CommunityCar.Api.Controllers.Identity;

[ApiController]
[Route("api/v1/auth")]
public class AuthenticationController(IAuthService authService) : ControllerBase
{
    private readonly IAuthService _authService = authService;

    #region Authentication

    /// <summary>
    /// Register a new user account
    /// </summary>
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] CommunityCar.Domain.Interfaces.RegisterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _authService.RegisterAsync(request);

        if (!result.Success)
            return BadRequest(new { Errors = result.Errors });

        if (result.RequiresEmailConfirmation)
        {
            return Ok(new
            {
                Message = "Registration successful. Please check your email to confirm your account.",
                UserId = result.User?.Id
            });
        }

        return Ok(new
        {
            Message = "Registration successful",
            Token = result.Token,
            RefreshToken = result.RefreshToken,
            ExpiresAt = result.ExpiresAt,
            User = result.User
        });
    }

    /// <summary>
    /// Login with email and password
    /// </summary>
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] CommunityCar.Domain.Interfaces.LoginRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _authService.LoginAsync(request);

        if (!result.Success)
            return BadRequest(new { Errors = result.Errors });

        if (result.RequiresTwoFactor)
        {
            return Ok(new
            {
                Message = "Two-factor authentication required",
                RequiresTwoFactor = true,
                UserId = result.User?.Id
            });
        }

        return Ok(new
        {
            Token = result.Token,
            RefreshToken = result.RefreshToken,
            ExpiresAt = result.ExpiresAt,
            User = result.User
        });
    }

    /// <summary>
    /// Refresh access token using refresh token
    /// </summary>
    [HttpPost("refresh")]
    [AllowAnonymous]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _authService.RefreshTokenAsync(request.RefreshToken);

        if (!result.Success)
            return BadRequest(new { Errors = result.Errors });

        return Ok(new
        {
            Token = result.Token,
            RefreshToken = result.RefreshToken,
            ExpiresAt = result.ExpiresAt
        });
    }

    /// <summary>
    /// Logout current user
    /// </summary>
    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        var userId = GetCurrentUserId();
        var success = await _authService.LogoutAsync(userId);

        if (!success)
            return BadRequest("Logout failed");

        return Ok(new { Message = "Logged out successfully" });
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