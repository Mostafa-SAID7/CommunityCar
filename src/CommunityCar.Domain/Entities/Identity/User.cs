using CommunityCar.Domain.Entities.Gamification;
using CommunityCar.Domain.Entities.Community;
using CommunityCar.Domain.Enums;
using CommunityCar.Domain.ValueObjects;
using Microsoft.AspNetCore.Identity;

namespace CommunityCar.Domain.Entities.Identity;

public class User : IdentityUser<Guid>
{
    // Basic Profile Information
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string ProfilePictureUrl { get; set; } = string.Empty;
    public string CoverPictureUrl { get; set; } = string.Empty;

    // Account Status
    public bool IsVerified { get; set; }
    public bool IsOnline { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // Location and Preferences
    public Location? Location { get; set; }
    public string TimeZone { get; set; } = "UTC";
    public string Language { get; set; } = "en";
    public string Theme { get; set; } = "light";

    // Subscription and Roles
    public RoleType Role { get; set; } = RoleType.User;
    public SubscriptionPlan SubscriptionPlan { get; set; } = SubscriptionPlan.Free;
    public DateTime? SubscriptionExpiresAt { get; set; }

    // Security
    public bool TwoFactorEnabled { get; set; }
    public string? TwoFactorSecret { get; set; }
    public DateTime? LockoutEnd { get; set; }
    public int AccessFailedCount { get; set; }

    // Social Features
    public bool IsPrivate { get; set; }
    public int FollowersCount { get; set; }
    public int FollowingCount { get; set; }

    // Gamification
    public int TotalPoints { get; set; }
    public int CurrentLevel { get; set; }
    public int CurrentStreak { get; set; }
    public int LongestStreak { get; set; }
    public DateTime? LastActivityAt { get; set; }

    // Navigation Properties
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
    public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public virtual ICollection<Reaction> Reactions { get; set; } = new List<Reaction>();
    public virtual ICollection<UserAchievement> Achievements { get; set; } = new List<UserAchievement>();
    public virtual UserPoint? UserPoint { get; set; }

    // Social Relationships
    public virtual ICollection<UserFollow> Followers { get; set; } = new List<UserFollow>();
    public virtual ICollection<UserFollow> Following { get; set; } = new List<UserFollow>();

    // Notification Preferences
    public virtual UserNotificationSettings? NotificationSettings { get; set; }

    // Computed Properties
    public string FullName => $"{FirstName} {LastName}".Trim();
    public bool IsPremium => SubscriptionPlan != SubscriptionPlan.Free && (SubscriptionExpiresAt == null || SubscriptionExpiresAt > DateTime.UtcNow);
    public bool IsActive => !LockoutEnd.HasValue || LockoutEnd <= DateTime.UtcNow;

    // Methods
    public void UpdateLastActivity()
    {
        LastActivityAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public void IncrementFollowers() => FollowersCount++;
    public void DecrementFollowers() => FollowersCount = Math.Max(0, FollowersCount - 1);
    public void IncrementFollowing() => FollowingCount++;
    public void DecrementFollowing() => FollowingCount = Math.Max(0, FollowingCount - 1);

    public void AddPoints(int points)
    {
        TotalPoints += points;
        UpdateLastActivity();
    }

    public void UpdateStreak(int newStreak)
    {
        CurrentStreak = newStreak;
        if (newStreak > LongestStreak)
            LongestStreak = newStreak;
    }
}