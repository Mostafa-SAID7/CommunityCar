using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace CommunityCar.Api.Hubs;

[Authorize]
public class ChatHub : Hub
{
    private readonly ILogger<ChatHub> _logger;

    public ChatHub(ILogger<ChatHub> logger)
    {
        _logger = logger;
    }

    public override async Task OnConnectedAsync()
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!string.IsNullOrEmpty(userId))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"user_{userId}");
            _logger.LogInformation("User {UserId} connected to chat hub", userId);
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!string.IsNullOrEmpty(userId))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"user_{userId}");
            _logger.LogInformation("User {UserId} disconnected from chat hub", userId);
        }

        await base.OnDisconnectedAsync(exception);
    }

    // Join a conversation group
    public async Task JoinConversation(string conversationId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"conversation_{conversationId}");
        _logger.LogInformation("User joined conversation {ConversationId}", conversationId);
    }

    // Leave a conversation group
    public async Task LeaveConversation(string conversationId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"conversation_{conversationId}");
        _logger.LogInformation("User left conversation {ConversationId}", conversationId);
    }

    // Send a message to a conversation
    public async Task SendMessage(string conversationId, string message)
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userName = Context.User?.Identity?.Name ?? "Anonymous";

        if (string.IsNullOrEmpty(userId))
        {
            throw new HubException("User not authenticated");
        }

        // Here you would save the message to database
        // For now, just broadcast it

        var messageData = new
        {
            Id = Guid.NewGuid().ToString(),
            ConversationId = conversationId,
            SenderId = userId,
            SenderName = userName,
            Message = message,
            Timestamp = DateTime.UtcNow
        };

        // Send to all users in the conversation
        await Clients.Group($"conversation_{conversationId}").SendAsync("ReceiveMessage", messageData);

        _logger.LogInformation("Message sent in conversation {ConversationId} by {UserId}", conversationId, userId);
    }

    // Typing indicator
    public async Task SendTypingIndicator(string conversationId, bool isTyping)
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userName = Context.User?.Identity?.Name ?? "Anonymous";

        if (string.IsNullOrEmpty(userId))
        {
            return;
        }

        await Clients.OthersInGroup($"conversation_{conversationId}").SendAsync("UserTyping", new
        {
            UserId = userId,
            UserName = userName,
            IsTyping = isTyping
        });
    }
}

// Static class for sending chat messages from other services
public static class ChatHubExtensions
{
    public static async Task SendMessageToConversation(this IHubContext<ChatHub> hub, string conversationId, object message)
    {
        await hub.Clients.Group($"conversation_{conversationId}").SendAsync("ReceiveMessage", message);
    }

    public static async Task SendMessageToUser(this IHubContext<ChatHub> hub, string userId, object message)
    {
        await hub.Clients.Group($"user_{userId}").SendAsync("ReceiveMessage", message);
    }
}