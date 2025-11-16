using System.ComponentModel.DataAnnotations;
using CommunityCar.Domain.Enums; // Assuming ReviewModerationAction is here

namespace CommunityCar.Shared.DTOs.System
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