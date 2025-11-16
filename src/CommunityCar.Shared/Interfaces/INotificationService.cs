namespace CommunityCar.Application.Interfaces
{
    public interface INotificationService
    {
        Task SendNotificationAsync(string userId, string message);
        Task SendRealtimeNotificationAsync(string userId, string message);
    }
}