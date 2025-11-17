using System.ComponentModel.DataAnnotations;

namespace CommunityCar.Application.DTOs.Identity
{
    public class PrivacySettingsUpdateRequest
    {
        public bool? IsPrivate { get; set; }
        public bool? ShowOnlineStatus { get; set; }
        public bool? ShowLastSeen { get; set; }

        [RegularExpression("^(everyone|followers|none)$", ErrorMessage = "Allow messages from must be 'everyone', 'followers', or 'none'.")]
        public string? AllowMessagesFrom { get; set; }

        public bool? AllowTagging { get; set; }
        public bool? AnalyticsSharing { get; set; }
        public bool? MarketingSharing { get; set; }
        public bool? ThirdPartySharing { get; set; }
    }
}
