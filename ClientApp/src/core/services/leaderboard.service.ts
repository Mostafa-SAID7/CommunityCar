import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, interval, combineLatest, Subject } from 'rxjs';
import { map, switchMap, startWith, shareReplay, takeUntil } from 'rxjs/operators';
import { ApiService } from './api.service';
import { SignalrService } from './signalr.service';
import {
  User,
  LeaderboardEntry,
  UserLeaderboardStats,
  UserProgression,
  UserStreak,
  CompetitionResult,
  PersonalChallenge,
  ChallengeProgress,
  Review,
  SocialInteraction,
  CommunityEvent
} from '../../app/features/dashboard/models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private refreshInterval = 30000; // 30 seconds
  private leaderboardUpdates$ = new BehaviorSubject<void>(undefined);
  private destroy$ = new Subject<void>();

  // Real-time event subjects
  private rankChangeSubject = new Subject<{ userId: string; oldRank: number; newRank: number }>();
  private achievementUnlockedSubject = new Subject<{ userId: string; achievementId: string }>();
  private challengeCompletedSubject = new Subject<{ userId: string; challengeId: string }>();

  // Public observables for real-time events
  public rankChange$ = this.rankChangeSubject.asObservable();
  public achievementUnlocked$ = this.achievementUnlockedSubject.asObservable();
  public challengeCompleted$ = this.challengeCompletedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private signalrService: SignalrService
  ) {
    this.setupSignalRListeners();
  }

  // Basic leaderboard methods
  getLeaderboard(top: number = 10): Observable<User[]> {
    return this.leaderboardUpdates$.pipe(
      startWith(undefined),
      switchMap(() => this.apiService.get<User[]>(`/leaderboard?top=${top}`)),
      shareReplay(1)
    );
  }

  getUserRank(userId: string): Observable<number> {
    return this.apiService.get<number>(`/leaderboard/user/${userId}/rank`);
  }

  // Enhanced leaderboard types
  getWeeklyLeaderboard(top: number = 10): Observable<User[]> {
    return this.leaderboardUpdates$.pipe(
      startWith(undefined),
      switchMap(() => this.apiService.get<User[]>(`/leaderboard/weekly?top=${top}`)),
      shareReplay(1)
    );
  }

  getMonthlyLeaderboard(top: number = 10): Observable<User[]> {
    return this.leaderboardUpdates$.pipe(
      startWith(undefined),
      switchMap(() => this.apiService.get<User[]>(`/leaderboard/monthly?top=${top}`)),
      shareReplay(1)
    );
  }

  getAllTimeLeaderboard(top: number = 10): Observable<User[]> {
    return this.getLeaderboard(top);
  }

  // Achievement-based leaderboards
  getAchievementLeaderboard(top: number = 10): Observable<User[]> {
    return this.leaderboardUpdates$.pipe(
      startWith(undefined),
      switchMap(() => this.apiService.get<User[]>(`/leaderboard/achievements?top=${top}`)),
      shareReplay(1)
    );
  }

  getBadgeCountLeaderboard(top: number = 10): Observable<User[]> {
    return this.getAchievementLeaderboard(top);
  }

  // User statistics and progression
  getUserLeaderboardStats(userId: string): Observable<UserLeaderboardStats> {
    return this.leaderboardUpdates$.pipe(
      startWith(undefined),
      switchMap(() => this.apiService.get<UserLeaderboardStats>(`/leaderboard/user/${userId}/stats`)),
      shareReplay(1)
    );
  }

  getUserProgression(userId: string): Observable<UserProgression> {
    return this.apiService.get<UserProgression>(`/leaderboard/user/${userId}/progression`);
  }

  // Streak tracking
  getUserStreak(userId: string): Observable<UserStreak> {
    return this.apiService.get<UserStreak>(`/leaderboard/user/${userId}/streak`);
  }

  getStreakLeaderboard(top: number = 10): Observable<User[]> {
    return this.leaderboardUpdates$.pipe(
      startWith(undefined),
      switchMap(() => this.apiService.get<User[]>(`/leaderboard/streaks?top=${top}`)),
      shareReplay(1)
    );
  }

  // Social features
  getFollowedUsersLeaderboard(currentUserId: string, top: number = 10): Observable<User[]> {
    return this.apiService.get<User[]>(`/leaderboard/followed/${currentUserId}?top=${top}`);
  }

  isUserFollowing(followerId: string, followedId: string): Observable<boolean> {
    return this.apiService.get<boolean>(`/social/following/${followerId}/${followedId}`);
  }

  followUser(followerId: string, followedId: string): Observable<any> {
    return this.apiService.post('/social/follow', { followerId, followedId });
  }

  unfollowUser(followerId: string, followedId: string): Observable<any> {
    return this.apiService.delete(`/social/follow/${followerId}/${followedId}`);
  }

  shareAchievement(userId: string, achievementId: string, message?: string): Observable<any> {
    return this.apiService.post('/social/share/achievement', { userId, achievementId, message });
  }

  // Historical data
  getHistoricalLeaderboard(date: Date, top: number = 10): Observable<LeaderboardEntry[]> {
    const dateStr = date.toISOString().split('T')[0];
    return this.apiService.get<LeaderboardEntry[]>(`/leaderboard/historical/${dateStr}?top=${top}`);
  }

  getUserRankHistory(userId: string, days: number = 30): Observable<any> {
    return this.apiService.get(`/leaderboard/user/${userId}/rank-history?days=${days}`);
  }

  // Competition features
  getCurrentCompetition(): Observable<CompetitionResult> {
    return this.apiService.get<CompetitionResult>('/competitions/current');
  }

  getPastCompetitions(count: number = 5): Observable<CompetitionResult[]> {
    return this.apiService.get<CompetitionResult[]>(`/competitions/past?count=${count}`);
  }

  getUserCompetitionStats(userId: string): Observable<any> {
    return this.apiService.get(`/competitions/user/${userId}/stats`);
  }

  // Personalized challenges
  getActiveChallenges(userId: string): Observable<PersonalChallenge[]> {
    return this.apiService.get<PersonalChallenge[]>(`/challenges/user/${userId}/active`);
  }

  getChallengeProgress(userId: string, challengeId: string): Observable<ChallengeProgress> {
    return this.apiService.get<ChallengeProgress>(`/challenges/${challengeId}/progress/${userId}`);
  }

  acceptChallenge(userId: string, challengeId: string): Observable<any> {
    return this.apiService.post('/challenges/accept', { userId, challengeId });
  }

  // Review functionalities
  submitReview(review: Partial<Review>): Observable<Review> {
    return this.apiService.post<Review>('/reviews', review);
  }

  getReviews(targetId: string, targetType: string): Observable<Review[]> {
    return this.apiService.get<Review[]>(`/reviews?targetId=${targetId}&targetType=${targetType}`);
  }

  moderateReview(reviewId: string, moderated: boolean, moderatorId: string): Observable<any> {
    return this.apiService.put(`/reviews/${reviewId}/moderate`, { moderated, moderatorId });
  }

  // Community events
  getCommunityEvents(): Observable<CommunityEvent[]> {
    return this.apiService.get<CommunityEvent[]>('/events');
  }

  joinCommunityEvent(eventId: string, userId: string): Observable<any> {
    return this.apiService.post('/events/join', { eventId, userId });
  }

  leaveCommunityEvent(eventId: string, userId: string): Observable<any> {
    return this.apiService.delete(`/events/${eventId}/leave/${userId}`);
  }

  // Real-time updates with enhanced SignalR integration
  startRealTimeUpdates(): void {
    // Start SignalR connection if not already connected
    this.signalrService.connectionStatus$.subscribe(isConnected => {
      if (!isConnected) {
        this.signalrService.startConnection();
      }
    });

    // Fallback to polling if SignalR fails
    interval(this.refreshInterval).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.leaderboardUpdates$.next(undefined);
    });
  }

  stopRealTimeUpdates(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.signalrService.stopConnection();
  }

  // Force refresh
  refreshLeaderboards(): void {
    this.leaderboardUpdates$.next(undefined);
  }

  // Combined observables for complex UI states
  getUserDashboardData(userId: string): Observable<{
    stats: UserLeaderboardStats;
    progression: UserProgression;
    streak: UserStreak;
    challenges: PersonalChallenge[];
    rank: number;
  }> {
    return combineLatest([
      this.getUserLeaderboardStats(userId),
      this.getUserProgression(userId),
      this.getUserStreak(userId),
      this.getActiveChallenges(userId),
      this.getUserRank(userId)
    ]).pipe(
      map(([stats, progression, streak, challenges, rank]) => ({
        stats,
        progression,
        streak,
        challenges,
        rank
      }))
    );
  }

  // Real-time SignalR setup
  private setupSignalRListeners(): void {
    // Listen for rank changes
    this.signalrService.on('RankChanged', (data: { userId: string; oldRank: number; newRank: number }) => {
      this.rankChangeSubject.next(data);
      // Trigger leaderboard refresh
      this.leaderboardUpdates$.next(undefined);
    });

    // Listen for achievement unlocks
    this.signalrService.on('AchievementUnlocked', (data: { userId: string; achievementId: string }) => {
      this.achievementUnlockedSubject.next(data);
    });

    // Listen for challenge completions
    this.signalrService.on('ChallengeCompleted', (data: { userId: string; challengeId: string }) => {
      this.challengeCompletedSubject.next(data);
    });

    // Listen for leaderboard updates
    this.signalrService.on('LeaderboardUpdated', () => {
      this.leaderboardUpdates$.next(undefined);
    });
  }


  // Push notification methods
  requestNotificationPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      return Notification.requestPermission();
    }
    return Promise.resolve('denied');
  }

  showRankChangeNotification(userId: string, oldRank: number, newRank: number): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = newRank < oldRank ? 'Rank Improved!' : 'Rank Changed';
      const body = `Your leaderboard rank changed from ${oldRank} to ${newRank}`;

      new Notification(title, {
        body,
        icon: '/assets/icons/rank-change.png',
        tag: `rank-change-${userId}`
      });
    }
  }

  showAchievementNotification(achievementName: string): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Achievement Unlocked!', {
        body: `Congratulations! You unlocked "${achievementName}"`,
        icon: '/assets/icons/achievement.png',
        tag: 'achievement-unlocked'
      });
    }
  }
}