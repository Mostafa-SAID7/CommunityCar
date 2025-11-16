using CommunityCar.Domain.Entities.Gamification;

namespace CommunityCar.Domain.Interfaces
{
    public interface IUserPointRepository
    {
        Task<UserPoint?> GetByUserIdAsync(Guid userId);
        Task<UserPoint> AddAsync(UserPoint userPoint);
        Task UpdateAsync(UserPoint userPoint);
    }
}