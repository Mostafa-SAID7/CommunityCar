using Serilog;

namespace CommunityCar.Infrastructure.Logging;

public static class SerilogConfig
{
    public static void ConfigureSerilog()
    {
        Log.Logger = new LoggerConfiguration()
            .WriteTo.Console()
            .CreateLogger();
    }
}