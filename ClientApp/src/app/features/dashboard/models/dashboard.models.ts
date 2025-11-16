// Dashboard Models and Interfaces for CommunityCar Application

// Core model types (simplified for dashboard use)
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Leaderboard properties
  points?: number;
  achievementCount?: number;
  currentStreak?: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  answersCount: number;
  createdAt: Date;
  updatedAt: Date;
  isAccepted?: boolean;
}

export interface Answer {
  id: string;
  content: string;
  author: string;
  authorId: string;
  postId: string;
  upvotes: number;
  downvotes: number;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  customerId: string;
  serviceProviderId: string;
  serviceType: 'garage' | 'expert';
  serviceDate: Date;
  status: string;
  notes?: string;
  totalAmount: number;
  createdAt: Date;
}

export interface Expert {
  id: string;
  name: string;
  specialization: string[];
  experience: number;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  location: Location;
  contactInfo: ContactInfo;
  certifications: string[];
  isVerified: boolean;
  avatar?: string;
}

export interface Garage {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  location: Location;
  services: string[];
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  contactInfo: ContactInfo;
  workingHours: any;
  images: string[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  totalBookings: number;
  totalRevenue: number;
  growthRate: number;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  byRole: Record<string, number>;
  recentRegistrations: number;
}

export interface PostStats {
  total: number;
  byCategory: Record<string, number>;
  byStatus: Record<string, number>;
  recentActivity: number;
}

export interface RevenueStats {
  total: number;
  monthly: number;
  byService: Record<string, number>;
  growth: number;
}

export interface AdminDashboardData {
  stats: DashboardStats;
  userStats: UserStats;
  postStats: PostStats;
  revenueStats: RevenueStats;
  recentUsers: User[];
  recentPosts: Post[];
  pendingReports: Report[];
}

export interface ExpertDashboardData {
  stats: {
    totalConsultations: number;
    activeRequests: number;
    completedSessions: number;
    averageRating: number;
    totalEarnings: number;
  };
  consultationRequests: ConsultationRequest[];
  recentAnswers: Answer[];
  earnings: EarningsData[];
  profile: Expert;
}

export interface GarageDashboardData {
  stats: {
    totalBookings: number;
    activeBookings: number;
    completedServices: number;
    averageRating: number;
    totalRevenue: number;
  };
  bookings: Booking[];
  mechanics: Mechanic[];
  services: GarageService[];
  reviews: ServiceReview[];
}

export interface VendorDashboardData {
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    activeListings: number;
  };
  products: Product[];
  orders: Order[];
  inventory: InventoryItem[];
  salesAnalytics: SalesData[];
}

export interface CommunityDashboardData {
  stats: {
    totalPosts: number;
    totalAnswers: number;
    upvotesReceived: number;
    reputationPoints: number;
    postsThisMonth: number;
    answersThisMonth: number;
  };
  recentPosts: Post[];
  recentAnswers: Answer[];
  notifications: Notification[];
  achievements: Achievement[];
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  relatedPostId?: string;
  relatedAnswerId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  points: number;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  rank: number;
  points: number;
  recordedAt: Date;
}

export interface UserLeaderboardStats {
  userId: string;
  currentRank: number;
  weeklyRank: number;
  monthlyRank: number;
  allTimeRank: number;
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  achievementCount: number;
  badgeCount: number;
  currentStreak: number;
  longestStreak: number;
  lastActivity: Date;
}

export interface UserProgression {
  userId: string;
  currentLevel: number;
  pointsToNextLevel: number;
  totalPointsEarned: number;
  progressPercentage: number;
  currentTitle: string;
  nextTitle: string;
  recentAchievements: string[];
}

export interface UserStreak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date;
  type: StreakType;
}

export enum StreakType {
  DailyLogin = 'daily_login',
  WeeklyActivity = 'weekly_activity',
  MonthlyContribution = 'monthly_contribution',
  AchievementStreak = 'achievement_streak'
}

export interface CompetitionResult {
  competitionId: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  status: CompetitionStatus;
  participants: CompetitionParticipant[];
  winner?: CompetitionParticipant;
}

export enum CompetitionStatus {
  Upcoming = 'upcoming',
  Active = 'active',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface CompetitionParticipant {
  userId: string;
  userName: string;
  points: number;
  rank: number;
  isWinner: boolean;
}

export interface PersonalChallenge {
  challengeId: string;
  title: string;
  description: string;
  type: ChallengeType;
  targetValue: number;
  currentValue: number;
  startDate: Date;
  endDate: Date;
  status: ChallengeStatus;
  rewardPoints: number;
  progressPercentage?: number;
}

export enum ChallengeType {
  PostCreation = 'post_creation',
  AnswerHelping = 'answer_helping',
  CommunityEngagement = 'community_engagement',
  AchievementUnlock = 'achievement_unlock',
  StreakMaintenance = 'streak_maintenance',
  PointMilestone = 'point_milestone'
}

export enum ChallengeStatus {
  Active = 'active',
  Completed = 'completed',
  Failed = 'failed',
  Expired = 'expired'
}

export interface ChallengeProgress {
  challengeId: string;
  userId: string;
  currentValue: number;
  targetValue: number;
  progressPercentage: number;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  targetId: string; // achievement, badge, or leaderboard entry ID
  targetType: ReviewTargetType;
  rating: number; // 1-5 stars
  comment: string;
  createdAt: Date;
  moderated: boolean;
  moderatedBy?: string;
  moderatedAt?: Date;
}

export enum ReviewTargetType {
  Achievement = 'achievement',
  Badge = 'badge',
  LeaderboardEntry = 'leaderboard_entry',
  Challenge = 'challenge'
}

export interface SocialInteraction {
  id: string;
  userId: string;
  targetUserId: string;
  type: SocialInteractionType;
  createdAt: Date;
  metadata?: any;
}

export enum SocialInteractionType {
  Follow = 'follow',
  Unfollow = 'unfollow',
  AchievementShare = 'achievement_share',
  ChallengeInvite = 'challenge_invite',
  CollaborationRequest = 'collaboration_request'
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  type: CommunityEventType;
  startDate: Date;
  endDate: Date;
  participants: string[]; // user IDs
  maxParticipants?: number;
  status: CommunityEventStatus;
  createdBy: string;
  rewards: EventReward[];
}

export enum CommunityEventType {
  Competition = 'competition',
  Challenge = 'challenge',
  Tournament = 'tournament',
  Hackathon = 'hackathon',
  Workshop = 'workshop'
}

export enum CommunityEventStatus {
  Upcoming = 'upcoming',
  Active = 'active',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface EventReward {
  type: RewardType;
  value: number;
  description: string;
}

export enum RewardType {
  Points = 'points',
  Badge = 'badge',
  Achievement = 'achievement',
  Title = 'title'
}

export interface ConsultationRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  serviceType: string;
  description: string;
  preferredDate: Date;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: Date;
  estimatedDuration: number;
  price: number;
}

export interface Mechanic {
  id: string;
  name: string;
  specialization: string[];
  experience: number;
  rating: number;
  isAvailable: boolean;
  certifications: string[];
  contactInfo: ContactInfo;
}

export interface GarageService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: Address;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InventoryItem {
  productId: string;
  productName: string;
  currentStock: number;
  minimumStock: number;
  supplier: string;
  lastRestocked: Date;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  products: number;
}

export interface EarningsData {
  date: string;
  amount: number;
  serviceType: string;
  customerName: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reportedPostId?: string;
  reason: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: Date;
}

export interface ServiceReview {
  id: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  serviceType: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}