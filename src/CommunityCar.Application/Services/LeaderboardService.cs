using CommunityCar.Domain.Entities;
using CommunityCar.Domain.Entities.Gamification;
using CommunityCar.Domain.Entities.Identity;
using CommunityCar.Domain.Interfaces;
using CommunityCar.Application.Interfaces;
using CommunityCar.Application.DTOs;

namespace CommunityCar.Application.Services
{
    public class LeaderboardService : CommunityCar.Application.Interfaces.ILeaderboardService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserPointRepository _userPointRepository;
        private readonly IUserAchievementRepository _userAchievementRepository;
        private readonly IBadgeRepository _badgeRepository;
        private readonly ICachingService _cachingService;
        private readonly IPointService _pointService;
        private readonly IAchievementService _achievementService;

        // Cache keys
        private const string LEADERBOARD_CACHE_PREFIX = "leaderboard_";
        private const string USER_STATS_CACHE_PREFIX = "user_stats_";
        private const int CACHE_DURATION_MINUTES = 30;

        public LeaderboardService(
            IUserRepository userRepository,
            IUserPointRepository userPointRepository,
            IUserAchievementRepository userAchievementRepository,
            IBadgeRepository badgeRepository,
            ICachingService cachingService,
            IPointService pointService,
            IAchievementService achievementService)
        {
            _userRepository = userRepository;
            _userPointRepository = userPointRepository;
            _userAchievementRepository = userAchievementRepository;
            _badgeRepository = badgeRepository;
            _cachingService = cachingService;
            _pointService = pointService;
            _achievementService = achievementService;
        }

        #region Basic Leaderboard Methods

        public async Task<IEnumerable<User>> GetLeaderboardAsync(int top = 10)
        {
            var cacheKey = $"{LEADERBOARD_CACHE_PREFIX}alltime_{top}";
            var cached = await _cachingService.GetAsync<IEnumerable<User>>(cacheKey);
            if (cached != null) return cached;

            var users = await _userRepository.GetAllAsync();
            var userPoints = await GetUserPointsDictionaryAsync(users);

            var result = users
                .OrderByDescending(u => userPoints.GetValueOrDefault(u.Id, 0))
                .Take(top)
                .ToList();

            await _cachingService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return result;
        }

        public async Task<int> GetUserRankAsync(Guid userId)
        {
            var users = await _userRepository.GetAllAsync();
            var userPoints = await GetUserPointsDictionaryAsync(users);

            var orderedUsers = users
                .OrderByDescending(u => userPoints.GetValueOrDefault(u.Id, 0))
                .ToList();

            var rank = orderedUsers.FindIndex(u => u.Id == userId) + 1;
            return rank > 0 ? rank : users.Count() + 1;
        }

        #endregion

        #region Enhanced Leaderboard Types

        public async Task<IEnumerable<User>> GetWeeklyLeaderboardAsync(int top = 10)
        {
            var cacheKey = $"{LEADERBOARD_CACHE_PREFIX}weekly_{top}";
            var cached = await _cachingService.GetAsync<IEnumerable<User>>(cacheKey);
            if (cached != null) return cached;

            var weekStart = DateTime.UtcNow.StartOfWeek(DayOfWeek.Monday);
            var users = await _userRepository.GetAllAsync();
            var weeklyPoints = await GetWeeklyPointsDictionaryAsync(users, weekStart);

            var result = users
                .OrderByDescending(u => weeklyPoints.GetValueOrDefault(u.Id, 0))
                .Take(top)
                .ToList();

            await _cachingService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return result;
        }

        public async Task<IEnumerable<User>> GetMonthlyLeaderboardAsync(int top = 10)
        {
            var cacheKey = $"{LEADERBOARD_CACHE_PREFIX}monthly_{top}";
            var cached = await _cachingService.GetAsync<IEnumerable<User>>(cacheKey);
            if (cached != null) return cached;

            var monthStart = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
            var users = await _userRepository.GetAllAsync();
            var monthlyPoints = await GetMonthlyPointsDictionaryAsync(users, monthStart);

            var result = users
                .OrderByDescending(u => monthlyPoints.GetValueOrDefault(u.Id, 0))
                .Take(top)
                .ToList();

            await _cachingService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return result;
        }

