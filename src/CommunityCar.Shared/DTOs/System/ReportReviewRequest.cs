using System.ComponentModel.DataAnnotations;

namespace CommunityCar.Application.DTOs.System
{
    public class ReportReviewRequest
    {
        [Required(ErrorMessage = "Reason is required.")]
        [StringLength(500, ErrorMessage = "Reason cannot exceed 500 characters.")]
        public string Reason { get; set; } = string.Empty;
    }
}
