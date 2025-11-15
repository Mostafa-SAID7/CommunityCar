namespace CommunityCar.Shared.Utilities
{
    public static class EnumExtensions
    {
        public static string GetDisplayName(this Enum enumValue)
        {
            var displayName = enumValue.ToString();
            // Could use DisplayAttribute here
            return displayName;
        }

        public static T ToEnum<T>(this string value) where T : struct
        {
            return Enum.Parse<T>(value, true);
        }
    }
}