        public async Task<IEnumerable<User>> GetAllTimeLeaderboardAsync(int top = 10)
        {
            return await GetLeaderboardAsync(top);
        }

        #endregion

        #region Achievement-Based Leaderboards

        public async Task<IEnumerable<User>> GetAchievementLeaderboardAsync(int top = 10)
        {
            var cacheKey = $"{LEADERBOARD_CACHE_PREFIX}achievements_{top}";
            var cached = await _cachingService.GetAsync<IEnumerable<User>>(cacheKey);
            if (cached != null) return cached;

            var users = await _userRepository.GetAllAsync();
            var achievementCounts = new Dictionary<Guid, int>();

            foreach (var user in users)
            {
                var achievements = await _userAchievementRepository.GetByUserIdAsync(user.Id);
                achievementCounts[user.Id] = achievements.Count();
            }

            var result = users
                .OrderByDescending(u => achievementCounts.GetValueOrDefault(u.Id, 0))
                .Take(top)
                .ToList();

            await _cachingService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return result;
        }

        public async Task<IEnumerable<User>> GetBadgeCountLeaderboardAsync(int top = 10)
        {
            return await GetAchievementLeaderboardAsync(top);
        }

        #endregion

        #region User Statistics and Progression

        public async Task<UserLeaderboardStats> GetUserLeaderboardStatsAsync(Guid userId)
        {
            var cacheKey = $"{USER_STATS_CACHE_PREFIX}{userId}";
            var cached = await _cachingService.GetAsync<UserLeaderboardStats>(cacheKey);
            if (cached != null) return cached;

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new ArgumentException("User not found", nameof(userId));

            var currentRank = await GetUserRankAsync(userId);
            var weeklyRank = await GetUserWeeklyRankAsync(userId);
            var monthlyRank = await GetUserMonthlyRankAsync(userId);
            var allTimeRank = currentRank;

            var userPoints = await _pointService.GetUserPointsAsync(userId);
            var weeklyPoints = await GetUserWeeklyPointsAsync(userId);
            var monthlyPoints = await GetUserMonthlyPointsAsync(userId);

            var achievements = await _achievementService.GetUserAchievementsAsync(userId);
            var streak = await GetUserStreakAsync(userId);

            var stats = new UserLeaderboardStats
            {
                UserId = userId,
                CurrentRank = currentRank,
                WeeklyRank = weeklyRank,
                MonthlyRank = monthlyRank,
                AllTimeRank = allTimeRank,
                TotalPoints = userPoints.Points,
                WeeklyPoints = weeklyPoints,
                MonthlyPoints = monthlyPoints,
                AchievementCount = achievements.Count(),
                BadgeCount = achievements.Select(a => a.BadgeId).Distinct().Count(),
                CurrentStreak = streak.CurrentStreak,
                LongestStreak = streak.LongestStreak,
                LastActivity = userPoints.LastUpdated
            };

            await _cachingService.SetAsync(cacheKey, stats, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return stats;
        }

        public async Task<UserProgression> GetUserProgressionAsync(Guid userId)
        {
            var userPoints = await _pointService.GetUserPointsAsync(userId);
            var level = CalculateLevel(userPoints.Points);
            var pointsToNextLevel = GetPointsRequiredForLevel(level + 1) - userPoints.Points;

            var achievements = await _achievementService.GetUserAchievementsAsync(userId);
            var recentAchievements = achievements
                .OrderByDescending(a => a.EarnedAt)
                .Take(5)
                .Select(a => a.Badge.Name)
                .ToList();

            return new UserProgression
            {
                UserId = userId,
                CurrentLevel = level,
                PointsToNextLevel = Math.Max(0, pointsToNextLevel),
                TotalPointsEarned = userPoints.Points,
                ProgressPercentage = CalculateProgressPercentage(userPoints.Points),
                CurrentTitle = GetLevelTitle(level),
                NextTitle = GetLevelTitle(level + 1),
                RecentAchievements = recentAchievements
            };
        }

        #endregion

        #region Streak Tracking

        public async Task<UserStreak> GetUserStreakAsync(Guid userId)
        {
            // This is a simplified implementation. In a real system, you'd track daily activities
            var userPoints = await _pointService.GetUserPointsAsync(userId);
            var achievements = await _achievementService.GetUserAchievementsAsync(userId);

            // Calculate streak based on recent activity (simplified logic)
            var recentActivityDays = (DateTime.UtcNow - userPoints.LastUpdated).TotalDays;
            var currentStreak = recentActivityDays <= 1 ? 1 : 0;

            // Calculate longest streak from achievements (simplified)
            var longestStreak = achievements.Count() > 0 ? 1 : 0;

            return new UserStreak
            {
                UserId = userId,
                CurrentStreak = currentStreak,
                LongestStreak = longestStreak,
                LastActivityDate = userPoints.LastUpdated,
                Type = StreakType.DailyLogin
            };
        }

        public async Task<IEnumerable<User>> GetStreakLeaderboardAsync(int top = 10)
        {
            var cacheKey = $"{LEADERBOARD_CACHE_PREFIX}streaks_{top}";
            var cached = await _cachingService.GetAsync<IEnumerable<User>>(cacheKey);
            if (cached != null) return cached;

            var users = await _userRepository.GetAllAsync();
            var streakCounts = new Dictionary<Guid, int>();

            foreach (var user in users)
            {
                var streak = await GetUserStreakAsync(user.Id);
                streakCounts[user.Id] = streak.CurrentStreak;
            }

            var result = users
                .OrderByDescending(u => streakCounts.GetValueOrDefault(u.Id, 0))
                .Take(top)
                .ToList();

            await _cachingService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return result;
        }

        #endregion

        #region Social Features

        public async Task<IEnumerable<User>> GetFollowedUsersLeaderboardAsync(Guid currentUserId, int top = 10)
        {
            // This would require a following/follower relationship in the domain
            // For now, return top users (placeholder implementation)
            return await GetLeaderboardAsync(top);
        }

        public async Task<bool> IsUserFollowingAsync(Guid followerId, Guid followedId)
        {
            // This would require a following/follower relationship in the domain
            // For now, return false (placeholder implementation)
            return false;
        }

        #endregion

        #region Historical Data

        public async Task<IEnumerable<LeaderboardEntry>> GetHistoricalLeaderboardAsync(DateTime date, int top = 10)
        {
            // This would require historical data storage
            // For now, return current leaderboard as placeholder
            var users = await GetLeaderboardAsync(top);
            var userPoints = await GetUserPointsDictionaryAsync(users);

            return users.Select((user, index) => new LeaderboardEntry
            {
                UserId = user.Id,
                UserName = user.UserName,
                Rank = index + 1,
                Points = userPoints.GetValueOrDefault(user.Id, 0),
                RecordedAt = date
            });
        }

        public async Task<UserRankHistory> GetUserRankHistoryAsync(Guid userId, int days = 30)
        {
            // This would require historical rank storage
            // For now, return current rank for each day as placeholder
            var history = new List<RankHistoryPoint>();
            var currentRank = await GetUserRankAsync(userId);
            var currentPoints = (await _pointService.GetUserPointsAsync(userId)).Points;

            for (int i = days; i >= 0; i--)
            {
                var date = DateTime.UtcNow.AddDays(-i);
                history.Add(new RankHistoryPoint
                {
                    Date = date,
                    Rank = currentRank,
                    Points = currentPoints
                });
            }

            return new UserRankHistory
            {
                UserId = userId,
                History = history
            };
        }

        #endregion

        #region Competition Features

        public async Task<CompetitionResult> GetCurrentCompetitionAsync()
        {
            // This would require competition entities and logic
            // For now, return a placeholder
            return new CompetitionResult
            {
                CompetitionId = Guid.NewGuid(),
                Name = "Monthly Championship",
                StartDate = DateTime.UtcNow.AddDays(-7),
                EndDate = DateTime.UtcNow.AddDays(23),
                Status = CompetitionStatus.Active,
                Participants = new List<CompetitionParticipant>()
            };
        }

        public async Task<IEnumerable<CompetitionResult>> GetPastCompetitionsAsync(int count = 5)
        {
            // This would require competition history storage
            // For now, return empty list as placeholder
            return new List<CompetitionResult>();
        }

        public async Task<UserCompetitionStats> GetUserCompetitionStatsAsync(Guid userId)
        {
            // This would require competition participation tracking
            // For now, return placeholder stats
            return new UserCompetitionStats
            {
                UserId = userId,
                CompetitionsParticipated = 0,
                CompetitionsWon = 0,
                TotalCompetitionPoints = 0,
                WinRate = 0.0,
                BestResult = null
            };
        }

        #endregion

        #region Personalized Challenges

        public async Task<IEnumerable<PersonalChallenge>> GetActiveChallengesAsync(Guid userId)
        {
            // This would require challenge entities and logic
            // For now, return a sample challenge
            return new List<PersonalChallenge>
            {
                new PersonalChallenge
                {
                    ChallengeId = Guid.NewGuid(),
                    Title = "Post Master",
                    Description = "Create 5 posts this week",
                    Type = ChallengeType.PostCreation,
                    TargetValue = 5,
                    CurrentValue = 2,
                    StartDate = DateTime.UtcNow.StartOfWeek(DayOfWeek.Monday),
                    EndDate = DateTime.UtcNow.StartOfWeek(DayOfWeek.Monday).AddDays(7),
                    Status = ChallengeStatus.Active,
                    RewardPoints = 100
                }
            };
        }

        public async Task<ChallengeProgress> GetChallengeProgressAsync(Guid userId, Guid challengeId)
        {
            // This would require challenge progress tracking
            // For now, return placeholder progress
            return new ChallengeProgress
            {
                ChallengeId = challengeId,
                UserId = userId,
                CurrentValue = 2,
                TargetValue = 5,
                ProgressPercentage = 40.0,
                IsCompleted = false,
                CompletedAt = null
            };
        }

        #endregion

        #region Helper Methods

        private async Task<Dictionary<Guid, int>> GetUserPointsDictionaryAsync(IEnumerable<User> users)
        {
            var userPoints = new Dictionary<Guid, int>();
            foreach (var user in users)
            {
                var userPoint = await _userPointRepository.GetByUserIdAsync(user.Id);
                userPoints[user.Id] = userPoint?.Points ?? 0;
            }
            return userPoints;
        }

        private async Task<Dictionary<Guid, int>> GetWeeklyPointsDictionaryAsync(IEnumerable<User> users, DateTime weekStart)
        {
            // This would require point history tracking
            // For now, return current points as placeholder
            return await GetUserPointsDictionaryAsync(users);
        }

        private async Task<Dictionary<Guid, int>> GetMonthlyPointsDictionaryAsync(IEnumerable<User> users, DateTime monthStart)
        {
            // This would require point history tracking
            // For now, return current points as placeholder
            return await GetUserPointsDictionaryAsync(users);
        }

        private async Task<int> GetUserWeeklyRankAsync(Guid userId)
        {
            var weeklyLeaderboard = await GetWeeklyLeaderboardAsync(1000);
            var rank = weeklyLeaderboard.ToList().FindIndex(u => u.Id == userId) + 1;
            return rank > 0 ? rank : 1001;
        }

        private async Task<int> GetUserMonthlyRankAsync(Guid userId)
        {
            var monthlyLeaderboard = await GetMonthlyLeaderboardAsync(1000);
            var rank = monthlyLeaderboard.ToList().FindIndex(u => u.Id == userId) + 1;
            return rank > 0 ? rank : 1001;
        }

        private async Task<int> GetUserWeeklyPointsAsync(Guid userId)
        {
            // This would require weekly point tracking
            // For now, return current points as placeholder
            var userPoints = await _pointService.GetUserPointsAsync(userId);
            return userPoints.Points;
        }

        private async Task<int> GetUserMonthlyPointsAsync(Guid userId)
        {
            // This would require monthly point tracking
            // For now, return current points as placeholder
            var userPoints = await _pointService.GetUserPointsAsync(userId);
            return userPoints.Points;
        }

        private int CalculateLevel(int points)
        {
            // Simple level calculation: level = sqrt(points / 100)
            return (int)Math.Floor(Math.Sqrt(points / 100.0)) + 1;
        }

        private int GetPointsRequiredForLevel(int level)
        {
            // Points required = level^2 * 100
            return level * level * 100;
        }

        private double CalculateProgressPercentage(int points)
        {
            var currentLevel = CalculateLevel(points);
            var currentLevelPoints = GetPointsRequiredForLevel(currentLevel);
            var nextLevelPoints = GetPointsRequiredForLevel(currentLevel + 1);
            var pointsInLevel = points - currentLevelPoints;
            var pointsRequired = nextLevelPoints - currentLevelPoints;

            return pointsRequired > 0 ? (double)pointsInLevel / pointsRequired * 100 : 100;
        }

        private string GetLevelTitle(int level)
        {
            return level switch
            {
                1 => "Novice",
                2 => "Apprentice",
                3 => "Journeyman",
                4 => "Expert",
                5 => "Master",
                6 => "Grandmaster",
                7 => "Legend",
                8 => "Myth",
                9 => "Immortal",
                _ => $"Level {level} Champion"
            };
        }

        #endregion

        #region Community and Social Features

        public async Task<bool> FollowUserAsync(Guid followerId, Guid followedId)
        {
            // This would require a UserFollow entity and repository
            // For now, return true as placeholder
            if (followerId == followedId) return false;

            // Invalidate cache for both users
            await _cachingService.RemoveAsync($"{USER_STATS_CACHE_PREFIX}{followerId}");
            await _cachingService.RemoveAsync($"{USER_STATS_CACHE_PREFIX}{followedId}");

            return true;
        }

        public async Task<bool> UnfollowUserAsync(Guid followerId, Guid followedId)
        {
            // This would require a UserFollow entity and repository
            // For now, return true as placeholder
            if (followerId == followedId) return false;

            // Invalidate cache for both users
            await _cachingService.RemoveAsync($"{USER_STATS_CACHE_PREFIX}{followerId}");
            await _cachingService.RemoveAsync($"{USER_STATS_CACHE_PREFIX}{followedId}");

            return true;
        }

        public async Task<IEnumerable<User>> GetFollowersAsync(Guid userId, int top = 10)
        {
            // This would require a UserFollow repository
            // For now, return empty list as placeholder
            return new List<User>();
        }

        public async Task<IEnumerable<User>> GetFollowingAsync(Guid userId, int top = 10)
        {
            // This would require a UserFollow repository
            // For now, return empty list as placeholder
            return new List<User>();
        }

        public async Task ShareAchievementAsync(Guid userId, Guid achievementId, string message = "")
        {
            // This would require a SharedAchievement entity and repository
            // For now, this is a placeholder implementation
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new ArgumentException("User not found", nameof(userId));

            var achievements = await _userAchievementRepository.GetByUserIdAsync(userId);
            var achievement = achievements.FirstOrDefault(a => a.Id == achievementId);
            if (achievement == null) throw new ArgumentException("Achievement not found", nameof(achievementId));

            // Invalidate cache
            await _cachingService.RemoveAsync($"{LEADERBOARD_CACHE_PREFIX}shared_achievements");
        }

        public async Task<IEnumerable<SharedAchievement>> GetSharedAchievementsAsync(int top = 20)
        {
            var cacheKey = $"{LEADERBOARD_CACHE_PREFIX}shared_achievements_{top}";
            var cached = await _cachingService.GetAsync<IEnumerable<SharedAchievement>>(cacheKey);
            if (cached != null) return cached;

            // This would require a SharedAchievement repository
            // For now, return sample data as placeholder
            var result = new List<SharedAchievement>
            {
                new SharedAchievement
                {
                    ShareId = Guid.NewGuid(),
                    UserId = Guid.NewGuid(),
                    UserName = "Sample User",
                    AchievementId = Guid.NewGuid(),
                    AchievementName = "First Post",
                    Message = "Just earned my first achievement!",
                    SharedAt = DateTime.UtcNow.AddHours(-2),
                    Likes = 5,
                    LikedBy = new List<string> { "user1", "user2", "user3" }
                }
            };

            await _cachingService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return result;
        }

        #endregion

        #region Social Leaderboards and Community Events

        public async Task<IEnumerable<User>> GetCommunityLeaderboardAsync(Guid communityId, int top = 10)
        {
            // This would require community membership tracking
            // For now, return general leaderboard as placeholder
            return await GetLeaderboardAsync(top);
        }

        public async Task<IEnumerable<CommunityEvent>> GetActiveCommunityEventsAsync()
        {
            var cacheKey = $"{LEADERBOARD_CACHE_PREFIX}active_events";
            var cached = await _cachingService.GetAsync<IEnumerable<CommunityEvent>>(cacheKey);
            if (cached != null) return cached;

            // This would require a CommunityEvent repository
            // For now, return sample events as placeholder
            var result = new List<CommunityEvent>
            {
                new CommunityEvent
                {
                    EventId = Guid.NewGuid(),
                    Name = "Monthly Challenge",
                    Description = "Complete 10 posts this month",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(30),
                    Type = EventType.Challenge,
                    Status = EventStatus.Active,
                    ParticipantCount = 25,
                    RewardPoints = 500
                },
                new CommunityEvent
                {
                    EventId = Guid.NewGuid(),
                    Name = "Expert Tournament",
                    Description = "Top experts compete for the championship",
                    StartDate = DateTime.UtcNow.AddDays(7),
                    EndDate = DateTime.UtcNow.AddDays(14),
                    Type = EventType.Tournament,
                    Status = EventStatus.Upcoming,
                    ParticipantCount = 8,
                    RewardPoints = 1000
                }
            };

            await _cachingService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return result;
        }

        public async Task<UserCommunityStats> GetUserCommunityStatsAsync(Guid userId)
        {
            var cacheKey = $"{USER_STATS_CACHE_PREFIX}community_{userId}";
            var cached = await _cachingService.GetAsync<UserCommunityStats>(cacheKey);
            if (cached != null) return cached;

            var followers = await GetFollowersAsync(userId);
            var following = await GetFollowingAsync(userId);
            var sharedAchievements = await GetSharedAchievementsAsync(1000);
            var userSharedCount = sharedAchievements.Count(sa => sa.UserId == userId);

            // Calculate engagement score based on various factors
            var achievements = await _achievementService.GetUserAchievementsAsync(userId);
            var userPoints = await _pointService.GetUserPointsAsync(userId);
            var engagementScore = CalculateEngagementScore(achievements.Count(), userPoints.Points, followers.Count(), following.Count());

            var stats = new UserCommunityStats
            {
                UserId = userId,
                FollowersCount = followers.Count(),
                FollowingCount = following.Count(),
                SharedAchievementsCount = userSharedCount,
                CommunityEventsParticipated = 0, // Would need event participation tracking
                CommunityContributions = achievements.Count(),
                CommunityEngagementScore = engagementScore
            };

            await _cachingService.SetAsync(cacheKey, stats, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return stats;
        }

        #endregion

        #region Real-time Updates and Synchronization

        public async Task SubscribeToLeaderboardUpdatesAsync(Guid userId)
        {
            // This would integrate with SignalR or WebSocket for real-time updates
            // For now, this is a placeholder
        }

        public async Task UnsubscribeFromLeaderboardUpdatesAsync(Guid userId)
        {
            // This would integrate with SignalR or WebSocket for real-time updates
            // For now, this is a placeholder
        }

        public async Task NotifyRankChangeAsync(Guid userId, int oldRank, int newRank)
        {
            // This would send push notifications via SignalR or external service
            // For now, this is a placeholder
            if (oldRank != newRank)
            {
                // Invalidate user stats cache to force refresh
                await _cachingService.RemoveAsync($"{USER_STATS_CACHE_PREFIX}{userId}");
            }
        }

        public async Task SyncLeaderboardDataAsync()
        {
            // This would synchronize leaderboard data across distributed systems
            // Clear all leaderboard caches to force refresh
            // Note: RemoveByPatternAsync not implemented in ICachingService
        }

        #endregion

        #region Review and Feedback System

        public async Task<AchievementReview> AddAchievementReviewAsync(Guid userId, Guid achievementId, int rating, string comment)
        {
            // This would require an AchievementReview entity and repository
            // For now, return a placeholder review
            if (rating < 1 || rating > 5) throw new ArgumentException("Rating must be between 1 and 5", nameof(rating));

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new ArgumentException("User not found", nameof(userId));

            var achievements = await _userAchievementRepository.GetByUserIdAsync(userId);
            if (!achievements.Any(a => a.Id == achievementId)) throw new ArgumentException("Achievement not found", nameof(achievementId));

            var review = new AchievementReview
            {
                ReviewId = Guid.NewGuid(),
                UserId = userId,
                UserName = user.UserName,
                AchievementId = achievementId,
                Rating = rating,
                Comment = comment,
                CreatedAt = DateTime.UtcNow,
                Status = ReviewStatus.Pending,
                HelpfulVotes = 0,
                Tags = new List<string>()
            };

            // Invalidate cache
            await _cachingService.RemoveAsync($"{LEADERBOARD_CACHE_PREFIX}achievement_reviews_{achievementId}");

            return review;
        }

        public async Task<IEnumerable<AchievementReview>> GetAchievementReviewsAsync(Guid achievementId, int page = 1, int pageSize = 10)
        {
            var cacheKey = $"{LEADERBOARD_CACHE_PREFIX}achievement_reviews_{achievementId}_{page}_{pageSize}";
            var cached = await _cachingService.GetAsync<IEnumerable<AchievementReview>>(cacheKey);
            if (cached != null) return cached;

            // This would require an AchievementReview repository
            // For now, return sample reviews as placeholder
            var result = new List<AchievementReview>
            {
                new AchievementReview
                {
                    ReviewId = Guid.NewGuid(),
                    UserId = Guid.NewGuid(),
                    UserName = "Reviewer1",
                    AchievementId = achievementId,
                    Rating = 5,
                    Comment = "This achievement is amazing! Really motivating.",
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    Status = ReviewStatus.Approved,
                    HelpfulVotes = 3,
                    Tags = new List<string> { "motivating", "challenging" }
                },
                new AchievementReview
                {
                    ReviewId = Guid.NewGuid(),
                    UserId = Guid.NewGuid(),
                    UserName = "Reviewer2",
                    AchievementId = achievementId,
                    Rating = 4,
                    Comment = "Good achievement, but could be clearer.",
                    CreatedAt = DateTime.UtcNow.AddDays(-2),
                    Status = ReviewStatus.Approved,
                    HelpfulVotes = 1,
                    Tags = new List<string> { "clear", "improvement" }
                }
            };

            await _cachingService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return result;
        }

        public async Task<AchievementReviewStats> GetAchievementReviewStatsAsync(Guid achievementId)
        {
            var cacheKey = $"{LEADERBOARD_CACHE_PREFIX}achievement_stats_{achievementId}";
            var cached = await _cachingService.GetAsync<AchievementReviewStats>(cacheKey);
            if (cached != null) return cached;

            var reviews = await GetAchievementReviewsAsync(achievementId, 1, 1000);
            var approvedReviews = reviews.Where(r => r.Status == ReviewStatus.Approved);

            var ratingDistribution = new Dictionary<int, int>();
            for (int i = 1; i <= 5; i++)
            {
                ratingDistribution[i] = approvedReviews.Count(r => r.Rating == i);
            }

            var allTags = approvedReviews.SelectMany(r => r.Tags).ToList();
            var topTags = allTags.GroupBy(t => t)
                                .OrderByDescending(g => g.Count())
                                .Take(5)
                                .Select(g => g.Key)
                                .ToList();

            var stats = new AchievementReviewStats
            {
                AchievementId = achievementId,
                AverageRating = approvedReviews.Any() ? approvedReviews.Average(r => r.Rating) : 0,
                TotalReviews = approvedReviews.Count(),
                RatingDistribution = ratingDistribution,
                TopTags = topTags,
                HelpfulnessScore = approvedReviews.Any() ? approvedReviews.Average(r => r.HelpfulVotes) : 0
            };

            await _cachingService.SetAsync(cacheKey, stats, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return stats;
        }

        public async Task<BadgeReview> AddBadgeReviewAsync(Guid userId, Guid badgeId, int rating, string comment)
        {
            // This would require a BadgeReview entity and repository
            // Similar implementation to achievement reviews
            if (rating < 1 || rating > 5) throw new ArgumentException("Rating must be between 1 and 5", nameof(rating));

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new ArgumentException("User not found", nameof(userId));

            var badge = await _badgeRepository.GetByIdAsync(badgeId);
            if (badge == null) throw new ArgumentException("Badge not found", nameof(badgeId));

            var review = new BadgeReview
            {
                ReviewId = Guid.NewGuid(),
                UserId = userId,
                UserName = user.UserName,
                BadgeId = badgeId,
                Rating = rating,
                Comment = comment,
                CreatedAt = DateTime.UtcNow,
                Status = ReviewStatus.Pending,
                HelpfulVotes = 0,
                Tags = new List<string>()
            };

            // Invalidate cache
            await _cachingService.RemoveAsync($"{LEADERBOARD_CACHE_PREFIX}badge_reviews_{badgeId}");

            return review;
        }

        public async Task<IEnumerable<BadgeReview>> GetBadgeReviewsAsync(Guid badgeId, int page = 1, int pageSize = 10)
        {
            var cacheKey = $"{LEADERBOARD_CACHE_PREFIX}badge_reviews_{badgeId}_{page}_{pageSize}";
            var cached = await _cachingService.GetAsync<IEnumerable<BadgeReview>>(cacheKey);
            if (cached != null) return cached;

            // This would require a BadgeReview repository
            // For now, return sample reviews as placeholder
            var result = new List<BadgeReview>
            {
                new BadgeReview
                {
                    ReviewId = Guid.NewGuid(),
                    UserId = Guid.NewGuid(),
                    UserName = "BadgeReviewer1",
                    BadgeId = badgeId,
                    Rating = 5,
                    Comment = "Beautiful badge design!",
                    CreatedAt = DateTime.UtcNow.AddDays(-1),
                    Status = ReviewStatus.Approved,
                    HelpfulVotes = 2,
                    Tags = new List<string> { "design", "beautiful" }
                }
            };

            await _cachingService.SetAsync(cacheKey, result, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return result;
        }

        public async Task<BadgeReviewStats> GetBadgeReviewStatsAsync(Guid badgeId)
        {
            var cacheKey = $"{LEADERBOARD_CACHE_PREFIX}badge_stats_{badgeId}";
            var cached = await _cachingService.GetAsync<BadgeReviewStats>(cacheKey);
            if (cached != null) return cached;

            var reviews = await GetBadgeReviewsAsync(badgeId, 1, 1000);
            var approvedReviews = reviews.Where(r => r.Status == ReviewStatus.Approved);

            var ratingDistribution = new Dictionary<int, int>();
            for (int i = 1; i <= 5; i++)
            {
                ratingDistribution[i] = approvedReviews.Count(r => r.Rating == i);
            }

            var allTags = approvedReviews.SelectMany(r => r.Tags).ToList();
            var topTags = allTags.GroupBy(t => t)
                                .OrderByDescending(g => g.Count())
                                .Take(5)
                                .Select(g => g.Key)
                                .ToList();

            var stats = new BadgeReviewStats
            {
                BadgeId = badgeId,
                AverageRating = approvedReviews.Any() ? approvedReviews.Average(r => r.Rating) : 0,
                TotalReviews = approvedReviews.Count(),
                RatingDistribution = ratingDistribution,
                TopTags = topTags,
                HelpfulnessScore = approvedReviews.Any() ? approvedReviews.Average(r => r.HelpfulVotes) : 0
            };

            await _cachingService.SetAsync(cacheKey, stats, TimeSpan.FromMinutes(CACHE_DURATION_MINUTES));
            return stats;
        }

        #endregion

        #region Moderation Features

        public async Task ModerateReviewAsync(Guid reviewId, ReviewModerationAction action, string reason = "")
        {
            // This would require review repositories and moderation logic
            // For now, this is a placeholder implementation
            // Invalidate relevant caches
            // Note: RemoveByPatternAsync not implemented in ICachingService
        }

        public async Task<IEnumerable<PendingReview>> GetPendingReviewsAsync(int page = 1, int pageSize = 20)
        {
            // This would require review repositories with status filtering
            // For now, return empty list as placeholder
            return new List<PendingReview>();
        }

        public async Task ReportReviewAsync(Guid reviewId, Guid reporterId, string reason)
        {
            // This would require a ReviewReport entity and repository
            // For now, this is a placeholder implementation
        }

        #endregion

        #region Additional Helper Methods

        private double CalculateEngagementScore(int achievements, int points, int followers, int following)
        {
            // Simple engagement score calculation
            double achievementWeight = 0.3;
            double pointsWeight = 0.3;
            double followerWeight = 0.2;
            double followingWeight = 0.2;

            return (achievements * achievementWeight) +
                   (points * 0.01 * pointsWeight) +
                   (followers * followerWeight) +
                   (following * followingWeight);
        }

        #endregion
    }

    #region Extension Methods

    public static class DateTimeExtensions
    {
        public static DateTime StartOfWeek(this DateTime dt, DayOfWeek startOfWeek)
        {
            int diff = (7 + (dt.DayOfWeek - startOfWeek)) % 7;
            return dt.AddDays(-1 * diff).Date;
        }
    }

    #endregion
}