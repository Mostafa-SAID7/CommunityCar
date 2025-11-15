# CommunityCar — Smart Shared Mobility

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.txt)
[![.NET](https://img.shields.io/badge/.NET-8.0-purple.svg)](https://dotnet.microsoft.com/)
[![Angular](https://img.shields.io/badge/Angular-19-red.svg)](https://angular.io/)

CommunityCar connects neighbors through smarter, shared car access. Drive, book, and manage rides effortlessly with a secure and modern platform.

## 🌟 Features

- **User Authentication & Authorization**: Secure login, registration, password reset
- **Community Forums**: Post questions, share experiences, get AI-powered suggestions
- **Car Sharing Marketplace**: Book vehicles, manage reservations
- **Real-time Notifications**: Stay updated with SignalR integration
- **AI-Powered Assistance**: ML-driven car problem diagnosis and content suggestions
- **Responsive Design**: Modern UI built with Angular and Tailwind CSS
- **Multi-language Support**: Internationalization ready
- **Role-based Access**: Admin, mechanic, and user roles

## 🏗️ Architecture

This project follows Clean Architecture principles with the following layers:

### Backend (.NET 8)
- **CommunityCar.Api**: ASP.NET Core Web API
- **CommunityCar.Application**: Application logic, commands, queries, DTOs
- **CommunityCar.Domain**: Domain entities, business rules, interfaces
- **CommunityCar.Infrastructure**: External concerns (EF Core, Identity, SignalR)
- **CommunityCar.Shared**: Common utilities, constants, DTOs
- **CommunityCar.ML.Car**: Machine learning services for AI suggestions

### Frontend (Angular 19)
- **Standalone Components**: Modern Angular architecture
- **Feature Modules**: Organized by domain (auth, community, services, etc.)
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type-safe development

## 🛠️ Tech Stack

### Backend
- **Framework**: ASP.NET Core 8.0
- **Language**: C# 12
- **Database**: SQL Server / Entity Framework Core
- **Authentication**: JWT Bearer Tokens
- **Real-time**: SignalR
- **ML**: ML.NET
- **Testing**: xUnit, FluentAssertions

### Frontend
- **Framework**: Angular 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: RxJS
- **HTTP Client**: Angular HttpClient
- **Testing**: Jasmine, Karma

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+
- npm or yarn
- SQL Server (or use SQLite for development)
- Docker & Docker Compose (optional, for containerized development)

### Backend Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/CommunityCar.git
    cd CommunityCar
    ```

2. **Restore dependencies**
    ```bash
    dotnet restore
    ```

3. **Configuration**
    ```bash
    # Copy and configure appsettings
    cp src/CommunityCar.Api/appsettings.Development.json src/CommunityCar.Api/appsettings.Development.json.example

    # Edit the configuration file with your settings
    # Update database connection, JWT keys, email settings, etc.
    ```

4. **Database setup**
    ```bash
    # Update connection string in src/CommunityCar.Api/appsettings.Development.json
    dotnet ef database update --project src/CommunityCar.Api
    ```

5. **Run the API**
    ```bash
    dotnet run --project src/CommunityCar.Api
    ```

### Docker Setup (Recommended)

1. **Start all services**
    ```bash
    docker-compose up -d
    ```

2. **Check service status**
    ```bash
    docker-compose ps
    ```

3. **View logs**
    ```bash
    docker-compose logs -f api
    docker-compose logs -f frontend
    ```

4. **Stop services**
    ```bash
    docker-compose down
    ```

### Manual Setup

#### Backend Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/CommunityCar.git
    cd CommunityCar
    ```

2. **Restore dependencies**
    ```bash
    dotnet restore
    ```

3. **Configuration**
    ```bash
    # Copy and configure appsettings
    cp src/CommunityCar.Api/appsettings.Development.json src/CommunityCar.Api/appsettings.Development.json.example

    # Edit the configuration file with your settings
    # Update database connection, JWT keys, email settings, etc.
    ```

4. **Database setup**
    ```bash
    # Update connection string in src/CommunityCar.Api/appsettings.Development.json
    dotnet ef database update --project src/CommunityCar.Api
    ```

5. **Run the API**
    ```bash
    dotnet run --project src/CommunityCar.Api
    ```

#### Frontend Setup

1. **Navigate to ClientApp**
    ```bash
    cd ClientApp
    ```

2. **Environment configuration**
    ```bash
    # Copy environment file
    cp .env.example .env

    # Edit .env with your configuration
    # Update API URLs, social media keys, etc.
    ```

3. **Install dependencies**
    ```bash
    npm install
    ```

4. **Start development server**
    ```bash
    npm start
    ```

5. **Build for production**
    ```bash
    npm run build
    ```

## 📁 Project Structure

```
CommunityCar/
├── src/
│   ├── CommunityCar.Api/           # Web API
│   ├── CommunityCar.Application/   # Application layer
│   ├── CommunityCar.Domain/        # Domain layer
│   ├── CommunityCar.Infrastructure/# Infrastructure layer
│   ├── CommunityCar.Shared/        # Shared utilities
│   └── CommunityCar.ML.Car/        # ML services
├── ClientApp/                      # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/               # Core services, guards, interceptors
│   │   │   ├── features/           # Feature modules
│   │   │   └── shared/             # Shared components
│   │   └── assets/
│   └── public/                     # Static assets
├── CommunityCar.sln                # Solution file
└── README.md
```

## 🔧 Configuration

### Configuration Files

The application uses multiple configuration files for different environments:

- `appsettings.json` - Base configuration
- `appsettings.Development.json` - Development environment settings
- `appsettings.Production.json` - Production environment settings

#### Key Configuration Sections

**Database Connection:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=CommunityCarDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

**JWT Authentication:**
```json
{
  "Jwt": {
    "Key": "YourSuperSecretKeyHereThatIsAtLeast32CharactersLong!!!",
    "Issuer": "CommunityCar.Api",
    "Audience": "CommunityCar.Api"
  }
}
```

**Email Configuration:**
```json
{
  "Email": {
    "SmtpServer": "smtp.gmail.com",
    "Port": 587,
    "Username": "your-email@gmail.com",
    "Password": "your-app-password",
    "FromEmail": "noreply@communitycar.com",
    "FromName": "CommunityCar"
  }
}
```

**Security Settings:**
```json
{
  "Security": {
    "OtpExpiryMinutes": 5,
    "LockoutThreshold": 5,
    "LockoutDurationMinutes": 5,
    "RateLimitRequestsPerMinute": 100,
    "MaxProfilePictureSizeMB": 5,
    "MaxCoverPhotoSizeMB": 10,
    "AllowedImageExtensions": [".jpg", ".jpeg", ".png", ".gif"]
  }
}
```

**Social Authentication:**
```json
{
  "SocialAuth": {
    "Google": {
      "ClientId": "your-google-client-id",
      "ClientSecret": "your-google-client-secret"
    },
    "Facebook": {
      "AppId": "your-facebook-app-id",
      "AppSecret": "your-facebook-app-secret"
    }
  }
}
```

**Profile Settings:**
```json
{
  "Profile": {
    "DefaultProfilePicture": "/images/default-profile.png",
    "DefaultCoverPhoto": "/images/default-cover.jpg",
    "MaxBioLength": 500,
    "MaxDisplayNameLength": 100,
    "MinAge": 13,
    "RequireEmailVerification": false,
    "AllowPublicProfiles": true,
    "MaxFileSizeMB": 10,
    "AllowedFileTypes": [".jpg", ".jpeg", ".png", ".gif"],
    "UploadPath": "uploads/profiles",
    "CoverUploadPath": "uploads/covers"
  }
}
```

### Frontend Environment

Create `ClientApp/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

## 🧪 Testing

### Backend Tests
```bash
dotnet test
```

### Frontend Tests
```bash
cd ClientApp
npm test
```

## 🚢 Deployment

### Environment-Specific Configuration

1. **Production Settings**: Update `appsettings.Production.json` with production values
2. **Environment Variables**: Set environment variables for sensitive data
3. **SSL/TLS**: Configure HTTPS certificates
4. **Database**: Use production database connection strings

### Backend Deployment
```bash
# Build for production
dotnet publish src/CommunityCar.Api -c Release -o ./publish

# Run migrations on production database
dotnet ef database update --project src/CommunityCar.Api --environment Production
```

### Frontend Deployment
```bash
cd ClientApp

# Build for production
npm run build

# The build artifacts will be stored in the dist/ directory
```

### Docker Deployment (Optional)
```bash
# Build Docker image
docker build -t communitycar .

# Run with environment variables
docker run -p 8080:80 \
  -e ASPNETCORE_ENVIRONMENT=Production \
  -e ConnectionStrings__DefaultConnection="your-prod-connection-string" \
  communitycar
```

### Security Checklist
- [ ] Update JWT secret keys
- [ ] Configure production database
- [ ] Set up email SMTP settings
- [ ] Configure social auth providers
- [ ] Enable HTTPS/SSL
- [ ] Set up rate limiting
- [ ] Configure logging and monitoring
- [ ] Set up backups and disaster recovery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## 📞 Contact

- **Email**: communitycarfree@gmail.com
- **Facebook**: https://www.facebook.com/profile.php?id=61583521502176
- **Instagram**: https://www.instagram.com/communitycarfree
- **Twitter**: https://x.com/CommunityCarFe

## 🙏 Acknowledgments

- Built with ❤️ for the community
- Special thanks to the open-source community