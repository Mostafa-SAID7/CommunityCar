using System.ComponentModel.DataAnnotations;

namespace CommunityCar.Shared.DTOs.Request.Identity
{
    public class RefreshTokenRequest
    {
        [Required(ErrorMessage = "Refresh token is required.")]
        public string RefreshToken { get; set; } = string.Empty;
    }
}
