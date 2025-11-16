using CommunityCar.Domain.ValueObjects;

using CommunityCar.Domain.ValueObjects;

namespace CommunityCar.Domain.Entities;

public class Garage : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public Location Location { get; set; } = null!;
    public string OwnerId { get; set; } = string.Empty;
    public Identity.User Owner { get; set; } = null!;
    public List<Booking> Bookings { get; set; } = new();
}