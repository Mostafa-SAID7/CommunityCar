using MediatR;

namespace CommunityCar.Application.Commands
{
    public class AddAnswerCommand : IRequest<int>
    {
        public int PostId { get; set; }
        public string Content { get; set; }
    }
}