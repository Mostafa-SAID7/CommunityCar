using CommunityCar.Application.DTOs;

namespace CommunityCar.Application.Interfaces
{
    public interface IAuthService
    {
        Task<string> LoginAsync(string username, string password);
        Task<UserDto> RegisterAsync(string username, string email, string password);
        Task<string> GenerateTokenAsync(UserDto user);
    }
}