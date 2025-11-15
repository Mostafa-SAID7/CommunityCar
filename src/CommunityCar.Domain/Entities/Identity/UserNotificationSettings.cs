namespace CommunityCar.Domain.Entities.Identity;

public class UserNotificationSettings : BaseEntity
{
    public Guid UserId { get; set; }

    // Email Notifications
    public bool EmailOnNewFollower { get; set; } = true;
    public bool EmailOnAchievement { get; set; } = true;
    public bool EmailOnMention { get; set; } = true;
    public bool EmailOnComment { get; set; } = true;
    public bool EmailOnLike { get; set; } = true;
    public bool EmailOnLeaderboardChange { get; set; } = true;
    public bool EmailOnCompetition { get; set; } = true;
    public bool EmailWeeklyDigest { get; set; } = true;
    public bool EmailMarketing { get; set; } = false;

    // Push Notifications
    public bool PushOnNewFollower { get; set; } = true;
    public bool PushOnAchievement { get; set; } = true;
    public bool PushOnMention { get; set; } = true;
    public bool PushOnComment { get; set; } = true;
    public bool PushOnLike { get; set; } = true;
    public bool PushOnLeaderboardChange { get; set; } = true;
    public bool PushOnCompetition { get; set; } = true;

    // In-App Notifications
    public bool InAppOnNewFollower { get; set; } = true;
    public bool InAppOnAchievement { get; set; } = true;
    public bool InAppOnMention { get; set; } = true;
    public bool InAppOnComment { get; set; } = true;
    public bool InAppOnLike { get; set; } = true;
    public bool InAppOnLeaderboardChange { get; set; } = true;
    public bool InAppOnCompetition { get; set; } = true;

    // Quiet Hours
    public bool EnableQuietHours { get; set; } = false;
    public TimeSpan QuietHoursStart { get; set; } = TimeSpan.FromHours(22); // 10 PM
    public TimeSpan QuietHoursEnd { get; set; } = TimeSpan.FromHours(8);   // 8 AM

    // Navigation property
    public virtual User User { get; set; } = null!;

    public UserNotificationSettings() { }

    public UserNotificationSettings(Guid userId)
    {
        UserId = userId;
    }

    // Helper methods
    public bool ShouldSendNotification(NotificationType type, NotificationChannel channel)
    {
        return channel switch
        {
            NotificationChannel.Email => GetEmailSetting(type),
            NotificationChannel.Push => GetPushSetting(type),
            NotificationChannel.InApp => GetInAppSetting(type),
            _ => false
        };
    }

    private bool GetEmailSetting(NotificationType type) => type switch
    {
        NotificationType.NewFollower => EmailOnNewFollower,
        NotificationType.Achievement => EmailOnAchievement,
        NotificationType.Mention => EmailOnMention,
        NotificationType.Comment => EmailOnComment,
        NotificationType.Like => EmailOnLike,
        NotificationType.LeaderboardChange => EmailOnLeaderboardChange,
        NotificationType.Competition => EmailOnCompetition,
        _ => false
    };

    private bool GetPushSetting(NotificationType type) => type switch
    {
        NotificationType.NewFollower => PushOnNewFollower,
        NotificationType.Achievement => PushOnAchievement,
        NotificationType.Mention => PushOnMention,
        NotificationType.Comment => PushOnComment,
        NotificationType.Like => PushOnLike,
        NotificationType.LeaderboardChange => PushOnLeaderboardChange,
        NotificationType.Competition => PushOnCompetition,
        _ => false
    };

    private bool GetInAppSetting(NotificationType type) => type switch
    {
        NotificationType.NewFollower => InAppOnNewFollower,
        NotificationType.Achievement => InAppOnAchievement,
        NotificationType.Mention => InAppOnMention,
        NotificationType.Comment => InAppOnComment,
        NotificationType.Like => InAppOnLike,
        NotificationType.LeaderboardChange => InAppOnLeaderboardChange,
        NotificationType.Competition => InAppOnCompetition,
        _ => false
    };

    public bool IsInQuietHours()
    {
        if (!EnableQuietHours) return false;

        var now = DateTime.UtcNow.TimeOfDay;
        if (QuietHoursStart <= QuietHoursEnd)
        {
            // Same day range (e.g., 10 PM to 8 AM next day)
            return now >= QuietHoursStart || now <= QuietHoursEnd;
        }
        else
        {
            // Overnight range (e.g., 10 PM to 6 AM)
            return now >= QuietHoursStart && now <= QuietHoursEnd;
        }
    }
}

public enum NotificationType
{
    NewFollower,
    Achievement,
    Mention,
    Comment,
    Like,
    LeaderboardChange,
    Competition
}

public enum NotificationChannel
{
    Email,
    Push,
    InApp
}