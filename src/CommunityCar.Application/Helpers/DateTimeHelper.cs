namespace CommunityCar.Application.Helpers;

public static class DateTimeHelper
{
    public static DateTime GetStartOfWeek(this DateTime date, DayOfWeek startOfWeek = DayOfWeek.Monday)
    {
        int diff = (7 + (date.DayOfWeek - startOfWeek)) % 7;
        return date.AddDays(-1 * diff).Date;
    }

    public static DateTime GetEndOfWeek(this DateTime date, DayOfWeek startOfWeek = DayOfWeek.Monday)
    {
        return date.GetStartOfWeek(startOfWeek).AddDays(6).Date.AddDays(1).AddTicks(-1);
    }

    public static DateTime GetStartOfMonth(this DateTime date)
    {
        return new DateTime(date.Year, date.Month, 1);
    }

    public static DateTime GetEndOfMonth(this DateTime date)
    {
        return date.GetStartOfMonth().AddMonths(1).AddTicks(-1);
    }

    public static int GetWeekNumber(this DateTime date)
    {
        var culture = System.Globalization.CultureInfo.CurrentCulture;
        var calendar = culture.Calendar;
        var dateTimeFormat = culture.DateTimeFormat;

        return calendar.GetWeekOfYear(date, dateTimeFormat.CalendarWeekRule, dateTimeFormat.FirstDayOfWeek);
    }

    public static string ToRelativeTime(this DateTime dateTime)
    {
        var timeSpan = DateTime.UtcNow - dateTime;

        if (timeSpan.TotalMinutes < 1)
            return "just now";
        if (timeSpan.TotalMinutes < 60)
            return $"{(int)timeSpan.TotalMinutes} minutes ago";
        if (timeSpan.TotalHours < 24)
            return $"{(int)timeSpan.TotalHours} hours ago";
        if (timeSpan.TotalDays < 7)
            return $"{(int)timeSpan.TotalDays} days ago";
        if (timeSpan.TotalDays < 30)
            return $"{(int)(timeSpan.TotalDays / 7)} weeks ago";
        if (timeSpan.TotalDays < 365)
            return $"{(int)(timeSpan.TotalDays / 30)} months ago";

        return $"{(int)(timeSpan.TotalDays / 365)} years ago";
    }

    public static bool IsInQuietHours(this DateTime currentTime, TimeSpan quietStart, TimeSpan quietEnd)
    {
        var current = currentTime.TimeOfDay;

        if (quietStart <= quietEnd)
        {
            // Same day range (e.g., 10 PM to 8 AM next day)
            return current >= quietStart || current <= quietEnd;
        }
        else
        {
            // Overnight range (e.g., 10 PM to 6 AM)
            return current >= quietStart && current <= quietEnd;
        }
    }
}