using MediatR;
using CommunityCar.Application.DTOs;
using CommunityCar.Shared.DTOs.Request.Community.Post;

namespace CommunityCar.Application.Queries
{
    public class SearchPostsQuery : IRequest<IEnumerable<PostDto>>
    {
        public string SearchTerm { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}