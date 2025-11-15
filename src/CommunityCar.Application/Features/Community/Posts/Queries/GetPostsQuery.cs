using MediatR;
using CommunityCar.Application.DTOs;

namespace CommunityCar.Application.Queries
{
    public class GetPostsQuery : IRequest<IEnumerable<PostDto>>
    {
        public string Filter { get; set; } // Recent, Popular, Following
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}