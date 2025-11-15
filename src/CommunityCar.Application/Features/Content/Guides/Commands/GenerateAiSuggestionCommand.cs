using MediatR;
using CommunityCar.Application.DTOs;

namespace CommunityCar.Application.Commands
{
    public class GenerateAiSuggestionCommand : IRequest<AiSuggestionDto>
    {
        public int PostId { get; set; }
    }
}