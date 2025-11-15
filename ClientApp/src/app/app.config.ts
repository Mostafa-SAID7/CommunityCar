import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';

// Interceptors
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { ErrorInterceptor } from '../core/interceptors/error.interceptor';
import { LoadingInterceptor } from '../core/interceptors/loading.interceptor';
import { LanguageInterceptor } from '../core/interceptors/language.interceptor';

// Guards
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';
import { GuestGuard } from '../core/guards/guest.guard';

// Services
import { AuthService } from '../core/services/auth.service';
import { StorageService } from '../core/services/storage.service';
import { NotificationService } from '../core/services/notification.service';
import { ThemeService } from '../core/services/theme.service';
import { LanguageService } from '../core/services/language.service';
import { SignalrService } from '../core/services/signalr.service';
import { LoaderService } from '../core/services/loader.service';
import { ApiService } from '../core/services/api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),

    // Interceptors
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },

    // Guards
    AuthGuard,
    RoleGuard,
    GuestGuard,

    // Services (those without providedIn: 'root')
    AuthService,
    StorageService,
    NotificationService,
    ThemeService,
    LanguageService,
    SignalrService,
    LoaderService,
    ApiService
  ]
};
