using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using IAuthService = CommunityCar.Application.Interfaces.IAuthService;
using CommunityCar.Shared.DTOs.Identity;

namespace CommunityCar.Api.Controllers.Identity;

[ApiController]
[Route("api/v1/auth")]
public class PasswordController(IAuthService authService) : ControllerBase
{
    private readonly IAuthService _authService = authService;

    #region Password Management

    /// <summary>
    /// Change current user's password
    /// </summary>
    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword([FromBody] CommunityCar.Domain.Interfaces.ChangePasswordRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = GetCurrentUserId();
        var success = await _authService.ChangePasswordAsync(userId, request);

        if (!success)
            return BadRequest("Failed to change password");

        return Ok(new { Message = "Password changed successfully" });
    }

    /// <summary>
    /// Request password reset
    /// </summary>
    [HttpPost("forgot-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        var success = await _authService.ForgotPasswordAsync(request.Email);

        if (!success)
            return BadRequest("Failed to send reset email");

        return Ok(new { Message = "If the email exists, a reset link has been sent" });
    }

    /// <summary>
    /// Reset password using token
    /// </summary>
    [HttpPost("reset-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ResetPassword([FromBody] CommunityCar.Domain.Interfaces.ResetPasswordRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var success = await _authService.ResetPasswordAsync(request);

        if (!success)
            return BadRequest("Failed to reset password");

        return Ok(new { Message = "Password reset successfully" });
    }

    /// <summary>
    /// Confirm email address
    /// </summary>
    [HttpPost("confirm-email")]
    [AllowAnonymous]
    public async Task<IActionResult> ConfirmEmail([FromBody] ConfirmEmailRequest request)
    {
        var success = await _authService.ConfirmEmailAsync(request.UserId, request.Token);

        if (!success)
            return BadRequest("Failed to confirm email");

        return Ok(new { Message = "Email confirmed successfully" });
    }

    /// <summary>
    /// Resend email confirmation
    /// </summary>
    [HttpPost("resend-confirmation")]
    [AllowAnonymous]
    public async Task<IActionResult> ResendConfirmation([FromBody] ResendConfirmationRequest request)
    {
        var success = await _authService.ResendConfirmationEmailAsync(request.Email);

        if (!success)
            return BadRequest("Failed to resend confirmation email");

        return Ok(new { Message = "Confirmation email sent" });
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