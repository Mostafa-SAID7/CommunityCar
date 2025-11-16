using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.Content;

[ApiController]
[Route("api/v1/content/guides")]
public class GuidesController : ControllerBase
{
    /// <summary>
    /// Get all guides
    /// </summary>
    [HttpGet]
    public IActionResult GetGuides()
    {
        return Ok(new[] { new { Id = 1, Title = "Car Maintenance Guide", Category = "Maintenance" } });
    }

    /// <summary>
    /// Get guide by ID
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetGuide(int id)
    {
        return Ok(new { Id = id, Title = "Guide Details", Content = "Guide content here" });
    }

    /// <summary>
    /// Create new guide
    /// </summary>
    [HttpPost]
    public IActionResult CreateGuide([FromBody] object guide)
    {
        return Created("", new { Id = 1, Message = "Guide created" });
    }
}