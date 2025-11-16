import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LeaderboardService } from '../../../../../core/services/leaderboard.service';
import { AuthService } from '../../../../../core/services/auth.service';
import {
  User,
  UserLeaderboardStats,
  UserProgression,
  UserStreak,
  PersonalChallenge,
  CompetitionResult
} from '../../models/dashboard.models';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Leaderboard data
  allTimeLeaderboard$!: Observable<User[]>;
  weeklyLeaderboard$!: Observable<User[]>;
  monthlyLeaderboard$!: Observable<User[]>;
  achievementLeaderboard$!: Observable<User[]>;
  streakLeaderboard$!: Observable<User[]>;

  // User-specific data
  userStats$!: Observable<UserLeaderboardStats>;
  userProgression$!: Observable<UserProgression>;
  userStreak$!: Observable<UserStreak>;
  userChallenges$!: Observable<PersonalChallenge[]>;
  userRank$!: Observable<number>;

  // Competition data
  currentCompetition$!: Observable<CompetitionResult>;

  // UI state
  selectedTab: 'alltime' | 'weekly' | 'monthly' | 'achievements' | 'streaks' = 'alltime';
  currentUserId: string = '';

  constructor(
    private leaderboardService: LeaderboardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get current user
    this.authService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.currentUserId = user.id;
        this.loadUserData(user.id);
      }
    });

    this.loadLeaderboardData();
    this.loadCompetitionData();

    // Start real-time updates
    this.leaderboardService.startRealTimeUpdates();

    // Listen for real-time events
    this.setupRealTimeListeners();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.leaderboardService.stopRealTimeUpdates();
  }

  private loadLeaderboardData(): void {
    this.allTimeLeaderboard$ = this.leaderboardService.getLeaderboard(50);
    this.weeklyLeaderboard$ = this.leaderboardService.getWeeklyLeaderboard(50);
    this.monthlyLeaderboard$ = this.leaderboardService.getMonthlyLeaderboard(50);
    this.achievementLeaderboard$ = this.leaderboardService.getAchievementLeaderboard(50);
    this.streakLeaderboard$ = this.leaderboardService.getStreakLeaderboard(50);
  }

  private loadUserData(userId: string): void {
    this.userStats$ = this.leaderboardService.getUserLeaderboardStats(userId);
    this.userProgression$ = this.leaderboardService.getUserProgression(userId);
    this.userStreak$ = this.leaderboardService.getUserStreak(userId);
    this.userChallenges$ = this.leaderboardService.getActiveChallenges(userId);
    this.userRank$ = this.leaderboardService.getUserRank(userId);
  }

  private loadCompetitionData(): void {
    this.currentCompetition$ = this.leaderboardService.getCurrentCompetition();
  }

  private setupRealTimeListeners(): void {
    // Listen for rank changes
    this.leaderboardService.rankChange$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: { userId: string; oldRank: number; newRank: number }) => {
      if (data.userId === this.currentUserId) {
        this.leaderboardService.showRankChangeNotification(data.userId, data.oldRank, data.newRank);
      }
    });

    // Listen for achievement unlocks
    this.leaderboardService.achievementUnlocked$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: { userId: string; achievementId: string }) => {
      if (data.userId === this.currentUserId) {
        // Could fetch achievement name and show notification
        this.leaderboardService.showAchievementNotification('New Achievement');
      }
    });
  }

  onTabChange(tab: 'alltime' | 'weekly' | 'monthly' | 'achievements' | 'streaks'): void {
    this.selectedTab = tab;
  }

  onFollowUser(userId: string): void {
    this.leaderboardService.followUser(this.currentUserId, userId).subscribe(() => {
      // Handle success
    });
  }

  onUnfollowUser(userId: string): void {
    this.leaderboardService.unfollowUser(this.currentUserId, userId).subscribe(() => {
      // Handle success
    });
  }

  onAcceptChallenge(challengeId: string): void {
    this.leaderboardService.acceptChallenge(this.currentUserId, challengeId).subscribe(() => {
      this.loadUserData(this.currentUserId);
    });
  }

  onJoinCompetition(): void {
    // Implementation for joining competition
  }

  onRefresh(): void {
    this.leaderboardService.refreshLeaderboards();
  }

  isCurrentUser(userId: string): boolean {
    return userId === this.currentUserId;
  }

  trackByUserId(user: User): string {
    return user.id;
  }
}