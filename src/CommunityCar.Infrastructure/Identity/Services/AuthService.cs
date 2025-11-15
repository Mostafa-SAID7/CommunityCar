using CommunityCar.Application.Interfaces;
using CommunityCar.Domain.Entities.Identity;
using CommunityCar.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CommunityCar.Infrastructure.Identity.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        IConfiguration configuration,
        ILogger<AuthService> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _logger = logger;
    }

    #region Authentication

    public async Task<AuthResult> RegisterAsync(RegisterRequest request)
    {
        try
        {
            // Validate request
            if (!request.AcceptTerms)
                return AuthResult.Failure(new[] { "Terms and conditions must be accepted" });

            // Check if email/username is available
            if (!await IsEmailAvailableAsync(request.Email))
                return AuthResult.Failure(new[] { "Email is already registered" });

            if (!await IsUsernameAvailableAsync(request.Username))
                return AuthResult.Failure(new[] { "Username is already taken" });

            // Create user
            var user = new User
            {
                UserName = request.Username,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                DisplayName = $"{request.FirstName} {request.LastName}".Trim(),
                PhoneNumber = request.PhoneNumber,
                EmailConfirmed = false,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                return AuthResult.Failure(result.Errors.Select(e => e.Description));
            }

            // Generate email confirmation token
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            _logger.LogInformation("User {UserId} registered successfully", user.Id);

            return new AuthResult
            {
                Success = true,
                User = user,
                RequiresEmailConfirmation = true
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during user registration");
            return AuthResult.Failure(new[] { "Registration failed. Please try again." });
        }
    }

    public async Task<AuthResult> LoginAsync(LoginRequest request)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                return AuthResult.Failure(new[] { "Invalid email or password" });
            }

            // Check if account is locked
            if (await _userManager.IsLockedOutAsync(user))
            {
                return AuthResult.Failure(new[] { "Account is locked. Please try again later." });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            if (!result.Succeeded)
            {
                await _userManager.AccessFailedAsync(user);
                return AuthResult.Failure(new[] { "Invalid email or password" });
            }

            // Reset access failed count
            await _userManager.ResetAccessFailedCountAsync(user);

            // Check if 2FA is required
            if (await _userManager.GetTwoFactorEnabledAsync(user))
            {
                return new AuthResult
                {
                    Success = true,
                    RequiresTwoFactor = true,
                    User = user
                };
            }

            // Update last login
            user.LastLoginAt = DateTime.UtcNow;
            user.IsOnline = true;
            await _userManager.UpdateAsync(user);

            // Generate tokens
            var (token, refreshToken, expiresAt) = await GenerateTokensAsync(user);

            _logger.LogInformation("User {UserId} logged in successfully", user.Id);

            return new AuthResult
            {
                Success = true,
                Token = token,
                RefreshToken = refreshToken,
                ExpiresAt = expiresAt,
                User = user
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during user login");
            return AuthResult.Failure(new[] { "Login failed. Please try again." });
        }
    }

    public async Task<AuthResult> RefreshTokenAsync(string refreshToken)
    {
        try
        {
            // Validate refresh token and get user
            var user = await ValidateRefreshTokenAsync(refreshToken);
            if (user == null)
            {
                return AuthResult.Failure(new[] { "Invalid refresh token" });
            }

            // Generate new tokens
            var (token, newRefreshToken, expiresAt) = await GenerateTokensAsync(user);

            return new AuthResult
            {
                Success = true,
                Token = token,
                RefreshToken = newRefreshToken,
                ExpiresAt = expiresAt,
                User = user
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refreshing token");
            return AuthResult.Failure(new[] { "Token refresh failed" });
        }
    }

    public async Task<bool> LogoutAsync(string userId)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                user.IsOnline = false;
                await _userManager.UpdateAsync(user);
            }

            // Revoke all refresh tokens for the user
            await RevokeAllTokensAsync(userId);

            _logger.LogInformation("User {UserId} logged out successfully", userId);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during logout for user {UserId}", userId);
            return false;
        }
    }

    #endregion

    #region Social Authentication

    public async Task<AuthResult> LoginWithGoogleAsync(string idToken)
    {
        // Implementation for Google OAuth would go here
        // This is a placeholder for the actual implementation
        return AuthResult.Failure(new[] { "Google login not implemented yet" });
    }

    public async Task<AuthResult> LoginWithFacebookAsync(string accessToken)
    {
        // Implementation for Facebook OAuth would go here
        // This is a placeholder for the actual implementation
        return AuthResult.Failure(new[] { "Facebook login not implemented yet" });
    }

    public async Task<AuthResult> LoginWithAppleAsync(string identityToken)
    {
        // Implementation for Apple Sign In would go here
        // This is a placeholder for the actual implementation
        return AuthResult.Failure(new[] { "Apple login not implemented yet" });
    }

    #endregion

    #region Password Management

    public async Task<bool> ChangePasswordAsync(string userId, ChangePasswordRequest request)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
            if (result.Succeeded)
            {
                _logger.LogInformation("User {UserId} changed password successfully", userId);
                return true;
            }

            _logger.LogWarning("User {UserId} failed to change password: {Errors}",
                userId, string.Join(", ", result.Errors.Select(e => e.Description)));
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error changing password for user {UserId}", userId);
            return false;
        }
    }

    public async Task<bool> ResetPasswordAsync(ResetPasswordRequest request)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null) return false;

            var result = await _userManager.ResetPasswordAsync(user, request.Token, request.NewPassword);
            if (result.Succeeded)
            {
                _logger.LogInformation("User {UserId} reset password successfully", user.Id);
                return true;
            }

            _logger.LogWarning("User {UserId} failed to reset password: {Errors}",
                user.Id, string.Join(", ", result.Errors.Select(e => e.Description)));
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resetting password for email {Email}", request.Email);
            return false;
        }
    }

    public async Task<bool> ConfirmEmailAsync(string userId, string token)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                _logger.LogInformation("User {UserId} confirmed email successfully", userId);
                return true;
            }

            _logger.LogWarning("User {UserId} failed to confirm email: {Errors}",
                userId, string.Join(", ", result.Errors.Select(e => e.Description)));
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error confirming email for user {UserId}", userId);
            return false;
        }
    }

    public async Task<bool> ResendConfirmationEmailAsync(string email)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || user.EmailConfirmed) return false;

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            // Send email logic would go here

            _logger.LogInformation("Confirmation email resent to {Email}", email);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resending confirmation email to {Email}", email);
            return false;
        }
    }

    #endregion

    #region Two-Factor Authentication

    public async Task<TwoFactorResult> EnableTwoFactorAsync(string userId)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return TwoFactorResult.Failure(new[] { "User not found" });

            var token = await _userManager.GenerateTwoFactorTokenAsync(user, "Authenticator");
            if (string.IsNullOrEmpty(token))
                return TwoFactorResult.Failure(new[] { "Failed to generate 2FA token" });

            // Generate QR code URL
            var qrCodeUrl = GenerateQrCodeUrl(user.Email, token);

            return new TwoFactorResult
            {
                Success = true,
                Secret = token,
                QrCodeUrl = qrCodeUrl
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error enabling 2FA for user {UserId}", userId);
            return TwoFactorResult.Failure(new[] { "Failed to enable 2FA" });
        }
    }

    public async Task<TwoFactorResult> DisableTwoFactorAsync(string userId, string code)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return TwoFactorResult.Failure(new[] { "User not found" });

            var isValid = await _userManager.VerifyTwoFactorTokenAsync(user, "Authenticator", code);
            if (!isValid)
                return TwoFactorResult.Failure(new[] { "Invalid 2FA code" });

            var result = await _userManager.SetTwoFactorEnabledAsync(user, false);
            if (!result.Succeeded)
                return TwoFactorResult.Failure(result.Errors.Select(e => e.Description));

            _logger.LogInformation("User {UserId} disabled 2FA successfully", userId);
            return new TwoFactorResult { Success = true };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error disabling 2FA for user {UserId}", userId);
            return TwoFactorResult.Failure(new[] { "Failed to disable 2FA" });
        }
    }

    public async Task<TwoFactorResult> VerifyTwoFactorCodeAsync(string userId, string code)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return TwoFactorResult.Failure(new[] { "User not found" });

            var isValid = await _userManager.VerifyTwoFactorTokenAsync(user, "Authenticator", code);
            if (!isValid)
                return TwoFactorResult.Failure(new[] { "Invalid 2FA code" });

            // Enable 2FA if not already enabled
            if (!await _userManager.GetTwoFactorEnabledAsync(user))
            {
                await _userManager.SetTwoFactorEnabledAsync(user, true);
            }

            _logger.LogInformation("User {UserId} verified 2FA code successfully", userId);
            return new TwoFactorResult { Success = true };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error verifying 2FA code for user {UserId}", userId);
            return TwoFactorResult.Failure(new[] { "Failed to verify 2FA code" });
        }
    }

    public async Task<string> GenerateTwoFactorRecoveryCodesAsync(string userId)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return string.Empty;

            var codes = await _userManager.GenerateNewTwoFactorRecoveryCodesAsync(user, 10);
            return string.Join("\n", codes);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating recovery codes for user {UserId}", userId);
            return string.Empty;
        }
    }

    #endregion

    #region Account Management

    public async Task<bool> DeleteAccountAsync(string userId, string password)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            // Verify password
            var passwordValid = await _userManager.CheckPasswordAsync(user, password);
            if (!passwordValid) return false;

            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                _logger.LogInformation("User {UserId} deleted account successfully", userId);
                return true;
            }

            _logger.LogWarning("User {UserId} failed to delete account: {Errors}",
                userId, string.Join(", ", result.Errors.Select(e => e.Description)));
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting account for user {UserId}", userId);
            return false;
        }
    }

    public async Task<bool> UpdateProfileAsync(string userId, UpdateProfileRequest request)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.DisplayName = request.DisplayName;
            user.Bio = request.Bio;
            user.PhoneNumber = request.PhoneNumber;
            user.TimeZone = request.TimeZone;
            user.Language = request.Language;
            user.UpdatedAt = DateTime.UtcNow;

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                _logger.LogInformation("User {UserId} updated profile successfully", userId);
                return true;
            }

            _logger.LogWarning("User {UserId} failed to update profile: {Errors}",
                userId, string.Join(", ", result.Errors.Select(e => e.Description)));
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating profile for user {UserId}", userId);
            return false;
        }
    }

    #endregion

    #region Security

    public async Task<bool> LockAccountAsync(string userId, TimeSpan duration)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow.Add(duration));
            await _userManager.UpdateAsync(user);

            _logger.LogInformation("User {UserId} account locked for {Duration}", userId, duration);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error locking account for user {UserId}", userId);
            return false;
        }
    }

    public async Task<bool> UnlockAccountAsync(string userId)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return false;

            await _userManager.SetLockoutEndDateAsync(user, null);
            await _userManager.ResetAccessFailedCountAsync(user);
            await _userManager.UpdateAsync(user);

            _logger.LogInformation("User {UserId} account unlocked", userId);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error unlocking account for user {UserId}", userId);
            return false;
        }
    }

    public async Task<AccountSecurityInfo> GetAccountSecurityInfoAsync(string userId)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return new AccountSecurityInfo();

            return new AccountSecurityInfo
            {
                TwoFactorEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                EmailConfirmed = await _userManager.IsEmailConfirmedAsync(user),
                PhoneConfirmed = await _userManager.IsPhoneNumberConfirmedAsync(user),
                LastPasswordChange = user.UpdatedAt,
                LastLogin = user.LastLoginAt,
                FailedLoginAttempts = await _userManager.GetAccessFailedCountAsync(user),
                IsLockedOut = await _userManager.IsLockedOutAsync(user),
                LockoutEnd = await _userManager.GetLockoutEndDateAsync(user),
                RecentLogins = new List<LoginHistory>() // Would need to implement login history tracking
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting security info for user {UserId}", userId);
            return new AccountSecurityInfo();
        }
    }

    #endregion

    #region Token Management

    public async Task<bool> RevokeTokenAsync(string token)
    {
        // Implementation would depend on token storage strategy
        // This is a placeholder
        return true;
    }

    public async Task<bool> RevokeAllTokensAsync(string userId)
    {
        // Implementation would depend on token storage strategy
        // This is a placeholder
        return true;
    }

    public async Task<IEnumerable<TokenInfo>> GetActiveTokensAsync(string userId)
    {
        // Implementation would depend on token storage strategy
        // This is a placeholder
        return new List<TokenInfo>();
    }

    #endregion

    #region User Validation

    public async Task<bool> IsEmailAvailableAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        return user == null;
    }

    public async Task<bool> IsUsernameAvailableAsync(string username)
    {
        var user = await _userManager.FindByNameAsync(username);
        return user == null;
    }

    public async Task<User?> GetUserByIdAsync(string userId)
    {
        return await _userManager.FindByIdAsync(userId);
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }

    #endregion

    #region Application Layer Methods

    public async Task<UserDto> GetUserProfileAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) throw new KeyNotFoundException("User not found");

        return new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            DisplayName = user.DisplayName,
            Bio = user.Bio,
            ProfilePictureUrl = user.ProfilePictureUrl,
            IsVerified = user.IsVerified,
            IsOnline = user.IsOnline,
            FollowersCount = user.FollowersCount,
            FollowingCount = user.FollowingCount,
            TotalPoints = user.TotalPoints,
            CurrentLevel = user.CurrentLevel,
            CreatedAt = user.CreatedAt,
            Role = user.Role.ToString()
        };
    }

    public async Task<bool> UpdateUserProfileAsync(string userId, UpdateProfileRequest request)
    {
        return await UpdateProfileAsync(userId, request);
    }

    public async Task<IEnumerable<UserDto>> SearchUsersAsync(string query, int page = 1, int pageSize = 20)
    {
        // This would require implementing user search functionality
        // For now, return empty list as placeholder
        return new List<UserDto>();
    }

    #endregion

    #region Private Helper Methods

    private async Task<(string token, string refreshToken, DateTime expiresAt)> GenerateTokensAsync(User user)
    {
        var token = await GenerateJwtTokenAsync(user);
        var refreshToken = GenerateRefreshToken();
        var expiresAt = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["JwtSettings:ExpiryInMinutes"] ?? "60"));

        // Store refresh token (implementation depends on storage strategy)
        // This is a placeholder

        return (token, refreshToken, expiresAt);
    }

    private async Task<string> GenerateJwtTokenAsync(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
            new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var roles = await _userManager.GetRolesAsync(user);
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(int.Parse(_configuration["JwtSettings:ExpiryInMinutes"] ?? "60")),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private string GenerateRefreshToken()
    {
        var randomBytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);
        return Convert.ToBase64String(randomBytes);
    }

    private async Task<User?> ValidateRefreshTokenAsync(string refreshToken)
    {
        // Implementation depends on token storage strategy
        // This is a placeholder
        return null;
    }

    private string GenerateQrCodeUrl(string email, string secret)
    {
        var issuer = _configuration["JwtSettings:Issuer"] ?? "CommunityCar";
        var encodedIssuer = Uri.EscapeDataString(issuer);
        var encodedEmail = Uri.EscapeDataString(email);
        return $"otpauth://totp/{encodedIssuer}:{encodedEmail}?secret={secret}&issuer={encodedIssuer}";
    }

    #endregion
}

#region Static Helper Methods

public static class AuthResult
{
    public static AuthResult Failure(IEnumerable<string> errors) =>
        new() { Success = false, Errors = errors };

    public static AuthResult Success(User user, string token, string refreshToken, DateTime expiresAt) =>
        new()
        {
            Success = true,
            User = user,
            Token = token,
            RefreshToken = refreshToken,
            ExpiresAt = expiresAt
        };
}

public static class TwoFactorResult
{
    public static TwoFactorResult Failure(IEnumerable<string> errors) =>
        new() { Success = false, Errors = errors };

    public static TwoFactorResult Success(string secret, string qrCodeUrl) =>
        new() { Success = true, Secret = secret, QrCodeUrl = qrCodeUrl };
}

#endregion