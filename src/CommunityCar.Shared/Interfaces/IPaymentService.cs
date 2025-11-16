namespace CommunityCar.Application.Interfaces
{
    public interface IPaymentService
    {
        Task<bool> ProcessPaymentAsync(decimal amount, string currency);
        Task HandleWebhookAsync(string payload);
    }
}