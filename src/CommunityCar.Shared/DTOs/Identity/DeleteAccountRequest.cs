using System.ComponentModel.DataAnnotations;

namespace CommunityCar.Shared.DTOs.Identity
{
    public class DeleteAccountRequest
    {
        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; } = string.Empty;
    }
}