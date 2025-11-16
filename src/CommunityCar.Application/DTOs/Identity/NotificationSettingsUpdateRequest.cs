using System.ComponentModel.DataAnnotations;

namespace CommunityCar.Application.DTOs.Identity
{
    public class NotificationSettingsUpdateRequest
    {
        public bool? EmailOnNewFollower { get; set; }
        public bool? EmailOnAchievement { get; set; }
        public bool? EmailOnMention { get; set; }
        public bool? EmailOnComment { get; set; }
        public bool? EmailOnLike { get; set; }
        public bool? EmailOnLeaderboardChange { get; set; }
        public bool? EmailOnCompetition { get; set; }
        public bool? EmailWeeklyDigest { get; set; }
        public bool? EmailMarketing { get; set; }
        public bool? PushOnNewFollower { get; set; }
        public bool? PushOnAchievement { get; set; }
        public bool? PushOnMention { get; set; }
        public bool? PushOnComment { get; set; }
        public bool? PushOnLike { get; set; }
        public bool? PushOnLeaderboardChange { get; set; }
        public bool? PushOnCompetition { get; set; }
        public bool? EnableQuietHours { get; set; }

        [RegularExpression(@"^(?:[01]\d|2[0-3]):[0-5]\d$", ErrorMessage = "Quiet hours start must be in HH:MM format.")]
        public string? QuietHoursStart { get; set; }

        [RegularExpression(@"^(?:[01]\d|2[0-3]):[0-5]\d$", ErrorMessage = "Quiet hours end must be in HH:MM format.")]
        public string? QuietHoursEnd { get; set; }
    }
}
