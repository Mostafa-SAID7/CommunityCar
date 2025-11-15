# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["CommunityCar.sln", "."]
COPY ["src/CommunityCar.Api/CommunityCar.Api.csproj", "src/CommunityCar.Api/"]
COPY ["src/CommunityCar.Application/CommunityCar.Application.csproj", "src/CommunityCar.Application/"]
COPY ["src/CommunityCar.Domain/CommunityCar.Domain.csproj", "src/CommunityCar.Domain/"]
COPY ["src/CommunityCar.Infrastructure/CommunityCar.Infrastructure.csproj", "src/CommunityCar.Infrastructure/"]
COPY ["src/CommunityCar.Shared/CommunityCar.Shared.csproj", "src/CommunityCar.Shared/"]
COPY ["src/CommunityCar.ML.Car/CommunityCar.ML.Car.csproj", "src/CommunityCar.ML.Car/"]

RUN dotnet restore "src/CommunityCar.Api/CommunityCar.Api.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/src/CommunityCar.Api"
RUN dotnet build "CommunityCar.Api.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "CommunityCar.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy published app
COPY --from=publish /app/publish .

# Set permissions
RUN chown -R appuser:appuser /app
USER appuser

# Expose ports
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Set the entry point
ENTRYPOINT ["dotnet", "CommunityCar.Api.dll"]