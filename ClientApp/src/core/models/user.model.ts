export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  // Social stats
  followersCount: number;
  followingCount: number;
  postsCount: number;
  reputationPoints: number;
  points?: number;
  achievementCount?: number;
  currentStreak?: number;
  // Preferences
  preferences: UserPreferences;
}

export enum UserRole {
  USER = 'user',
  EXPERT = 'expert',
  GARAGE_OWNER = 'garage_owner',
  VENDOR = 'vendor',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say'
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  leaderboardUpdates: boolean;
  achievementUnlocks: boolean;
  socialInteractions: boolean;
  marketingEmails: boolean;
}

export interface PrivacyPreferences {
  profileVisibility: 'public' | 'friends' | 'private';
  showOnlineStatus: boolean;
  showActivity: boolean;
  allowMessages: 'everyone' | 'friends' | 'none';
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  acceptTerms: boolean;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
  tokenType: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ConfirmResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  website?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  avatar?: File;
}

export interface EmailVerificationRequest {
  token: string;
}

export interface TwoFactorSetupResponse {
  secret: string;
  qrCodeUrl: string;
}

export interface TwoFactorVerificationRequest {
  code: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  description: string;
  metadata?: any;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export interface UserSession {
  id: string;
  userId: string;
  deviceName: string;
  deviceType: string;
  ipAddress: string;
  location: string;
  lastActivity: Date;
  isCurrentSession: boolean;
  isActive: boolean;
}