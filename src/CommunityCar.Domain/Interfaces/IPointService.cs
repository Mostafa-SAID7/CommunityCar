using CommunityCar.Domain.Entities.Gamification;

namespace CommunityCar.Domain.Interfaces
{
    public interface IPointService
    {
        Task<UserPoint> GetUserPointsAsync(Guid userId);
        Task AddPointsAsync(Guid userId, int points);
        Task SubtractPointsAsync(Guid userId, int points);
    }
}