namespace CommunityCar.Domain.Entities.Gamification
{
    public class UserPoint : BaseEntity
    {
        public Guid UserId { get; set; }
        public int Points { get; set; }
        public DateTime LastUpdated { get; set; }

        // Navigation property
        public User User { get; set; } = null!;

        public UserPoint() { }

        public UserPoint(Guid userId, int points)
        {
            UserId = userId;
            Points = points;
            LastUpdated = DateTime.UtcNow;
        }

        public void AddPoints(int points)
        {
            Points += points;
            LastUpdated = DateTime.UtcNow;
        }

        public void SubtractPoints(int points)
        {
            Points -= points;
            LastUpdated = DateTime.UtcNow;
        }
    }
}