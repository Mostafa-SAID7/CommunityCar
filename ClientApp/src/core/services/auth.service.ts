import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  ConfirmResetPasswordRequest,
  UpdateProfileRequest,
  EmailVerificationRequest,
  TwoFactorSetupResponse,
  TwoFactorVerificationRequest,
  UserSession,
  UserActivity
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  private isRefreshingSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isRefreshing$ = this.isRefreshingSubject.asObservable();

  private readonly TOKEN_KEY = 'authToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly USER_KEY = 'currentUser';

  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) {
    this.initializeAuthState();
  }

  // Authentication Methods
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/login', credentials).pipe(
      tap(response => this.handleAuthenticationSuccess(response)),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/register', userData).pipe(
      tap(response => this.handleAuthenticationSuccess(response)),
      catchError(error => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    const refreshToken = this.storageService.getItem(this.REFRESH_TOKEN_KEY);
    return this.apiService.post('/auth/logout', { refreshToken }).pipe(
      tap(() => this.handleLogout()),
      catchError(() => {
        // Even if logout fails on server, clear local state
        this.handleLogout();
        return of(null);
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.storageService.getItem(this.REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    if (this.isRefreshingSubject.value) {
      return this.waitForRefresh();
    }

    this.isRefreshingSubject.next(true);

    const request: RefreshTokenRequest = { refreshToken };
    return this.apiService.post<AuthResponse>('/auth/refresh', request).pipe(
      tap(response => {
        this.handleAuthenticationSuccess(response);
        this.isRefreshingSubject.next(false);
      }),
      catchError(error => {
        this.isRefreshingSubject.next(false);
        this.handleLogout();
        return throwError(() => error);
      })
    );
  }

  // Password Management
  changePassword(request: ChangePasswordRequest): Observable<any> {
    return this.apiService.put('/auth/change-password', request);
  }

  requestPasswordReset(request: ResetPasswordRequest): Observable<any> {
    return this.apiService.post('/auth/forgot-password', request);
  }

  confirmPasswordReset(request: ConfirmResetPasswordRequest): Observable<any> {
    return this.apiService.post('/auth/reset-password', request);
  }

  // Email Verification
  verifyEmail(request: EmailVerificationRequest): Observable<any> {
    return this.apiService.post('/auth/verify-email', request);
  }

  resendVerificationEmail(): Observable<any> {
    return this.apiService.post('/auth/resend-verification', {});
  }

  // Two-Factor Authentication
  setupTwoFactor(): Observable<TwoFactorSetupResponse> {
    return this.apiService.post<TwoFactorSetupResponse>('/auth/2fa/setup', {});
  }

  verifyTwoFactor(request: TwoFactorVerificationRequest): Observable<any> {
    return this.apiService.post('/auth/2fa/verify', request);
  }

  disableTwoFactor(): Observable<any> {
    return this.apiService.delete('/auth/2fa/disable');
  }

  // Profile Management
  updateProfile(request: UpdateProfileRequest): Observable<User> {
    const formData = new FormData();

    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return this.apiService.put<User>('/auth/profile', formData).pipe(
      tap(updatedUser => {
        this.currentUserSubject.next(updatedUser);
        this.storageService.setItem(this.USER_KEY, JSON.stringify(updatedUser));
      })
    );
  }

  uploadAvatar(file: File): Observable<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.apiService.post<{ avatarUrl: string }>('/auth/avatar', formData).pipe(
      tap(response => {
        const currentUser = this.currentUserSubject.value;
        if (currentUser) {
          const updatedUser = { ...currentUser, avatar: response.avatarUrl };
          this.currentUserSubject.next(updatedUser);
          this.storageService.setItem(this.USER_KEY, JSON.stringify(updatedUser));
        }
      })
    );
  }

  // Session Management
  getUserSessions(): Observable<UserSession[]> {
    return this.apiService.get<UserSession[]>('/auth/sessions');
  }

  revokeSession(sessionId: string): Observable<any> {
    return this.apiService.delete(`/auth/sessions/${sessionId}`);
  }

  revokeAllSessions(): Observable<any> {
    return this.apiService.delete('/auth/sessions');
  }

  // Activity Monitoring
  getUserActivity(limit: number = 50): Observable<UserActivity[]> {
    return this.apiService.get<UserActivity[]>(`/auth/activity?limit=${limit}`);
  }

  // State Management
  isAuthenticated(): boolean {
    const token = this.storageService.getItem(this.TOKEN_KEY);
    const user = this.storageService.getItem(this.USER_KEY);
    return !!(token && user && this.isTokenValid(token));
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserSubject.value;
    return user ? roles.includes(user.role) : false;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.storageService.getItem(this.TOKEN_KEY);
  }

  // Private Methods
  private initializeAuthState(): void {
    const token = this.storageService.getItem(this.TOKEN_KEY);
    const userJson = this.storageService.getItem(this.USER_KEY);

    if (token && userJson && this.isTokenValid(token)) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
        this.refreshTokenSubject.next(this.storageService.getItem(this.REFRESH_TOKEN_KEY));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        this.handleLogout();
      }
    } else {
      this.handleLogout();
    }
  }

  private handleAuthenticationSuccess(response: AuthResponse): void {
    this.setToken(response.token);
    this.setRefreshToken(response.refreshToken);
    this.currentUserSubject.next(response.user);
    this.storageService.setItem(this.USER_KEY, JSON.stringify(response.user));
  }

  private handleLogout(): void {
    this.storageService.removeItem(this.TOKEN_KEY);
    this.storageService.removeItem(this.REFRESH_TOKEN_KEY);
    this.storageService.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.refreshTokenSubject.next(null);
  }

  private setToken(token: string): void {
    this.storageService.setItem(this.TOKEN_KEY, token);
  }

  private setRefreshToken(refreshToken: string): void {
    this.storageService.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    this.refreshTokenSubject.next(refreshToken);
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < expiry;
    } catch {
      return false;
    }
  }

  private waitForRefresh(): Observable<AuthResponse> {
    return this.isRefreshing$.pipe(
      switchMap(isRefreshing => {
        if (!isRefreshing) {
          return this.refreshToken();
        }
        return this.isRefreshing$.pipe(
          map(isRefreshing => {
            if (!isRefreshing) {
              const token = this.storageService.getItem(this.TOKEN_KEY);
              const userJson = this.storageService.getItem(this.USER_KEY);
              if (token && userJson) {
                return {
                  token,
                  refreshToken: this.refreshTokenSubject.value || '',
                  user: JSON.parse(userJson),
                  expiresIn: 3600,
                  tokenType: 'Bearer'
                } as AuthResponse;
              }
            }
            throw new Error('Refresh failed');
          })
        );
      })
    );
  }
}