using CommunityCar.Domain.Entities.Gamification;

namespace CommunityCar.Domain.Interfaces
{
    public interface IUserAchievementRepository
    {
        Task<IEnumerable<UserAchievement>> GetByUserIdAsync(Guid userId);
        Task<UserAchievement?> GetByIdAsync(Guid id);
        Task<UserAchievement> AddAsync(UserAchievement userAchievement);
        Task<bool> ExistsAsync(Guid userId, Guid badgeId);
    }
}