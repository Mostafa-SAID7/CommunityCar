using MediatR;

namespace CommunityCar.Application.Commands
{
    public class ProcessPaymentCommand : IRequest<bool>
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; }
    }
}