using System.Security.Cryptography;

namespace CommunityCar.Shared.Utilities
{
    public static class SecurityHelper
    {
        public static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        public static bool VerifyPassword(string password, string hash)
        {
            var hashed = HashPassword(password);
            return hashed == hash;
        }
    }
}