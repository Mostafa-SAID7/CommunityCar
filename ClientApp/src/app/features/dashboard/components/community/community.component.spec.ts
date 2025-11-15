import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommunityComponent } from './community.component';
import { CommunityDashboardService } from '../../services/community-dashboard.service';

describe('CommunityComponent', () => {
  let component: CommunityComponent;
  let fixture: ComponentFixture<CommunityComponent>;
  let mockService: jasmine.SpyObj<CommunityDashboardService>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('CommunityDashboardService', [
      'getCommunityDashboardData',
      'getUserPosts',
      'getUserAnswers',
      'getNotifications',
      'deletePost',
      'deleteAnswer',
      'markNotificationAsRead',
      'votePost',
      'voteAnswer'
    ]);

    await TestBed.configureTestingModule({
      imports: [CommunityComponent],
      providers: [
        { provide: CommunityDashboardService, useValue: serviceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommunityComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(CommunityDashboardService) as jasmine.SpyObj<CommunityDashboardService>;

    // Mock return values
    mockService.getCommunityDashboardData.and.returnValue(of({} as any));
    mockService.getUserPosts.and.returnValue(of([]));
    mockService.getUserAnswers.and.returnValue(of([]));
    mockService.getNotifications.and.returnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard data on init', () => {
    component.ngOnInit();

    expect(mockService.getCommunityDashboardData).toHaveBeenCalled();
    expect(mockService.getUserPosts).toHaveBeenCalled();
    expect(mockService.getUserAnswers).toHaveBeenCalled();
    expect(mockService.getNotifications).toHaveBeenCalled();
  });

  it('should delete post when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockService.deletePost.and.returnValue(of(null));

    component.onDeletePost('post-id');

    expect(mockService.deletePost).toHaveBeenCalledWith('post-id');
  });

  it('should not delete post when not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.onDeletePost('post-id');

    expect(mockService.deletePost).not.toHaveBeenCalled();
  });

  it('should mark notification as read', () => {
    mockService.markNotificationAsRead.and.returnValue(of(null));

    component.onMarkNotificationRead('notification-id');

    expect(mockService.markNotificationAsRead).toHaveBeenCalledWith('notification-id');
  });

  it('should vote on post', () => {
    mockService.votePost.and.returnValue(of(null));

    component.onVotePost('post-id', 'up');

    expect(mockService.votePost).toHaveBeenCalledWith('post-id', 'up');
  });

  it('should vote on answer', () => {
    mockService.voteAnswer.and.returnValue(of(null));

    component.onVoteAnswer('answer-id', 'down');

    expect(mockService.voteAnswer).toHaveBeenCalledWith('answer-id', 'down');
  });
});