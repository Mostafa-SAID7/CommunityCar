using CommunityCar.Domain.Entities.Identity;

namespace CommunityCar.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(Guid id);
        Task<IEnumerable<User>> GetAllAsync();
    }
}