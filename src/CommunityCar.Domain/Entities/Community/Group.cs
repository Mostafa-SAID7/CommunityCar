namespace CommunityCar.Domain.Entities;

public class Group : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public List<User> Members { get; set; } = new();
    public List<User> Moderators { get; set; } = new();
    public List<Post> Posts { get; set; } = new();
}