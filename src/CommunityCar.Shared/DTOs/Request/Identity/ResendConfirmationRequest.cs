using System.ComponentModel.DataAnnotations;

namespace CommunityCar.Shared.DTOs.Request.Identity
{
    public class ResendConfirmationRequest
    {
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = string.Empty;
    }
}
