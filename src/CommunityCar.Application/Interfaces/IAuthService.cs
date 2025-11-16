using CommunityCar.Domain.Entities.Identity;
using CommunityCar.Domain.Interfaces;

namespace CommunityCar.Application.Interfaces
{
    public interface IAuthService : Domain.Interfaces.IAuthService
    {
        // Additional application layer methods can be added here
        Task<UserDto> GetUserProfileAsync(string userId);
        Task<bool> UpdateUserProfileAsync(string userId, UpdateProfileRequest request);
        Task<IEnumerable<UserDto>> SearchUsersAsync(string query, int page = 1, int pageSize = 20);
    }

    // Application-specific DTOs
    public class UserDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string ProfilePictureUrl { get; set; } = string.Empty;
        public bool IsVerified { get; set; }
        public bool IsOnline { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public int TotalPoints { get; set; }
        public int CurrentLevel { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Role { get; set; } = string.Empty;
    }

    public class UpdateProfileRequest
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? PhoneNumber { get; set; }
        public string? TimeZone { get; set; }
        public string? Language { get; set; }
    }
}