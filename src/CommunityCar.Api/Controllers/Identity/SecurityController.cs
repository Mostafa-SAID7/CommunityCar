using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using IAuthService = CommunityCar.Application.Interfaces.IAuthService;

namespace CommunityCar.Api.Controllers.Identity;

[ApiController]
[Route("api/v1/auth")]
public class SecurityController(IAuthService authService) : ControllerBase
{
    private readonly IAuthService _authService = authService;

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

    #region Helper Methods

    private string GetCurrentUserId()
    {
        // This would typically get the user ID from the JWT token claims
        // For now, return a placeholder - implement based on your authentication system
        return User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
    }

    #endregion
}