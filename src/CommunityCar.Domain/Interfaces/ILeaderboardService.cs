using CommunityCar.Domain.Entities.Identity;
using CommunityCar.Domain.Entities.Gamification;
using CommunityCar.Application.DTOs;

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
        Task<UserLeaderboardStats> GetUserLeaderboardStatsAsync(Guid userId);
        Task<UserProgression> GetUserProgressionAsync(Guid userId);

        // Streak tracking
        Task<UserStreak> GetUserStreakAsync(Guid userId);
        Task<IEnumerable<User>> GetStreakLeaderboardAsync(int top = 10);

        // Social features
        Task<IEnumerable<User>> GetFollowedUsersLeaderboardAsync(Guid currentUserId, int top = 10);
        Task<bool> IsUserFollowingAsync(Guid followerId, Guid followedId);

        // Historical data
        Task<IEnumerable<LeaderboardEntry>> GetHistoricalLeaderboardAsync(DateTime date, int top = 10);
        Task<UserRankHistory> GetUserRankHistoryAsync(Guid userId, int days = 30);

        // Competition features
        Task<CompetitionResult> GetCurrentCompetitionAsync();
        Task<IEnumerable<CompetitionResult>> GetPastCompetitionsAsync(int count = 5);
        Task<UserCompetitionStats> GetUserCompetitionStatsAsync(Guid userId);

        // Personalized challenges
        Task<IEnumerable<PersonalChallenge>> GetActiveChallengesAsync(Guid userId);
        Task<ChallengeProgress> GetChallengeProgressAsync(Guid userId, Guid challengeId);

        // Community and Social Features
        Task<bool> FollowUserAsync(Guid followerId, Guid followedId);
        Task<bool> UnfollowUserAsync(Guid followerId, Guid followedId);
        Task<IEnumerable<User>> GetFollowersAsync(Guid userId, int top = 10);
        Task<IEnumerable<User>> GetFollowingAsync(Guid userId, int top = 10);
        Task ShareAchievementAsync(Guid userId, Guid achievementId, string message = "");
        Task<IEnumerable<SharedAchievement>> GetSharedAchievementsAsync(int top = 20);

        // Social Leaderboards
        Task<IEnumerable<User>> GetCommunityLeaderboardAsync(Guid communityId, int top = 10);
        Task<IEnumerable<CommunityEvent>> GetActiveCommunityEventsAsync();
        Task<UserCommunityStats> GetUserCommunityStatsAsync(Guid userId);

        // Real-time Updates
        Task SubscribeToLeaderboardUpdatesAsync(Guid userId);
        Task UnsubscribeFromLeaderboardUpdatesAsync(Guid userId);
        Task NotifyRankChangeAsync(Guid userId, int oldRank, int newRank);
        Task SyncLeaderboardDataAsync();

        // Review and Feedback System
        Task<AchievementReview> AddAchievementReviewAsync(Guid userId, Guid achievementId, int rating, string comment);
        Task<IEnumerable<AchievementReview>> GetAchievementReviewsAsync(Guid achievementId, int page = 1, int pageSize = 10);
        Task<AchievementReviewStats> GetAchievementReviewStatsAsync(Guid achievementId);
        Task<BadgeReview> AddBadgeReviewAsync(Guid userId, Guid badgeId, int rating, string comment);
        Task<IEnumerable<BadgeReview>> GetBadgeReviewsAsync(Guid badgeId, int page = 1, int pageSize = 10);
        Task<BadgeReviewStats> GetBadgeReviewStatsAsync(Guid badgeId);

        // Moderation Features
        Task ModerateReviewAsync(Guid reviewId, ReviewModerationAction action, string reason = "");
        Task<IEnumerable<PendingReview>> GetPendingReviewsAsync(int page = 1, int pageSize = 20);
        Task ReportReviewAsync(Guid reviewId, Guid reporterId, string reason);
    }
}