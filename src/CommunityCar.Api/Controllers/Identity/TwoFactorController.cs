using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using IAuthService = CommunityCar.Application.Interfaces.IAuthService;
using CommunityCar.Shared.DTOs.Request.Identity;

namespace CommunityCar.Api.Controllers.Identity;

[ApiController]
[Route("api/v1/auth")]
public class TwoFactorController(IAuthService authService) : ControllerBase
{
    private readonly IAuthService _authService = authService;

    #region Two-Factor Authentication

    /// <summary>
    /// Enable two-factor authentication
    /// </summary>
    [HttpPost("2fa/enable")]
    [Authorize]
    public async Task<IActionResult> EnableTwoFactor()
    {
        var userId = GetCurrentUserId();
        var result = await _authService.EnableTwoFactorAsync(userId);

        if (!result.Success)
            return BadRequest(new { Errors = result.Errors });

        return Ok(new
        {
            Secret = result.Secret,
            QrCodeUrl = result.QrCodeUrl,
            Message = "Scan the QR code with your authenticator app and enter the code to complete setup"
        });
    }

    /// <summary>
    /// Verify and complete 2FA setup
    /// </summary>
    [HttpPost("2fa/verify")]
    [Authorize]
    public async Task<IActionResult> VerifyTwoFactor([FromBody] VerifyTwoFactorRequest request)
    {
        var userId = GetCurrentUserId();
        var result = await _authService.VerifyTwoFactorCodeAsync(userId, request.Code);

        if (!result.Success)
            return BadRequest(new { Errors = result.Errors });

        return Ok(new { Message = "Two-factor authentication enabled successfully" });
    }

    /// <summary>
    /// Disable two-factor authentication
    /// </summary>
    [HttpPost("2fa/disable")]
    [Authorize]
    public async Task<IActionResult> DisableTwoFactor([FromBody] VerifyTwoFactorRequest request)
    {
        var userId = GetCurrentUserId();
        var result = await _authService.DisableTwoFactorAsync(userId, request.Code);

        if (!result.Success)
            return BadRequest(new { Errors = result.Errors });

        return Ok(new { Message = "Two-factor authentication disabled successfully" });
    }

    /// <summary>
    /// Generate recovery codes for 2FA
    /// </summary>
    [HttpPost("2fa/recovery-codes")]
    [Authorize]
    public async Task<IActionResult> GenerateRecoveryCodes()
    {
        var userId = GetCurrentUserId();
        var codes = await _authService.GenerateTwoFactorRecoveryCodesAsync(userId);

        if (string.IsNullOrEmpty(codes))
            return BadRequest("Failed to generate recovery codes");

        return Ok(new
        {
            Message = "Save these recovery codes in a safe place. Each code can only be used once.",
            RecoveryCodes = codes.Split('\n')
        });
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