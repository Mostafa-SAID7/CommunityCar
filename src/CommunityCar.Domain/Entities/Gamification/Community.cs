using CommunityCar.Application.DTOs.Enums;

namespace CommunityCar.Application.DTOs.Gamification
{
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
}
