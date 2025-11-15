using CommunityCar.Domain.Entities.Gamification;

namespace CommunityCar.Domain.Interfaces
{
    public interface IBadgeService
    {
        Task<IEnumerable<Badge>> GetAllBadgesAsync();
        Task<Badge?> GetBadgeByIdAsync(Guid id);
        Task<Badge> CreateBadgeAsync(Badge badge);
        Task UpdateBadgeAsync(Badge badge);
        Task DeleteBadgeAsync(Guid id);
    }
}