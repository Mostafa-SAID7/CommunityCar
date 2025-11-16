using CommunityCar.Application.DTOs.Enums;

namespace CommunityCar.Application.DTOs.Gamification
{
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
}
