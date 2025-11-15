using CommunityCar.Domain.Entities.Gamification;
using CommunityCar.Domain.Interfaces;

namespace CommunityCar.Application.Services
{
    public class PointService : IPointService
    {
        private readonly IUserPointRepository _userPointRepository;

        public PointService(IUserPointRepository userPointRepository)
        {
            _userPointRepository = userPointRepository;
        }

        public async Task<UserPoint> GetUserPointsAsync(Guid userId)
        {
            var userPoint = await _userPointRepository.GetByUserIdAsync(userId);
            if (userPoint == null)
            {
                userPoint = new UserPoint(userId, 0);
                await _userPointRepository.AddAsync(userPoint);
            }
            return userPoint;
        }

        public async Task AddPointsAsync(Guid userId, int points)
        {
            var userPoint = await GetUserPointsAsync(userId);
            userPoint.AddPoints(points);
            await _userPointRepository.UpdateAsync(userPoint);
        }

        public async Task SubtractPointsAsync(Guid userId, int points)
        {
            var userPoint = await GetUserPointsAsync(userId);
            userPoint.SubtractPoints(points);
            await _userPointRepository.UpdateAsync(userPoint);
        }
    }
}