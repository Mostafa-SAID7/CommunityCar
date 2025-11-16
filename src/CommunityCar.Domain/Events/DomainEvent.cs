namespace CommunityCar.Domain.Events;

public abstract class DomainEvent : Common.BaseEntity
{
    public DateTime OccurredOn { get; set; } = DateTime.UtcNow;
    public string EventType => GetType().Name;

    protected DomainEvent()
    {
        OccurredOn = DateTime.UtcNow;
    }
}

public interface IDomainEventHandler<TEvent> where TEvent : DomainEvent
{
    Task HandleAsync(TEvent domainEvent, CancellationToken cancellationToken = default);
}

public class UserRegisteredEvent : DomainEvent
{
    public Guid UserId { get; set; }
    public string Email { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;

    public UserRegisteredEvent(Guid userId, string email, string userName)
    {
        UserId = userId;
        Email = email;
        UserName = userName;
    }
}

public class AchievementEarnedEvent : DomainEvent
{
    public Guid UserId { get; set; }
    public Guid AchievementId { get; set; }
    public string AchievementName { get; set; } = string.Empty;
    public int PointsAwarded { get; set; }

    public AchievementEarnedEvent(Guid userId, Guid achievementId, string achievementName, int pointsAwarded)
    {
        UserId = userId;
        AchievementId = achievementId;
        AchievementName = achievementName;
        PointsAwarded = pointsAwarded;
    }
}

public class LeaderboardRankChangedEvent : DomainEvent
{
    public Guid UserId { get; set; }
    public int OldRank { get; set; }
    public int NewRank { get; set; }
    public string LeaderboardType { get; set; } = string.Empty;

    public LeaderboardRankChangedEvent(Guid userId, int oldRank, int newRank, string leaderboardType)
    {
        UserId = userId;
        OldRank = oldRank;
        NewRank = newRank;
        LeaderboardType = leaderboardType;
    }
}

public class UserFollowedEvent : DomainEvent
{
    public Guid FollowerId { get; set; }
    public Guid FollowingId { get; set; }

    public UserFollowedEvent(Guid followerId, Guid followingId)
    {
        FollowerId = followerId;
        FollowingId = followingId;
    }
}