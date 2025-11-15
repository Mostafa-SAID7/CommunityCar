using CommunityCar.Domain.Entities.Gamification;
using CommunityCar.Domain.Interfaces;

namespace CommunityCar.Application.Services
{
    public class BadgeService : IBadgeService
    {
        private readonly IBadgeRepository _badgeRepository;

        public BadgeService(IBadgeRepository badgeRepository)
        {
            _badgeRepository = badgeRepository;
        }

        public async Task<IEnumerable<Badge>> GetAllBadgesAsync()
        {
            return await _badgeRepository.GetAllAsync();
        }

        public async Task<Badge?> GetBadgeByIdAsync(Guid id)
        {
            return await _badgeRepository.GetByIdAsync(id);
        }

        public async Task<Badge> CreateBadgeAsync(Badge badge)
        {
            return await _badgeRepository.AddAsync(badge);
        }

        public async Task UpdateBadgeAsync(Badge badge)
        {
            await _badgeRepository.UpdateAsync(badge);
        }

        public async Task DeleteBadgeAsync(Guid id)
        {
            await _badgeRepository.DeleteAsync(id);
        }
    }
}