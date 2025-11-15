namespace CommunityCar.Domain.Entities.Community
{
    public class PostTag
    {
        public int PostId { get; set; }
        public int TagId { get; set; }

        // Navigation properties
        public Post Post { get; set; }
        public Tag Tag { get; set; }
    }
}