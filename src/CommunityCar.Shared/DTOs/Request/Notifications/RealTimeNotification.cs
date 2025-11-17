namespace CommunityCar.Shared.DTOs.Request.Notifications
{
    public class RealTimeNotification
    {
        public string UserId { get; set; }
        public string Message { get; set; }
        public string Type { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
