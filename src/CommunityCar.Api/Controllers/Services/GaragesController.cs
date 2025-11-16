using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.Services;

[ApiController]
[Route("api/v1/services/garages")]
public class GaragesController : ControllerBase
{
    /// <summary>
    /// Get all garages
    /// </summary>
    [HttpGet]
    public IActionResult GetGarages()
    {
        return Ok(new[] { new { Id = 1, Name = "Quick Fix Garage", Rating = 4.2 } });
    }

    /// <summary>
    /// Get garage by ID
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetGarage(int id)
    {
        return Ok(new { Id = id, Name = "Garage Details", Services = new[] { "Oil Change", "Brake Repair" } });
    }

    /// <summary>
    /// Search garages
    /// </summary>
    [HttpGet("search")]
    public IActionResult SearchGarages([FromQuery] string location)
    {
        return Ok(new[] { new { Id = 1, Name = "Nearby Garage", Distance = "2.5 km" } });
    }
}