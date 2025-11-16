using CommunityCar.Domain.Entities.Gamification;

namespace CommunityCar.Domain.Interfaces
{
    public interface IAchievementService
    {
        Task<IEnumerable<UserAchievement>> GetUserAchievementsAsync(Guid userId);
        Task<UserAchievement> AwardAchievementAsync(Guid userId, Guid badgeId);
        Task<bool> HasAchievementAsync(Guid userId, Guid badgeId);
    }
}