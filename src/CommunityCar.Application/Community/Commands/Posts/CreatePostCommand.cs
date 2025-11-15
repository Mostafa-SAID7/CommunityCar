using MediatR;
using CommunityCar.Application.DTOs;

namespace CommunityCar.Application.Commands
{
    public class CreatePostCommand : IRequest<PostDto>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public List<string> Tags { get; set; }
    }
}