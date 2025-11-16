using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using CommunityCar.Api.Hubs;

namespace CommunityCar.Api.Controllers.System;

[ApiController]
[Route("api/v1/system/chat")]
[Authorize]
public class ChatController : ControllerBase
{
    private readonly IHubContext<ChatHub> _chatHub;

    public ChatController(IHubContext<ChatHub> chatHub)
    {
        _chatHub = chatHub;
    }

    /// <summary>
    /// Get user's chat conversations
    /// </summary>
    [HttpGet("conversations")]
    public IActionResult GetConversations()
    {
        // Mock data - in real implementation, fetch from database
        var conversations = new[]
        {
            new
            {
                Id = "conv_1",
                Type = "direct",
                Participants = new[] { "user1", "user2" },
                LastMessage = new { Sender = "user2", Message = "Hello!", Timestamp = DateTime.UtcNow },
                UnreadCount = 0
            },
            new
            {
                Id = "ai_assistant",
                Type = "ai",
                Participants = new[] { User.Identity?.Name ?? "user", "AI Assistant" },
                LastMessage = new { Sender = "AI Assistant", Message = "How can I help you today?", Timestamp = DateTime.UtcNow },
                UnreadCount = 0
            }
        };

        return Ok(conversations);
    }

    /// <summary>
    /// Get messages in a conversation
    /// </summary>
    [HttpGet("conversations/{conversationId}/messages")]
    public IActionResult GetMessages(string conversationId)
    {
        // Mock data - in real implementation, fetch from database
        var messages = conversationId == "ai_assistant"
            ? new[]
            {
                new { Id = "msg_1", Sender = "AI Assistant", Message = "Hello! I'm your AI assistant. How can I help you with your car-related questions?", Timestamp = DateTime.UtcNow.AddMinutes(-5) },
                new { Id = "msg_2", Sender = "AI Assistant", Message = "I can help with maintenance tips, troubleshooting, finding parts, or general automotive advice.", Timestamp = DateTime.UtcNow.AddMinutes(-4) }
            }
            : new[]
            {
                new { Id = "msg_1", Sender = "user1", Message = "Hello", Timestamp = DateTime.UtcNow.AddMinutes(-10) },
                new { Id = "msg_2", Sender = "user2", Message = "Hi there!", Timestamp = DateTime.UtcNow.AddMinutes(-9) }
            };

        return Ok(messages);
    }

    /// <summary>
    /// Send a message
    /// </summary>
    [HttpPost("conversations/{conversationId}/messages")]
    public async Task<IActionResult> SendMessage(string conversationId, [FromBody] SendMessageRequest request)
    {
        var userId = User.Identity?.Name ?? "Anonymous";
        var messageId = Guid.NewGuid().ToString();

        var messageData = new
        {
            Id = messageId,
            ConversationId = conversationId,
            SenderId = userId,
            SenderName = userId,
            Message = request.Message,
            Timestamp = DateTime.UtcNow
        };

        // Send via SignalR
        await _chatHub.Clients.Group($"conversation_{conversationId}").SendAsync("ReceiveMessage", messageData);

        // If it's AI conversation, generate AI response
        if (conversationId == "ai_assistant")
        {
            await GenerateAIResponse(conversationId, request.Message);
        }

        return Ok(new { MessageId = messageId, Status = "Message sent" });
    }

    private async Task GenerateAIResponse(string conversationId, string userMessage)
    {
        // Simple AI response logic - in real implementation, use AI service
        var aiResponse = GenerateSimpleAIResponse(userMessage);

        var aiMessageData = new
        {
            Id = Guid.NewGuid().ToString(),
            ConversationId = conversationId,
            SenderId = "ai_assistant",
            SenderName = "AI Assistant",
            Message = aiResponse,
            Timestamp = DateTime.UtcNow
        };

        // Send AI response after a short delay
        await Task.Delay(1000);
        await _chatHub.Clients.Group($"conversation_{conversationId}").SendAsync("ReceiveMessage", aiMessageData);
    }

    private string GenerateSimpleAIResponse(string userMessage)
    {
        var message = userMessage.ToLower();

        if (message.Contains("oil") || message.Contains("change"))
            return "For oil changes, I recommend checking your owner's manual for the specific interval. Generally, it's every 5,000-7,500 miles for conventional oil, or up to 10,000 miles for synthetic oil.";

        if (message.Contains("tire") || message.Contains("pressure"))
            return "Proper tire pressure is crucial for safety and fuel efficiency. Check your door jamb sticker for the recommended PSI. I suggest checking monthly.";

        if (message.Contains("battery") || message.Contains("start"))
            return "If your car won't start, it could be the battery. Try jump-starting it, or have it tested at an auto parts store. Batteries typically last 3-5 years.";

        if (message.Contains("brake") || message.Contains("stop"))
            return "Brake issues should be addressed immediately. Look for warning lights, unusual noises, or pulling to one side. Have a professional inspect them right away.";

        return "I'm here to help with your car questions! I can provide advice on maintenance, troubleshooting, and general automotive information. What specific issue are you dealing with?";
    }
}

public class SendMessageRequest
{
    public string Message { get; set; } = string.Empty;
}