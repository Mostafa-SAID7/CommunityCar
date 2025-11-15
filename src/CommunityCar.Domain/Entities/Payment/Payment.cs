using CommunityCar.Domain.Enums;

using CommunityCar.Domain.Enums;

namespace CommunityCar.Domain.Entities;

public class Payment : BaseEntity
{
    public string UserId { get; set; } = string.Empty;
    public User User { get; set; } = null!;
    public decimal Amount { get; set; }
    public Currency Currency { get; set; }
    public string Status { get; set; } = string.Empty; // Pending, Succeeded, Failed
}