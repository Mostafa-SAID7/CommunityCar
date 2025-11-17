using MediatR;
using CommunityCar.Application.DTOs;
using CommunityCar.Shared.DTOs.Request.Community.Post;

namespace CommunityCar.Application.Commands
{
    public class GenerateAiSuggestionCommand : IRequest<AiSuggestionDto>
    {
        public int PostId { get; set; }
    }
}