export enum UserRole {
  USER = 'user',
  EXPERT = 'expert',
  GARAGE_OWNER = 'garage_owner',
  VENDOR = 'vendor',
  ADMIN = 'admin'
}

export enum PostCategory {
  GENERAL = 'general',
  MAINTENANCE = 'maintenance',
  REPAIR = 'repair',
  MODIFICATION = 'modification',
  BUY_SELL = 'buy_sell',
  INSURANCE = 'insurance'
}

export enum PostStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  SOLVED = 'solved'
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Language {
  ENGLISH = 'en',
  ARABIC = 'ar'
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  EGP = 'EGP'
}

export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  FRIENDS = 'friends'
}