using CommunityCar.Domain.Entities;

namespace CommunityCar.Domain.DomainEvents;

public class AnswerAddedEvent
{
    public Answer Answer { get; }

    public AnswerAddedEvent(Answer answer)
    {
        Answer = answer;
    }
}