namespace CommunityCar.Application.DTOs
{
    // Supporting DTOs for enhanced leaderboard features
    public class UserLeaderboardStats
    {
        public Guid UserId { get; set; }
        public int CurrentRank { get; set; }
        public int WeeklyRank { get; set; }
        public int MonthlyRank { get; set; }
        public int AllTimeRank { get; set; }
        public int TotalPoints { get; set; }
        public int WeeklyPoints { get; set; }
        public int MonthlyPoints { get; set; }
        public int AchievementCount { get; set; }
        public int BadgeCount { get; set; }
        public int CurrentStreak { get; set; }
        public int LongestStreak { get; set; }
        public DateTime LastActivity { get; set; }
    }

    public class UserProgression
    {
        public Guid UserId { get; set; }
        public int CurrentLevel { get; set; }
        public int PointsToNextLevel { get; set; }
        public int TotalPointsEarned { get; set; }
        public double ProgressPercentage { get; set; }
        public string CurrentTitle { get; set; } = string.Empty;
        public string NextTitle { get; set; } = string.Empty;
        public IEnumerable<string> RecentAchievements { get; set; } = new List<string>();
    }

    public class UserStreak
    {
        public Guid UserId { get; set; }
        public int CurrentStreak { get; set; }
        public int LongestStreak { get; set; }
        public DateTime LastActivityDate { get; set; }
        public StreakType Type { get; set; }
    }

    public enum StreakType
    {
        DailyLogin,
        WeeklyActivity,
        MonthlyContribution,
        AchievementStreak
    }

    public class LeaderboardEntry
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public int Rank { get; set; }
        public int Points { get; set; }
        public DateTime RecordedAt { get; set; }
    }

    public class UserRankHistory
    {
        public Guid UserId { get; set; }
        public IEnumerable<RankHistoryPoint> History { get; set; } = new List<RankHistoryPoint>();
    }

    public class RankHistoryPoint
    {
        public DateTime Date { get; set; }
        public int Rank { get; set; }
        public int Points { get; set; }
    }

    public class CompetitionResult
    {
        public Guid CompetitionId { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public CompetitionStatus Status { get; set; }
        public IEnumerable<CompetitionParticipant> Participants { get; set; } = new List<CompetitionParticipant>();
        public CompetitionParticipant? Winner { get; set; }
    }

    public enum CompetitionStatus
    {
        Upcoming,
        Active,
        Completed,
        Cancelled
    }

    public class CompetitionParticipant
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public int Points { get; set; }
        public int Rank { get; set; }
        public bool IsWinner { get; set; }
    }

    public class UserCompetitionStats
    {
        public Guid UserId { get; set; }
        public int CompetitionsParticipated { get; set; }
        public int CompetitionsWon { get; set; }
        public int TotalCompetitionPoints { get; set; }
        public double WinRate { get; set; }
        public CompetitionParticipant? BestResult { get; set; }
    }

    public class PersonalChallenge
    {
        public Guid ChallengeId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public ChallengeType Type { get; set; }
        public int TargetValue { get; set; }
        public int CurrentValue { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ChallengeStatus Status { get; set; }
        public int RewardPoints { get; set; }
    }

    public enum ChallengeType
    {
        PostCreation,
        AnswerHelping,
        CommunityEngagement,
        AchievementUnlock,
        StreakMaintenance,
        PointMilestone
    }

    public enum ChallengeStatus
    {
        Active,
        Completed,
        Failed,
        Expired
    }

    public class ChallengeProgress
    {
        public Guid ChallengeId { get; set; }
        public Guid UserId { get; set; }
        public int CurrentValue { get; set; }
        public int TargetValue { get; set; }
        public double ProgressPercentage { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? CompletedAt { get; set; }
    }

    // Community and Social DTOs
    public class SharedAchievement
    {
        public Guid ShareId { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public Guid AchievementId { get; set; }
        public string AchievementName { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime SharedAt { get; set; }
        public int Likes { get; set; }
        public IEnumerable<string> LikedBy { get; set; } = new List<string>();
    }

    public class CommunityEvent
    {
        public Guid EventId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public EventType Type { get; set; }
        public EventStatus Status { get; set; }
        public int ParticipantCount { get; set; }
        public int RewardPoints { get; set; }
    }

    public enum EventType
    {
        Competition,
        Challenge,
        Tournament,
        SeasonalEvent,
        CommunityGoal
    }

    public enum EventStatus
    {
        Upcoming,
        Active,
        Completed,
        Cancelled
    }

    public class UserCommunityStats
    {
        public Guid UserId { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public int SharedAchievementsCount { get; set; }
        public int CommunityEventsParticipated { get; set; }
        public int CommunityContributions { get; set; }
        public double CommunityEngagementScore { get; set; }
    }

    // Review and Feedback DTOs
    public class AchievementReview
    {
        public Guid ReviewId { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public Guid AchievementId { get; set; }
        public int Rating { get; set; } // 1-5 stars
        public string Comment { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public ReviewStatus Status { get; set; }
        public int HelpfulVotes { get; set; }
        public IEnumerable<string> Tags { get; set; } = new List<string>();
    }

    public class AchievementReviewStats
    {
        public Guid AchievementId { get; set; }
        public double AverageRating { get; set; }
        public int TotalReviews { get; set; }
        public Dictionary<int, int> RatingDistribution { get; set; } = new Dictionary<int, int>();
        public IEnumerable<string> TopTags { get; set; } = new List<string>();
        public double HelpfulnessScore { get; set; }
    }

    public class BadgeReview
    {
        public Guid ReviewId { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public Guid BadgeId { get; set; }
        public int Rating { get; set; } // 1-5 stars
        public string Comment { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public ReviewStatus Status { get; set; }
        public int HelpfulVotes { get; set; }
        public IEnumerable<string> Tags { get; set; } = new List<string>();
    }

    public class BadgeReviewStats
    {
        public Guid BadgeId { get; set; }
        public double AverageRating { get; set; }
        public int TotalReviews { get; set; }
        public Dictionary<int, int> RatingDistribution { get; set; } = new Dictionary<int, int>();
        public IEnumerable<string> TopTags { get; set; } = new List<string>();
        public double HelpfulnessScore { get; set; }
    }

    public enum ReviewStatus
    {
        Pending,
        Approved,
        Rejected,
        Moderated
    }

    // Moderation DTOs
    public class PendingReview
    {
        public Guid ReviewId { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string ReviewType { get; set; } = string.Empty; // "Achievement" or "Badge"
        public string Content { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; }
        public int Flags { get; set; }
        public IEnumerable<string> FlagReasons { get; set; } = new List<string>();
    }

    public enum ReviewModerationAction
    {
        Approve,
        Reject,
        Flag,
        Delete,
        Edit
    }
}