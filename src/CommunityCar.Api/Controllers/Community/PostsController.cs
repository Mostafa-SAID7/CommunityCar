using CommunityCar.Shared.DTOs.Request.Community.Post;
using CommunityCar.Shared.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace CommunityCar.Api.Controllers.Community;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PostsController(IPostService _postService) : ControllerBase
{

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePost(Guid id)
    {
        await _postService.DeletePostAsync(id);
        return NoContent();
    }
}