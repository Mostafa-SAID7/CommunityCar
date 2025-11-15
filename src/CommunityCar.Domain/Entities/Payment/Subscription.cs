using CommunityCar.Domain.Enums;

namespace CommunityCar.Domain.Entities;

public class Subscription : BaseEntity
{
    public string UserId { get; set; } = string.Empty;
    public User User { get; set; } = null!;
    public SubscriptionPlan Plan { get; set; }
    public string Status { get; set; } = string.Empty; // Active, Cancelled, Expired
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}