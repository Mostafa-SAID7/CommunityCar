import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { CommunityDashboardService } from '../../services/community-dashboard.service';
import { LeaderboardService } from '../../../../../core/services/leaderboard.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { CommunityDashboardData, Post, Answer, Notification, Review, ReviewTargetType } from '../../models/dashboard.models';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './community.component.html'
})
export class CommunityComponent implements OnInit {
  dashboardData$!: Observable<CommunityDashboardData>;
  userPosts$!: Observable<Post[]>;
  userAnswers$!: Observable<Answer[]>;
  notifications$!: Observable<Notification[]>;
  userRank$!: Observable<number>;
  reviews$!: Observable<Review[]>;

  // Loading and error states
  isLoading = new BehaviorSubject<boolean>(true);
  errorMessage = '';

  // Review modal state
  showReviewModal = false;
  selectedTargetId = '';
  selectedTargetType: ReviewTargetType = ReviewTargetType.Achievement;
  reviewRating = 5;
  reviewComment = '';

  constructor(
    private communityService: CommunityDashboardService,
    private leaderboardService: LeaderboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private getCurrentUserId(): string {
    const user = this.authService.getCurrentUser();
    return user?.id || '';
  }

  loadDashboardData(): void {
    this.isLoading.next(true);
    this.errorMessage = '';

    try {
      const userId = this.getCurrentUserId();
      this.dashboardData$ = this.communityService.getCommunityDashboardData();
      this.userPosts$ = this.communityService.getUserPosts();
      this.userAnswers$ = this.communityService.getUserAnswers();
      this.notifications$ = this.communityService.getNotifications();
      this.userRank$ = this.leaderboardService.getUserRank(userId);
      this.reviews$ = this.leaderboardService.getReviews(userId, ReviewTargetType.Achievement);

      // Set loading to false after a short delay to simulate loading
      setTimeout(() => this.isLoading.next(false), 500);
    } catch (error) {
      this.errorMessage = 'Failed to load dashboard data';
      this.isLoading.next(false);
      console.error('Error loading dashboard data:', error);
    }
  }

  onCreatePost(): void {
    // Navigate to community section for creating posts
    this.router.navigate(['/community']);
  }

  onEditPost(post: Post): void {
    console.log('Edit post:', post);
  }

  onDeletePost(postId: string): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.communityService.deletePost(postId).subscribe(() => {
        this.loadDashboardData(); // Refresh data
      });
    }
  }

  onEditAnswer(answer: Answer): void {
    console.log('Edit answer:', answer);
  }

  onDeleteAnswer(answerId: string): void {
    if (confirm('Are you sure you want to delete this answer?')) {
      this.communityService.deleteAnswer(answerId).subscribe(() => {
        this.loadDashboardData(); // Refresh data
      });
    }
  }

  onMarkNotificationRead(notificationId: string): void {
    this.communityService.markNotificationAsRead(notificationId).subscribe(() => {
      this.loadDashboardData(); // Refresh data
    });
  }

  onVotePost(postId: string, voteType: 'up' | 'down'): void {
    this.communityService.votePost(postId, voteType).subscribe(() => {
      this.loadDashboardData(); // Refresh data
    });
  }

  onVoteAnswer(answerId: string, voteType: 'up' | 'down'): void {
    this.communityService.voteAnswer(answerId, voteType).subscribe(() => {
      this.loadDashboardData(); // Refresh data
    });
  }

  // Review functionalities
  openReviewModal(targetId: string, targetType: ReviewTargetType): void {
    this.selectedTargetId = targetId;
    this.selectedTargetType = targetType;
    this.showReviewModal = true;
    this.reviewRating = 5;
    this.reviewComment = '';
  }

  closeReviewModal(): void {
    this.showReviewModal = false;
    this.selectedTargetId = '';
    this.reviewRating = 5;
    this.reviewComment = '';
  }

  submitReview(): void {
    if (!this.reviewComment.trim()) return;

    const review: Partial<Review> = {
      targetId: this.selectedTargetId,
      targetType: this.selectedTargetType,
      rating: this.reviewRating,
      comment: this.reviewComment,
      reviewerId: this.getCurrentUserId(),
      createdAt: new Date()
    };

    this.leaderboardService.submitReview(review).subscribe(() => {
      this.closeReviewModal();
      this.loadDashboardData(); // Refresh data
    });
  }

  onRateAchievement(achievementId: string): void {
    this.openReviewModal(achievementId, ReviewTargetType.Achievement);
  }

  onRateBadge(badgeId: string): void {
    this.openReviewModal(badgeId, ReviewTargetType.Badge);
  }

  // Social features
  onFollowUser(userId: string): void {
    this.leaderboardService.followUser(this.getCurrentUserId(), userId).subscribe(() => {
      // Handle success
    });
  }

  onUnfollowUser(userId: string): void {
    this.leaderboardService.unfollowUser(this.getCurrentUserId(), userId).subscribe(() => {
      // Handle success
    });
  }

  onShareAchievement(achievementId: string): void {
    this.leaderboardService.shareAchievement(this.getCurrentUserId(), achievementId).subscribe(() => {
      // Handle success
    });
  }

  // Leaderboard navigation
  navigateToLeaderboard(): void {
    // Navigate to leaderboard component
    this.router.navigate(['/community/leaderboard']);
  }
}