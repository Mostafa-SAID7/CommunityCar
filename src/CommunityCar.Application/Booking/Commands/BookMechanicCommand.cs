using MediatR;

namespace CommunityCar.Application.Commands
{
    public class BookMechanicCommand : IRequest<int>
    {
        public int UserId { get; set; }
        public int MechanicId { get; set; }
        public DateTime BookingDate { get; set; }
    }
}