using CommunityCar.Domain.Entities.Gamification;

namespace CommunityCar.Domain.Interfaces
{
    public interface IBadgeRepository
    {
        Task<IEnumerable<Badge>> GetAllAsync();
        Task<Badge?> GetByIdAsync(Guid id);
        Task<Badge> AddAsync(Badge badge);
        Task UpdateAsync(Badge badge);
        Task DeleteAsync(Guid id);
    }
}