using CommunityCar.Domain.Entities.Identity;

namespace CommunityCar.Domain.Entities.Gamification
{
    public class UserAchievement : BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid BadgeId { get; set; }
        public DateTime EarnedAt { get; set; }

        // Navigation properties
        public User User { get; set; } = null!;
        public Badge Badge { get; set; } = null!;

        public UserAchievement() { }

        public UserAchievement(Guid userId, Guid badgeId, DateTime earnedAt)
        {
            UserId = userId;
            BadgeId = badgeId;
            EarnedAt = earnedAt;
        }
    }
}