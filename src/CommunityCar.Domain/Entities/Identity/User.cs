using CommunityCar.Domain.Enums;
using CommunityCar.Domain.ValueObjects;

using CommunityCar.Domain.Enums;
using CommunityCar.Domain.ValueObjects;

using Microsoft.AspNetCore.Identity;

namespace CommunityCar.Domain.Entities;

public class User : IdentityUser
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public RoleType Role { get; set; }
    public bool IsVerified { get; set; }
    public Location? Location { get; set; }
    public SubscriptionPlan SubscriptionPlan { get; set; }
    public bool IsLive { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<Post> Posts { get; set; } = new();
    public List<Answer> Answers { get; set; } = new();
}