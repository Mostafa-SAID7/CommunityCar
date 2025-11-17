using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommunityCar.Shared.DTOs.Request.Notifications
{
    internal class NotificationSettingsDto
    {
        public Guid UserId { get; set; }
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
        public string? QuietHoursStart { get; set; }
        public string? QuietHoursEnd { get; set; }
    }
}
