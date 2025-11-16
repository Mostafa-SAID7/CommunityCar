using CommunityCar.Domain.Entities.Identity;

namespace CommunityCar.Domain.Entities;

public class Reaction : BaseEntity
{
    public string UserId { get; set; } = string.Empty;
    public User User { get; set; } = null!;
    public Guid? PostId { get; set; }
    public Post? Post { get; set; }
    public Guid? AnswerId { get; set; }
    public Answer? Answer { get; set; }
    public bool IsUpvote { get; set; }
}