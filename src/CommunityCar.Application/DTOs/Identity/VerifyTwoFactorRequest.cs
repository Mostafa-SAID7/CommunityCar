using System.ComponentModel.DataAnnotations;

namespace CommunityCar.Application.DTOs.Identity
{
    public class VerifyTwoFactorRequest
    {
        [Required(ErrorMessage = "Code is required.")]
        [StringLength(6, MinimumLength = 6, ErrorMessage = "Code must be exactly 6 digits.")]
        [RegularExpression(@"^\d{6}$", ErrorMessage = "Code must be numeric.")]
        public string Code { get; set; } = string.Empty;
    }
}
