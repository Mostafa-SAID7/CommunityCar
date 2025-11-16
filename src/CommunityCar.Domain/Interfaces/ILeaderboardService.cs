using CommunityCar.Domain.Entities.Identity;
using CommunityCar.Domain.Entities.Gamification;

namespace CommunityCar.Domain.Interfaces
{
    public interface ILeaderboardService
    {
        // Basic leaderboard methods
        Task<IEnumerable<User>> GetLeaderboardAsync(int top = 10);
        Task<int> GetUserRankAsync(Guid userId);

        // Enhanced leaderboard types
        Task<IEnumerable<User>> GetWeeklyLeaderboardAsync(int top = 10);
        Task<IEnumerable<User>> GetMonthlyLeaderboardAsync(int top = 10);
        Task<IEnumerable<User>> GetAllTimeLeaderboardAsync(int top = 10);

        // Achievement-based leaderboards
        Task<IEnumerable<User>> GetAchievementLeaderboardAsync(int top = 10);
        Task<IEnumerable<User>> GetBadgeCountLeaderboardAsync(int top = 10);

        // User statistics and progression
        Task<object> GetUserLeaderboardStatsAsync(Guid userId);
        Task<object> GetUserProgressionAsync(Guid userId);

        // Streak tracking
        Task<object> GetUserStreakAsync(Guid userId);
        Task<IEnumerable<User>> GetStreakLeaderboardAsync(int top = 10);

        // Social features
        Task<IEnumerable<User>> GetFollowedUsersLeaderboardAsync(Guid currentUserId, int top = 10);
        Task<bool> IsUserFollowingAsync(Guid followerId, Guid followedId);

        // Historical data
        Task<object> GetHistoricalLeaderboardAsync(DateTime date, int top = 10);
        Task<object> GetUserRankHistoryAsync(Guid userId, int days = 30);

        // Competition features
        Task<object> GetCurrentCompetitionAsync();
        Task<object> GetPastCompetitionsAsync(int count = 5);
        Task<object> GetUserCompetitionStatsAsync(Guid userId);

        // Personalized challenges
        Task<object> GetActiveChallengesAsync(Guid userId);
        Task<object> GetChallengeProgressAsync(Guid userId, Guid challengeId);

        // Community and Social Features
        Task<bool> FollowUserAsync(Guid followerId, Guid followedId);
        Task<bool> UnfollowUserAsync(Guid followerId, Guid followedId);
        Task<IEnumerable<User>> GetFollowersAsync(Guid userId, int top = 10);
        Task<IEnumerable<User>> GetFollowingAsync(Guid userId, int top = 10);
        Task ShareAchievementAsync(Guid userId, Guid achievementId, string message = "");
        Task<object> GetSharedAchievementsAsync(int top = 20);

        // Social Leaderboards
        Task<IEnumerable<User>> GetCommunityLeaderboardAsync(Guid communityId, int top = 10);
        Task<object> GetActiveCommunityEventsAsync();
        Task<object> GetUserCommunityStatsAsync(Guid userId);

        // Real-time Updates
        Task SubscribeToLeaderboardUpdatesAsync(Guid userId);
        Task UnsubscribeFromLeaderboardUpdatesAsync(Guid userId);
        Task NotifyRankChangeAsync(Guid userId, int oldRank, int newRank);
        Task SyncLeaderboardDataAsync();

        // Review and Feedback System
        Task<object> AddAchievementReviewAsync(Guid userId, Guid achievementId, int rating, string comment);
        Task<object> GetAchievementReviewsAsync(Guid achievementId, int page = 1, int pageSize = 10);
        Task<object> GetAchievementReviewStatsAsync(Guid achievementId);
        Task<object> AddBadgeReviewAsync(Guid userId, Guid badgeId, int rating, string comment);
        Task<object> GetBadgeReviewsAsync(Guid badgeId, int page = 1, int pageSize = 10);
        Task<object> GetBadgeReviewStatsAsync(Guid badgeId);

        // Moderation Features
        Task ModerateReviewAsync(Guid reviewId, object action, string reason = "");
        Task<object> GetPendingReviewsAsync(int page = 1, int pageSize = 20);
        Task ReportReviewAsync(Guid reviewId, Guid reporterId, string reason);
    }
}