using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Shared.DTOs.Request.Identity;
using CommunityCar.Domain.Interfaces;

namespace CommunityCar.Api.Controllers.Identity;

[ApiController]
[Route("api/v1/auth")]
public class SocialAuthController(IAuthService authService) : ControllerBase
{
    private readonly IAuthService _authService = authService;

    #region Social Authentication

    /// <summary>
    /// Login with Google OAuth
    /// </summary>
    [HttpPost("google")]
    [AllowAnonymous]
    public async Task<IActionResult> LoginWithGoogle([FromBody] SocialLoginRequest request)
    {
        var result = await _authService.LoginWithGoogleAsync(request.Token);

        if (!result.Success)
            return BadRequest(new { Errors = result.Errors });

        return Ok(new
        {
            Token = result.Token,
            RefreshToken = result.RefreshToken,
            ExpiresAt = result.ExpiresAt,
            User = result.User
        });
    }

    /// <summary>
    /// Login with Facebook OAuth
    /// </summary>
    [HttpPost("facebook")]
    [AllowAnonymous]
    public async Task<IActionResult> LoginWithFacebook([FromBody] SocialLoginRequest request)
    {
        var result = await _authService.LoginWithFacebookAsync(request.AccessToken);

        if (!result.Success)
            return BadRequest(new { Errors = result.Errors });

        return Ok(new
        {
            Token = result.Token,
            RefreshToken = result.RefreshToken,
            ExpiresAt = result.ExpiresAt,
            User = result.User
        });
    }

    /// <summary>
    /// Login with Apple Sign In
    /// </summary>
    [HttpPost("apple")]
    [AllowAnonymous]
    public async Task<IActionResult> LoginWithApple([FromBody] SocialLoginRequest request)
    {
        var result = await _authService.LoginWithAppleAsync(request.IdentityToken);

        if (!result.Success)
            return BadRequest(new { Errors = result.Errors });

        return Ok(new
        {
            Token = result.Token,
            RefreshToken = result.RefreshToken,
            ExpiresAt = result.ExpiresAt,
            User = result.User
        });
    }

    #endregion
}