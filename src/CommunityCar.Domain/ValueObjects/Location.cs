namespace CommunityCar.Domain.ValueObjects;

public class Location
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string? Address { get; set; }
}