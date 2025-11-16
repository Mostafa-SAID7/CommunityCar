using CommunityCar.Application.DTOs.Enums;

namespace CommunityCar.Application.DTOs.Gamification
{
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
}
