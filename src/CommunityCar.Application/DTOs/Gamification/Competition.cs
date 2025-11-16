using CommunityCar.Application.DTOs.Enums;

namespace CommunityCar.Application.DTOs.Gamification
{
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
}
