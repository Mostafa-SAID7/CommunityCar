using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace CommunityCar.Api.Hubs;

[Authorize]
public class NotificationHub : Hub
{
    private readonly ILogger<NotificationHub> _logger;

    public NotificationHub(ILogger<NotificationHub> logger)
    {
        _logger = logger;
    }

    public override async Task OnConnectedAsync()
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!string.IsNullOrEmpty(userId))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"user_{userId}");
            _logger.LogInformation("User {UserId} connected to notification hub", userId);
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!string.IsNullOrEmpty(userId))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"user_{userId}");
            _logger.LogInformation("User {UserId} disconnected from notification hub", userId);
        }

        await base.OnDisconnectedAsync(exception);
    }

    // Methods that clients can call
    public async Task SubscribeToLeaderboardUpdates()
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!string.IsNullOrEmpty(userId))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"leaderboard_updates_{userId}");
        }
    }

    public async Task UnsubscribeFromLeaderboardUpdates()
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!string.IsNullOrEmpty(userId))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"leaderboard_updates_{userId}");
        }
    }

    public async Task JoinCommunityGroup(string communityId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"community_{communityId}");
    }

    public async Task LeaveCommunityGroup(string communityId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"community_{communityId}");
    }
}

// Static class for sending notifications from other services
public static class NotificationHubExtensions
{
    public static async Task SendNotificationToUser(this IHubContext<NotificationHub> hub, string userId, string method, object payload)
    {
        await hub.Clients.Group($"user_{userId}").SendAsync(method, payload);
    }

    public static async Task SendLeaderboardUpdate(this IHubContext<NotificationHub> hub, string userId, object update)
    {
        await hub.Clients.Group($"leaderboard_updates_{userId}").SendAsync("LeaderboardUpdate", update);
    }

    public static async Task SendCommunityNotification(this IHubContext<NotificationHub> hub, string communityId, string method, object payload)
    {
        await hub.Clients.Group($"community_{communityId}").SendAsync(method, payload);
    }
}