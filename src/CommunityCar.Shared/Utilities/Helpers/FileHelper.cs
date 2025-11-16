namespace CommunityCar.Shared.Utilities
{
    public static class FileHelper
    {
        public static string GetFileExtension(string fileName)
        {
            return Path.GetExtension(fileName);
        }

        public static bool IsValidImageExtension(string extension)
        {
            var validExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            return validExtensions.Contains(extension.ToLower());
        }

        public static string GenerateUniqueFileName(string originalName)
        {
            var extension = GetFileExtension(originalName);
            return Guid.NewGuid().ToString() + extension;
        }
    }
}