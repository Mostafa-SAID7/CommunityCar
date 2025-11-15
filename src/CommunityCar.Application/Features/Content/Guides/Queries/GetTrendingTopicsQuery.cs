using MediatR;

namespace CommunityCar.Application.Queries
{
    public class GetTrendingTopicsQuery : IRequest<IEnumerable<string>>
    {
        // No parameters, returns cached trending topics
    }
}