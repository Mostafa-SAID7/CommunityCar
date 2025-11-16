using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.Content;

[ApiController]
[Route("api/v1/content/articles")]
public class ArticlesController : ControllerBase
{
    /// <summary>
    /// Get all articles
    /// </summary>
    [HttpGet]
    public IActionResult GetArticles()
    {
        return Ok(new[] { new { Id = 1, Title = "Latest Car News", Author = "John Doe" } });
    }

    /// <summary>
    /// Get article by ID
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetArticle(int id)
    {
        return Ok(new { Id = id, Title = "Article Details", Content = "Article content here" });
    }

    /// <summary>
    /// Create new article
    /// </summary>
    [HttpPost]
    public IActionResult CreateArticle([FromBody] object article)
    {
        return Created("", new { Id = 1, Message = "Article created" });
    }
}