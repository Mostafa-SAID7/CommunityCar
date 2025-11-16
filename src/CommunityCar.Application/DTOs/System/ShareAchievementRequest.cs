using System.ComponentModel.DataAnnotations;

namespace CommunityCar.Application.DTOs.System
{
    public class ShareAchievementRequest
    {
        [Required(ErrorMessage = "Message is required.")]
        [StringLength(500, ErrorMessage = "Message cannot exceed 500 characters.")]
        public string Message { get; set; } = string.Empty;
    }
}
