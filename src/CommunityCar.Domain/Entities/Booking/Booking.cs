namespace CommunityCar.Domain.Entities;

public class Booking : BaseEntity
{
    public string UserId { get; set; } = string.Empty;
    public User User { get; set; } = null!;
    public string? MechanicId { get; set; }
    public User? Mechanic { get; set; }
    public Guid? GarageId { get; set; }
    public Garage? Garage { get; set; }
    public DateTime ScheduledAt { get; set; }
    public string Status { get; set; } = string.Empty; // Pending, Confirmed, Completed, Cancelled
}