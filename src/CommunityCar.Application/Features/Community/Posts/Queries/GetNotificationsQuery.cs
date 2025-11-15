using MediatR;

namespace CommunityCar.Application.Queries
{
    public class GetNotificationsQuery : IRequest<IEnumerable<string>>
    {
        public int UserId { get; set; }
    }
}