using Microsoft.EntityFrameworkCore;

namespace CommunityCar.ML.Car.Data
{
    public class AiDbContext : DbContext
    {
        public AiDbContext(DbContextOptions<AiDbContext> options) : base(options) { }

        // DbSets for ML data, e.g., feedback logs
        public DbSet<FeedbackLog> FeedbackLogs { get; set; }
    }

    public class FeedbackLog
    {
        public int Id { get; set; }
        public int SuggestionId { get; set; }
        public bool IsUpvote { get; set; }
        public DateTime Timestamp { get; set; }
    }
}