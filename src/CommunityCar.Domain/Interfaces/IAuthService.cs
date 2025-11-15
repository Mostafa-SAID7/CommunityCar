using CommunityCar.Domain.Entities.Identity;

namespace CommunityCar.Domain.Interfaces;

public interface IAuthService
{
    // Authentication
    Task<AuthResult> RegisterAsync(RegisterRequest request);
    Task<AuthResult> LoginAsync(LoginRequest request);
    Task<AuthResult> RefreshTokenAsync(string refreshToken);
    Task<bool> LogoutAsync(string userId);

    // Social Authentication
    Task<AuthResult> LoginWithGoogleAsync(string idToken);
    Task<AuthResult> LoginWithFacebookAsync(string accessToken);
    Task<AuthResult> LoginWithAppleAsync(string identityToken);

    // Password Management
    Task<bool> ChangePasswordAsync(string userId, ChangePasswordRequest request);
    Task<bool> ResetPasswordAsync(ResetPasswordRequest request);
    Task<bool> ConfirmEmailAsync(string userId, string token);
    Task<bool> ResendConfirmationEmailAsync(string email);

    // Two-Factor Authentication
    Task<TwoFactorResult> EnableTwoFactorAsync(string userId);
    Task<TwoFactorResult> DisableTwoFactorAsync(string userId, string code);
    Task<TwoFactorResult> VerifyTwoFactorCodeAsync(string userId, string code);
    Task<string> GenerateTwoFactorRecoveryCodesAsync(string userId);

    // Account Management
    Task<bool> DeleteAccountAsync(string userId, string password);
    Task<bool> UpdateProfileAsync(string userId, UpdateProfileRequest request);

    // Security
    Task<bool> LockAccountAsync(string userId, TimeSpan duration);
    Task<bool> UnlockAccountAsync(string userId);
    Task<AccountSecurityInfo> GetAccountSecurityInfoAsync(string userId);

    // Token Management
    Task<bool> RevokeTokenAsync(string token);
    Task<bool> RevokeAllTokensAsync(string userId);
    Task<IEnumerable<TokenInfo>> GetActiveTokensAsync(string userId);

    // User Validation
    Task<bool> IsEmailAvailableAsync(string email);
    Task<bool> IsUsernameAvailableAsync(string username);
    Task<User?> GetUserByIdAsync(string userId);
    Task<User?> GetUserByEmailAsync(string email);
}

// Request/Response DTOs
public class RegisterRequest
{
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public bool AcceptTerms { get; set; }
}

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public bool RememberMe { get; set; }
    public string? TwoFactorCode { get; set; }
}

public class ChangePasswordRequest
{
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;
}

public class ResetPasswordRequest
{
    public string Email { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;
}

public class UpdateProfileRequest
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string TimeZone { get; set; } = "UTC";
    public string Language { get; set; } = "en";
}

public class AuthResult
{
    public bool Success { get; set; }
    public string? Token { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public User? User { get; set; }
    public IEnumerable<string> Errors { get; set; } = new List<string>();
    public bool RequiresTwoFactor { get; set; }
    public bool RequiresEmailConfirmation { get; set; }
}

public class TwoFactorResult
{
    public bool Success { get; set; }
    public string? Secret { get; set; }
    public string? QrCodeUrl { get; set; }
    public IEnumerable<string>? RecoveryCodes { get; set; }
    public IEnumerable<string> Errors { get; set; } = new List<string>();
}

public class AccountSecurityInfo
{
    public bool TwoFactorEnabled { get; set; }
    public bool EmailConfirmed { get; set; }
    public bool PhoneConfirmed { get; set; }
    public DateTime? LastPasswordChange { get; set; }
    public DateTime? LastLogin { get; set; }
    public int FailedLoginAttempts { get; set; }
    public bool IsLockedOut { get; set; }
    public DateTime? LockoutEnd { get; set; }
    public IEnumerable<LoginHistory> RecentLogins { get; set; } = new List<LoginHistory>();
}

public class LoginHistory
{
    public DateTime LoginTime { get; set; }
    public string IpAddress { get; set; } = string.Empty;
    public string UserAgent { get; set; } = string.Empty;
    public bool Successful { get; set; }
}

public class TokenInfo
{
    public string TokenId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public string IpAddress { get; set; } = string.Empty;
    public string UserAgent { get; set; } = string.Empty;
}