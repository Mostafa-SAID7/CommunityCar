using CommunityCar.Domain.Entities;

namespace CommunityCar.Domain.DomainEvents;

public class PostCreatedEvent
{
    public Post Post { get; }

    public PostCreatedEvent(Post post)
    {
        Post = post;
    }
}