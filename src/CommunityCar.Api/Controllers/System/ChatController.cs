using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.System;

[ApiController]
[Route("api/v1/system/chat")]
[Authorize]
public class ChatController : ControllerBase
{
    /// <summary>
    /// Get user's chat conversations
    /// </summary>
    [HttpGet("conversations")]
    public IActionResult GetConversations()
    {
        return Ok(new[] { new { Id = 1, With = "User2", LastMessage = "Hello!", Timestamp = DateTime.UtcNow } });
    }

    /// <summary>
    /// Get messages in a conversation
    /// </summary>
    [HttpGet("conversations/{id}/messages")]
    public IActionResult GetMessages(int id)
    {
        return Ok(new[] { new { Id = 1, Sender = "User1", Message = "Hello", Timestamp = DateTime.UtcNow } });
    }

    /// <summary>
    /// Send a message
    /// </summary>
    [HttpPost("messages")]
    public IActionResult SendMessage([FromBody] object message)
    {
        return Ok(new { Id = 1, Message = "Message sent" });
    }
}