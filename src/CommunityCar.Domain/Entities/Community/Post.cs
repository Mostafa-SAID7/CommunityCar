using CommunityCar.Domain.Entities.Identity;
using CommunityCar.Domain.Enums;

namespace CommunityCar.Domain.Entities;

public class Post : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public PostCategory Category { get; set; }
    public List<string> Tags { get; set; } = new();
    public Visibility Visibility { get; set; }
    public decimal? Price { get; set; }
    public bool IsSolved { get; set; }
    public string AuthorId { get; set; } = string.Empty;
    public User Author { get; set; } = null!;
    public List<Answer> Answers { get; set; } = new();
    public List<Reaction> Reactions { get; set; } = new();
}