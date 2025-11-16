using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using IAuthService = CommunityCar.Application.Interfaces.IAuthService;

namespace CommunityCar.Api.Controllers.Identity;

[ApiController]
[Route("api/v1/auth")]
public class ValidationController(IAuthService authService) : ControllerBase
{
    private readonly IAuthService _authService = authService;

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
}