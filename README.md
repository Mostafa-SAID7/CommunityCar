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

3. **Database setup**
   ```bash
   # Update connection string in src/CommunityCar.Api/appsettings.json
   dotnet ef database update --project src/CommunityCar.Api
   ```

4. **Run the API**
   ```bash
   dotnet run --project src/CommunityCar.Api
   ```

### Frontend Setup

1. **Navigate to ClientApp**
   ```bash
   cd ClientApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
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

### Environment Variables

Create `appsettings.Development.json` in `src/CommunityCar.Api/`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CommunityCar;Trusted_Connection=True;"
  },
  "Jwt": {
    "Key": "your-secret-key-here",
    "Issuer": "CommunityCar",
    "Audience": "CommunityCar"
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

### Backend
```bash
dotnet publish src/CommunityCar.Api -c Release -o ./publish
```

### Frontend
```bash
cd ClientApp
npm run build --prod
```

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