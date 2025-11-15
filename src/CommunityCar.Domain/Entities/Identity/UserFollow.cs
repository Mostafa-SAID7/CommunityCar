namespace CommunityCar.Domain.Entities.Identity;

public class UserFollow : BaseEntity
{
    public Guid FollowerId { get; set; }
    public Guid FollowingId { get; set; }
    public DateTime FollowedAt { get; set; } = DateTime.UtcNow;
    public FollowStatus Status { get; set; } = FollowStatus.Accepted;

    // Navigation properties
    public virtual User Follower { get; set; } = null!;
    public virtual User Following { get; set; } = null!;

    public UserFollow() { }

    public UserFollow(Guid followerId, Guid followingId)
    {
        FollowerId = followerId;
        FollowingId = followingId;
        FollowedAt = DateTime.UtcNow;
        Status = FollowStatus.Accepted;
    }
}

public enum FollowStatus
{
    Pending,
    Accepted,
    Blocked
}