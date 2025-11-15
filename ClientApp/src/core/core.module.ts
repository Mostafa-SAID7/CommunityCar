import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LanguageInterceptor } from './interceptors/language.interceptor';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { GuestGuard } from './guards/guest.guard';

// Services
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { NotificationService } from './services/notification.service';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';
import { SignalrService } from './services/signalr.service';
import { LoaderService } from './services/loader.service';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // Interceptors
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true },

    // Guards
    AuthGuard,
    RoleGuard,
    GuestGuard,

    // Services
    AuthService,
    StorageService,
    NotificationService,
    ThemeService,
    LanguageService,
    SignalrService,
    LoaderService,
    ApiService
  ]
})
export class CoreModule { }