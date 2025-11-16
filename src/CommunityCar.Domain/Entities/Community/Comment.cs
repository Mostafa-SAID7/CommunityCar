using CommunityCar.Domain.Entities.Identity;
using CommunityCar.Shared.Interfaces;

namespace CommunityCar.Domain.Entities.Community
{
    public class Comment : IAuditable
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }

        // Navigation properties
        public Post Post { get; set; }
        public User User { get; set; }
    }
}