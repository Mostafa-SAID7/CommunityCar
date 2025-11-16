using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.Services;

[ApiController]
[Route("api/v1/services/parts")]
public class PartsController : ControllerBase
{
    /// <summary>
    /// Get all parts
    /// </summary>
    [HttpGet]
    public IActionResult GetParts()
    {
        return Ok(new[] { new { Id = 1, Name = "Brake Pads", Price = 49.99 } });
    }

    /// <summary>
    /// Get part by ID
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetPart(int id)
    {
        return Ok(new { Id = id, Name = "Part Details", Description = "Part description" });
    }

    /// <summary>
    /// Search parts
    /// </summary>
    [HttpGet("search")]
    public IActionResult SearchParts([FromQuery] string query)
    {
        return Ok(new[] { new { Id = 1, Name = "Search Result", Price = 29.99 } });
    }
}