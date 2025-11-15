export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  COMMUNITY: {
    POSTS: '/community/posts',
    ANSWERS: '/community/answers',
    COMMENTS: '/community/comments',
    GROUPS: '/community/groups'
  },
  SERVICES: {
    GARAGES: '/services/garages',
    EXPERTS: '/services/experts',
    BOOKINGS: '/services/bookings'
  },
  DASHBOARD: '/dashboard',
  PROFILE: '/profile'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language'
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100
};

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 500
};