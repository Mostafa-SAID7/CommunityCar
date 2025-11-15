namespace CommunityCar.Application.Common
{
    public class AppSettings
    {
        public string DatabaseConnectionString { get; set; }
        public string JwtSecret { get; set; }
        public int AiSuggestionDelayMinutes { get; set; } = 3;
        public string AzureBlobConnectionString { get; set; }
        public string RedisConnectionString { get; set; }
    }
}