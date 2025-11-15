using CommunityCar.Domain.Entities.Gamification;
using CommunityCar.Domain.Interfaces;

namespace CommunityCar.Application.Services
{
    public class AchievementService : IAchievementService
    {
        private readonly IUserAchievementRepository _userAchievementRepository;

        public AchievementService(IUserAchievementRepository userAchievementRepository)
        {
            _userAchievementRepository = userAchievementRepository;
        }

        public async Task<IEnumerable<UserAchievement>> GetUserAchievementsAsync(Guid userId)
        {
            return await _userAchievementRepository.GetByUserIdAsync(userId);
        }

        public async Task<UserAchievement> AwardAchievementAsync(Guid userId, Guid badgeId)
        {
            var userAchievement = new UserAchievement(userId, badgeId, DateTime.UtcNow);
            return await _userAchievementRepository.AddAsync(userAchievement);
        }

        public async Task<bool> HasAchievementAsync(Guid userId, Guid badgeId)
        {
            return await _userAchievementRepository.ExistsAsync(userId, badgeId);
        }
    }
}