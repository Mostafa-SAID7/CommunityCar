using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using IAuthService = CommunityCar.Application.Interfaces.IAuthService;
using CommunityCar.Application.Interfaces;
using CommunityCar.Domain.Interfaces;
using CommunityCar.Shared.DTOs.Identity;

namespace CommunityCar.Api.Controllers.Identity;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
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
    public async Task<IActionResult> ForgotPassword()
    {
        // Implementation would send reset email
        // For now, just return success
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

    #region Account Management

    /// <summary>
    /// Delete current user's account
    /// </summary>
    [HttpDelete("account")]
    [Authorize]
    public async Task<IActionResult> DeleteAccount([FromBody] DeleteAccountRequest request)
    {
        var userId = GetCurrentUserId();
        var success = await _authService.DeleteAccountAsync(userId, request.Password);

        if (!success)
            return BadRequest("Failed to delete account");

        return Ok(new { Message = "Account deleted successfully" });
    }

    /// <summary>
    /// Update current user's profile
    /// </summary>
    [HttpPut("profile")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] CommunityCar.Domain.Interfaces.UpdateProfileRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = GetCurrentUserId();
        var success = await _authService.UpdateProfileAsync(userId, request);

        if (!success)
            return BadRequest("Failed to update profile");

        return Ok(new { Message = "Profile updated successfully" });
    }

    #endregion

    #region Security

    /// <summary>
    /// Get account security information
    /// </summary>
    [HttpGet("security")]
    [Authorize]
    public async Task<IActionResult> GetSecurityInfo()
    {
        var userId = GetCurrentUserId();
        var securityInfo = await _authService.GetAccountSecurityInfoAsync(userId);

        return Ok(securityInfo);
    }

    /// <summary>
    /// Get active tokens for current user
    /// </summary>
    [HttpGet("tokens")]
    [Authorize]
    public async Task<IActionResult> GetActiveTokens()
    {
        var userId = GetCurrentUserId();
        var tokens = await _authService.GetActiveTokensAsync(userId);

        return Ok(tokens);
    }

    /// <summary>
    /// Revoke a specific token
    /// </summary>
    [HttpDelete("tokens/{tokenId}")]
    [Authorize]
    public async Task<IActionResult> RevokeToken(string tokenId)
    {
        var success = await _authService.RevokeTokenAsync(tokenId);

        if (!success)
            return BadRequest("Failed to revoke token");

        return Ok(new { Message = "Token revoked successfully" });
    }

    /// <summary>
    /// Revoke all tokens for current user
    /// </summary>
    [HttpDelete("tokens")]
    [Authorize]
    public async Task<IActionResult> RevokeAllTokens()
    {
        var userId = GetCurrentUserId();
        var success = await _authService.RevokeAllTokensAsync(userId);

        if (!success)
            return BadRequest("Failed to revoke tokens");

        return Ok(new { Message = "All tokens revoked successfully" });
    }

    #endregion

    #region Validation

    /// <summary>
    /// Check if email is available
    /// </summary>
    [HttpGet("validate/email")]
    [AllowAnonymous]
    public async Task<IActionResult> CheckEmailAvailability([FromQuery] string email)
    {
        var isAvailable = await _authService.IsEmailAvailableAsync(email);
        return Ok(new { Available = isAvailable });
    }

    /// <summary>
    /// Check if username is available
    /// </summary>
    [HttpGet("validate/username")]
    [AllowAnonymous]
    public async Task<IActionResult> CheckUsernameAvailability([FromQuery] string username)
    {
        var isAvailable = await _authService.IsUsernameAvailableAsync(username);
        return Ok(new { Available = isAvailable });
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

