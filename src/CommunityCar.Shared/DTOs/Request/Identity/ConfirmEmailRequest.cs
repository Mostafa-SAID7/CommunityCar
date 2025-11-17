using System.ComponentModel.DataAnnotations;

namespace CommunityCar.Shared.DTOs.Request.Identity
{
    public class ConfirmEmailRequest
    {
        [Required(ErrorMessage = "User ID is required.")]
        public string UserId { get; set; } = string.Empty;

        [Required(ErrorMessage = "Token is required.")]
        public string Token { get; set; } = string.Empty;
    }
}
