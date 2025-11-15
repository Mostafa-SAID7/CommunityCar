using CommunityCar.Application.Interfaces;
using CommunityCar.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PostsController : ControllerBase
{
    private readonly IPostService _postService;

    public PostsController(IPostService postService)
    {
        _postService = postService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Post>>> GetPosts([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var posts = await _postService.GetPostsAsync(page, pageSize);
        return Ok(posts);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetPost(Guid id)
    {
        var post = await _postService.GetPostByIdAsync(id);
        if (post == null)
        {
            return NotFound();
        }
        return Ok(post);
    }

    [HttpPost]
    public async Task<ActionResult<Post>> CreatePost([FromBody] CreatePostRequest request)
    {
        var post = await _postService.CreatePostAsync(request.Title, request.Body, request.Category);
        return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePost(Guid id, [FromBody] UpdatePostRequest request)
    {
        await _postService.UpdatePostAsync(id, request.Title, request.Body);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePost(Guid id)
    {
        await _postService.DeletePostAsync(id);
        return NoContent();
    }
}

public class CreatePostRequest
{
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
}

public class UpdatePostRequest
{
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
}