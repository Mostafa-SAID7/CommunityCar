using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.Content;

[ApiController]
[Route("api/v1/content/tutorials")]
public class TutorialsController : ControllerBase
{
    /// <summary>
    /// Get all tutorials
    /// </summary>
    [HttpGet]
    public IActionResult GetTutorials()
    {
        return Ok(new[] { new { Id = 1, Title = "How to Change Oil", Difficulty = "Beginner" } });
    }

    /// <summary>
    /// Get tutorial by ID
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetTutorial(int id)
    {
        return Ok(new { Id = id, Title = "Tutorial Details", Steps = "Step by step guide" });
    }

    /// <summary>
    /// Create new tutorial
    /// </summary>
    [HttpPost]
    public IActionResult CreateTutorial([FromBody] object tutorial)
    {
        return Created("", new { Id = 1, Message = "Tutorial created" });
    }
}