using System.ComponentModel.DataAnnotations;

namespace CommunityCar.Shared.DTOs.Identity
{
    public class SocialLoginRequest
    {
        [Required(ErrorMessage = "Token is required.")]
        public string Token { get; set; } = string.Empty;

        [Required(ErrorMessage = "Access token is required.")]
        public string AccessToken { get; set; } = string.Empty;

        [Required(ErrorMessage = "Identity token is required.")]
        public string IdentityToken { get; set; } = string.Empty;
    }
}