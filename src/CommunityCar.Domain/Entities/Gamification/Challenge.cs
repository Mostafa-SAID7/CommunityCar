using CommunityCar.Application.DTOs.Enums;

namespace CommunityCar.Application.DTOs.Gamification
{
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
}
