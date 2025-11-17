using System.ComponentModel.DataAnnotations;
using CommunityCar.Application.DTOs.Enums;

namespace CommunityCar.Shared.DTOs.Request.System
{
    public class ModerateReviewRequest
    {
        [Required(ErrorMessage = "Action is required.")]
        public ReviewModerationAction Action { get; set; }

        [Required(ErrorMessage = "Reason is required.")]
        [StringLength(500, ErrorMessage = "Reason cannot exceed 500 characters.")]
        public string Reason { get; set; } = string.Empty;
    }
}
