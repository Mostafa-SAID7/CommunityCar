using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.Content;

[ApiController]
[Route("api/v1/content/events")]
public class EventsController : ControllerBase
{
    /// <summary>
    /// Get all events
    /// </summary>
    [HttpGet]
    public IActionResult GetEvents()
    {
        return Ok(new[] { new { Id = 1, Title = "Car Show 2024", Date = "2024-12-01" } });
    }

    /// <summary>
    /// Get event by ID
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetEvent(int id)
    {
        return Ok(new { Id = id, Title = "Event Details", Description = "Event description" });
    }

    /// <summary>
    /// Create new event
    /// </summary>
    [HttpPost]
    public IActionResult CreateEvent([FromBody] object eventData)
    {
        return Created("", new { Id = 1, Message = "Event created" });
    }
}