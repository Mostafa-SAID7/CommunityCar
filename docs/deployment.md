# CommunityCar Deployment Guide

## Prerequisites
- Docker and Docker Compose
- Node.js 18+
- .NET 8 SDK
- Azure CLI (for cloud deployment)

## Local Development

### Backend Setup
1. Navigate to the `src` directory
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Update database:
   ```bash
   dotnet ef database update
   ```
4. Run the API:
   ```bash
   dotnet run --project CommunityCar.Api
   ```

### Frontend Setup
1. Navigate to `ClientApp` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```

### ML Service Setup
1. Navigate to `src/CommunityCar.ML.Car`
2. Build the project:
   ```bash
   dotnet build
   ```
3. Run the service:
   ```bash
   dotnet run
   ```

## Docker Deployment

### Build Images
```bash
docker build -t communitycar-api ./src/CommunityCar.Api
docker build -t communitycar-ml ./src/CommunityCar.ML.Car
docker build -t communitycar-client ./ClientApp
```

### Run with Docker Compose
```bash
docker-compose up -d
```

## Azure Deployment

### App Service
1. Create App Service plan
2. Deploy API to App Service
3. Configure environment variables

### Database
1. Create Azure SQL Database
2. Update connection strings
3. Run migrations

### Storage
1. Create Azure Storage Account
2. Configure blob containers
3. Update storage settings

## Environment Variables
- `ASPNETCORE_ENVIRONMENT`: Environment (Development/Production)
- `ConnectionStrings__DefaultConnection`: Database connection string
- `Jwt__Key`: JWT secret key
- `AzureStorage__ConnectionString`: Azure Storage connection string

## Monitoring
- Application Insights for logging
- Azure Monitor for metrics
- Health checks endpoint: `/health`

## Security
- Enable HTTPS
- Configure CORS
- Set up Azure Front Door for CDN
- Implement rate limiting