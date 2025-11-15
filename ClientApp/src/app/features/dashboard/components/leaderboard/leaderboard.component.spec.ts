import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LeaderboardComponent } from './leaderboard.component';
import { LeaderboardService } from '../../../../core/services/leaderboard.service';
import { AuthService } from '../../../../core/services/auth.service';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let mockLeaderboardService: jasmine.SpyObj<LeaderboardService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const leaderboardServiceSpy = jasmine.createSpyObj('LeaderboardService', [
      'getLeaderboard',
      'getWeeklyLeaderboard',
      'getMonthlyLeaderboard',
      'getAchievementLeaderboard',
      'getStreakLeaderboard',
      'getUserLeaderboardStats',
      'getUserProgression',
      'getUserStreak',
      'getActiveChallenges',
      'getUserRank',
      'getCurrentCompetition',
      'startRealTimeUpdates',
      'stopRealTimeUpdates',
      'refreshLeaderboards',
      'followUser',
      'acceptChallenge'
    ]);

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

    await TestBed.configureTestingModule({
      imports: [LeaderboardComponent],
      providers: [
        { provide: LeaderboardService, useValue: leaderboardServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    mockLeaderboardService = TestBed.inject(LeaderboardService) as jasmine.SpyObj<LeaderboardService>;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    // Mock return values
    mockLeaderboardService.getLeaderboard.and.returnValue(of([]));
    mockLeaderboardService.getWeeklyLeaderboard.and.returnValue(of([]));
    mockLeaderboardService.getMonthlyLeaderboard.and.returnValue(of([]));
    mockLeaderboardService.getAchievementLeaderboard.and.returnValue(of([]));
    mockLeaderboardService.getStreakLeaderboard.and.returnValue(of([]));
    mockLeaderboardService.getUserLeaderboardStats.and.returnValue(of({} as any));
    mockLeaderboardService.getUserProgression.and.returnValue(of({} as any));
    mockLeaderboardService.getUserStreak.and.returnValue(of({} as any));
    mockLeaderboardService.getActiveChallenges.and.returnValue(of([]));
    mockLeaderboardService.getUserRank.and.returnValue(of(1));
    mockLeaderboardService.getCurrentCompetition.and.returnValue(of({} as any));
    mockAuthService.getCurrentUser.and.returnValue(of({ id: 'user-1' } as any));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    component.ngOnInit();

    expect(mockLeaderboardService.getLeaderboard).toHaveBeenCalled();
    expect(mockLeaderboardService.getWeeklyLeaderboard).toHaveBeenCalled();
    expect(mockLeaderboardService.getMonthlyLeaderboard).toHaveBeenCalled();
    expect(mockLeaderboardService.getAchievementLeaderboard).toHaveBeenCalled();
    expect(mockLeaderboardService.getStreakLeaderboard).toHaveBeenCalled();
    expect(mockLeaderboardService.startRealTimeUpdates).toHaveBeenCalled();
  });

  it('should stop real-time updates on destroy', () => {
    component.ngOnDestroy();

    expect(mockLeaderboardService.stopRealTimeUpdates).toHaveBeenCalled();
  });

  it('should change selected tab', () => {
    component.onTabChange('weekly');

    expect(component.selectedTab).toBe('weekly');
  });

  it('should follow user', () => {
    mockLeaderboardService.followUser.and.returnValue(of(null));

    component.onFollowUser('user-2');

    expect(mockLeaderboardService.followUser).toHaveBeenCalledWith('user-1', 'user-2');
  });

  it('should accept challenge', () => {
    mockLeaderboardService.acceptChallenge.and.returnValue(of(null));

    component.onAcceptChallenge('challenge-1');

    expect(mockLeaderboardService.acceptChallenge).toHaveBeenCalledWith('user-1', 'challenge-1');
  });

  it('should refresh leaderboards', () => {
    component.onRefresh();

    expect(mockLeaderboardService.refreshLeaderboards).toHaveBeenCalled();
  });

  it('should identify current user', () => {
    component.currentUserId = 'user-1';

    expect(component.isCurrentUser('user-1')).toBeTruthy();
    expect(component.isCurrentUser('user-2')).toBeFalsy();
  });

  it('should track by user id', () => {
    const user = { id: 'user-1' } as any;

    expect(component.trackByUserId(0, user)).toBe('user-1');
  });
});