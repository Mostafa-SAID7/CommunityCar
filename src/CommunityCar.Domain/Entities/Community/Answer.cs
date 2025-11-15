namespace CommunityCar.Domain.Entities;

public class Answer : BaseEntity
{
    public string Content { get; set; } = string.Empty;
    public bool IsAiSuggested { get; set; }
    public int Votes { get; set; }
    public bool IsAccepted { get; set; }
    public Guid PostId { get; set; }
    public Post Post { get; set; } = null!;
    public string AuthorId { get; set; } = string.Empty;
    public User Author { get; set; } = null!;
    public List<Reaction> Reactions { get; set; } = new();
}