using CommunityCar.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var domainRequest = new CommunityCar.Domain.Interfaces.RegisterRequest
        {
            Username = request.Username,
            Email = request.Email,
            Password = request.Password,
            FirstName = request.FirstName ?? string.Empty,
            LastName = request.LastName ?? string.Empty,
            AcceptTerms = request.AcceptTerms
        };
        var result = await _authService.RegisterAsync(domainRequest);
        if (!result.Success)
        {
            return BadRequest(result.Errors);
        }
        return Ok(new { Token = result.Token, RefreshToken = result.RefreshToken });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var domainRequest = new CommunityCar.Domain.Interfaces.LoginRequest
        {
            Email = request.Email,
            Password = request.Password,
            RememberMe = request.RememberMe
        };
        var result = await _authService.LoginAsync(domainRequest);
        if (!result.Success)
        {
            return BadRequest(result.Errors);
        }
        return Ok(new { Token = result.Token, RefreshToken = result.RefreshToken });
    }
}

public class RegisterRequest
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public bool AcceptTerms { get; set; }
}

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public bool RememberMe { get; set; }
}