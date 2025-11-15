# CommunityCar API Documentation

## Overview
The CommunityCar API provides endpoints for managing users, posts, groups, bookings, and services in the CommunityCar platform.

## Authentication
All API requests require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/{id}` - Get post by ID
- `PUT /api/posts/{id}` - Update post
- `DELETE /api/posts/{id}` - Delete post

### Groups
- `GET /api/groups` - Get all groups
- `POST /api/groups` - Create new group
- `GET /api/groups/{id}` - Get group by ID
- `PUT /api/groups/{id}` - Update group
- `DELETE /api/groups/{id}` - Delete group

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/{id}` - Get booking by ID
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Cancel booking

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `GET /api/services/{id}` - Get service by ID
- `PUT /api/services/{id}` - Update service

## Error Handling
The API returns standard HTTP status codes. Error responses include a JSON object with error details.

## Rate Limiting
API requests are rate limited to prevent abuse. Check the `X-RateLimit-*` headers for current limits.