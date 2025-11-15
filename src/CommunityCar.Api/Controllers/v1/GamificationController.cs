using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommunityCar.Domain.Interfaces;
using CommunityCar.Application.DTOs;

namespace CommunityCar.Api.Controllers.v1
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class GamificationController : ControllerBase
    {
        private readonly ILeaderboardService _leaderboardService;

        public GamificationController(ILeaderboardService leaderboardService)
        {
            _leaderboardService = leaderboardService;
        }

        #region Basic Leaderboard Endpoints

        /// <summary>
        /// Get the top users leaderboard
        /// </summary>
        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard([FromQuery] int top = 10)
        {
            var result = await _leaderboardService.GetLeaderboardAsync(top);
            return Ok(result);
        }

        /// <summary>
        /// Get user's current rank
        /// </summary>
        [HttpGet("rank/{userId}")]
        public async Task<IActionResult> GetUserRank(Guid userId)
        {
            var rank = await _leaderboardService.GetUserRankAsync(userId);
            return Ok(new { Rank = rank });
        }

        #endregion

        #region Enhanced Leaderboard Types

        /// <summary>
        /// Get weekly leaderboard
        /// </summary>
        [HttpGet("leaderboard/weekly")]
        public async Task<IActionResult> GetWeeklyLeaderboard([FromQuery] int top = 10)
        {
            var result = await _leaderboardService.GetWeeklyLeaderboardAsync(top);
            return Ok(result);
        }

        /// <summary>
        /// Get monthly leaderboard
        /// </summary>
        [HttpGet("leaderboard/monthly")]
        public async Task<IActionResult> GetMonthlyLeaderboard([FromQuery] int top = 10)
        {
            var result = await _leaderboardService.GetMonthlyLeaderboardAsync(top);
            return Ok(result);
        }

        /// <summary>
        /// Get all-time leaderboard
        /// </summary>
        [HttpGet("leaderboard/alltime")]
        public async Task<IActionResult> GetAllTimeLeaderboard([FromQuery] int top = 10)
        {
            var result = await _leaderboardService.GetAllTimeLeaderboardAsync(top);
            return Ok(result);
        }

        #endregion

        #region Achievement-Based Leaderboards

        /// <summary>
        /// Get achievement-based leaderboard
        /// </summary>
        [HttpGet("leaderboard/achievements")]
        public async Task<IActionResult> GetAchievementLeaderboard([FromQuery] int top = 10)
        {
            var result = await _leaderboardService.GetAchievementLeaderboardAsync(top);
            return Ok(result);
        }

        /// <summary>
        /// Get badge count leaderboard
        /// </summary>
        [HttpGet("leaderboard/badges")]
        public async Task<IActionResult> GetBadgeLeaderboard([FromQuery] int top = 10)
        {
            var result = await _leaderboardService.GetBadgeCountLeaderboardAsync(top);
            return Ok(result);
        }

        #endregion

        #region User Statistics and Progression

        /// <summary>
        /// Get comprehensive user leaderboard statistics
        /// </summary>
        [HttpGet("users/{userId}/stats")]
        public async Task<IActionResult> GetUserLeaderboardStats(Guid userId)
        {
            var stats = await _leaderboardService.GetUserLeaderboardStatsAsync(userId);
            return Ok(stats);
        }

        /// <summary>
        /// Get user progression and level information
        /// </summary>
        [HttpGet("users/{userId}/progression")]
        public async Task<IActionResult> GetUserProgression(Guid userId)
        {
            var progression = await _leaderboardService.GetUserProgressionAsync(userId);
            return Ok(progression);
        }

        #endregion

        #region Streak Tracking

        /// <summary>
        /// Get user streak information
        /// </summary>
        [HttpGet("users/{userId}/streak")]
        public async Task<IActionResult> GetUserStreak(Guid userId)
        {
            var streak = await _leaderboardService.GetUserStreakAsync(userId);
            return Ok(streak);
        }

        /// <summary>
        /// Get streak-based leaderboard
        /// </summary>
        [HttpGet("leaderboard/streaks")]
        public async Task<IActionResult> GetStreakLeaderboard([FromQuery] int top = 10)
        {
            var result = await _leaderboardService.GetStreakLeaderboardAsync(top);
            return Ok(result);
        }

        #endregion

        #region Community and Social Features

        /// <summary>
        /// Follow a user
        /// </summary>
        [HttpPost("follow/{followedId}")]
        public async Task<IActionResult> FollowUser(Guid followedId)
        {
            var currentUserId = GetCurrentUserId();
            var result = await _leaderboardService.FollowUserAsync(currentUserId, followedId);
            return Ok(new { Success = result });
        }

        /// <summary>
        /// Unfollow a user
        /// </summary>
        [HttpDelete("follow/{followedId}")]
        public async Task<IActionResult> UnfollowUser(Guid followedId)
        {
            var currentUserId = GetCurrentUserId();
            var result = await _leaderboardService.UnfollowUserAsync(currentUserId, followedId);
            return Ok(new { Success = result });
        }

        /// <summary>
        /// Get users followed by current user
        /// </summary>
        [HttpGet("following")]
        public async Task<IActionResult> GetFollowing([FromQuery] int top = 10)
        {
            var currentUserId = GetCurrentUserId();
            var result = await _leaderboardService.GetFollowingAsync(currentUserId, top);
            return Ok(result);
        }

        /// <summary>
        /// Get followers of a user
        /// </summary>
        [HttpGet("users/{userId}/followers")]
        public async Task<IActionResult> GetFollowers(Guid userId, [FromQuery] int top = 10)
        {
            var result = await _leaderboardService.GetFollowersAsync(userId, top);
            return Ok(result);
        }

        /// <summary>
        /// Share an achievement
        /// </summary>
        [HttpPost("achievements/{achievementId}/share")]
        public async Task<IActionResult> ShareAchievement(Guid achievementId, [FromBody] ShareAchievementRequest request)
        {
            var currentUserId = GetCurrentUserId();
            await _leaderboardService.ShareAchievementAsync(currentUserId, achievementId, request.Message);
            return Ok();
        }

        /// <summary>
        /// Get shared achievements feed
        /// </summary>
        [HttpGet("achievements/shared")]
        public async Task<IActionResult> GetSharedAchievements([FromQuery] int top = 20)
        {
            var result = await _leaderboardService.GetSharedAchievementsAsync(top);
            return Ok(result);
        }

        #endregion

        #region Social Leaderboards and Events

        /// <summary>
        /// Get community-specific leaderboard
        /// </summary>
        [HttpGet("communities/{communityId}/leaderboard")]
        public async Task<IActionResult> GetCommunityLeaderboard(Guid communityId, [FromQuery] int top = 10)
        {
            var result = await _leaderboardService.GetCommunityLeaderboardAsync(communityId, top);
            return Ok(result);
        }

        /// <summary>
        /// Get active community events
        /// </summary>
        [HttpGet("events/active")]
        public async Task<IActionResult> GetActiveCommunityEvents()
        {
            var result = await _leaderboardService.GetActiveCommunityEventsAsync();
            return Ok(result);
        }

        /// <summary>
        /// Get user community statistics
        /// </summary>
        [HttpGet("users/{userId}/community-stats")]
        public async Task<IActionResult> GetUserCommunityStats(Guid userId)
        {
            var stats = await _leaderboardService.GetUserCommunityStatsAsync(userId);
            return Ok(stats);
        }

        #endregion

        #region Competition Features

        /// <summary>
        /// Get current active competition
        /// </summary>
        [HttpGet("competitions/current")]
        public async Task<IActionResult> GetCurrentCompetition()
        {
            var result = await _leaderboardService.GetCurrentCompetitionAsync();
            return Ok(result);
        }

        /// <summary>
        /// Get past competitions
        /// </summary>
        [HttpGet("competitions/past")]
        public async Task<IActionResult> GetPastCompetitions([FromQuery] int count = 5)
        {
            var result = await _leaderboardService.GetPastCompetitionsAsync(count);
            return Ok(result);
        }

        /// <summary>
        /// Get user competition statistics
        /// </summary>
        [HttpGet("users/{userId}/competition-stats")]
        public async Task<IActionResult> GetUserCompetitionStats(Guid userId)
        {
            var stats = await _leaderboardService.GetUserCompetitionStatsAsync(userId);
            return Ok(stats);
        }

        #endregion

        #region Challenges

        /// <summary>
        /// Get active challenges for user
        /// </summary>
        [HttpGet("users/{userId}/challenges")]
        public async Task<IActionResult> GetActiveChallenges(Guid userId)
        {
            var result = await _leaderboardService.GetActiveChallengesAsync(userId);
            return Ok(result);
        }

        /// <summary>
        /// Get challenge progress
        /// </summary>
        [HttpGet("challenges/{challengeId}/progress/{userId}")]
        public async Task<IActionResult> GetChallengeProgress(Guid challengeId, Guid userId)
        {
            var progress = await _leaderboardService.GetChallengeProgressAsync(userId, challengeId);
            return Ok(progress);
        }

        #endregion

        #region Review and Feedback System

        /// <summary>
        /// Add review for an achievement
        /// </summary>
        [HttpPost("achievements/{achievementId}/reviews")]
        public async Task<IActionResult> AddAchievementReview(Guid achievementId, [FromBody] AddReviewRequest request)
        {
            var currentUserId = GetCurrentUserId();
            var review = await _leaderboardService.AddAchievementReviewAsync(currentUserId, achievementId, request.Rating, request.Comment);
            return CreatedAtAction(nameof(GetAchievementReviews), new { achievementId }, review);
        }

        /// <summary>
        /// Get reviews for an achievement
        /// </summary>
        [HttpGet("achievements/{achievementId}/reviews")]
        public async Task<IActionResult> GetAchievementReviews(Guid achievementId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var reviews = await _leaderboardService.GetAchievementReviewsAsync(achievementId, page, pageSize);
            return Ok(reviews);
        }

        /// <summary>
        /// Get achievement review statistics
        /// </summary>
        [HttpGet("achievements/{achievementId}/reviews/stats")]
        public async Task<IActionResult> GetAchievementReviewStats(Guid achievementId)
        {
            var stats = await _leaderboardService.GetAchievementReviewStatsAsync(achievementId);
            return Ok(stats);
        }

        /// <summary>
        /// Add review for a badge
        /// </summary>
        [HttpPost("badges/{badgeId}/reviews")]
        public async Task<IActionResult> AddBadgeReview(Guid badgeId, [FromBody] AddReviewRequest request)
        {
            var currentUserId = GetCurrentUserId();
            var review = await _leaderboardService.AddBadgeReviewAsync(currentUserId, badgeId, request.Rating, request.Comment);
            return CreatedAtAction(nameof(GetBadgeReviews), new { badgeId }, review);
        }

        /// <summary>
        /// Get reviews for a badge
        /// </summary>
        [HttpGet("badges/{badgeId}/reviews")]
        public async Task<IActionResult> GetBadgeReviews(Guid badgeId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var reviews = await _leaderboardService.GetBadgeReviewsAsync(badgeId, page, pageSize);
            return Ok(reviews);
        }

        /// <summary>
        /// Get badge review statistics
        /// </summary>
        [HttpGet("badges/{badgeId}/reviews/stats")]
        public async Task<IActionResult> GetBadgeReviewStats(Guid badgeId)
        {
            var stats = await _leaderboardService.GetBadgeReviewStatsAsync(badgeId);
            return Ok(stats);
        }

        #endregion

        #region Moderation (Admin Only)

        /// <summary>
        /// Moderate a review (Admin only)
        /// </summary>
        [HttpPost("reviews/{reviewId}/moderate")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> ModerateReview(Guid reviewId, [FromBody] ModerateReviewRequest request)
        {
            await _leaderboardService.ModerateReviewAsync(reviewId, request.Action, request.Reason);
            return Ok();
        }

        /// <summary>
        /// Get pending reviews for moderation (Admin only)
        /// </summary>
        [HttpGet("reviews/pending")]
        [Authorize(Roles = "Admin,Moderator")]
        public async Task<IActionResult> GetPendingReviews([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var reviews = await _leaderboardService.GetPendingReviewsAsync(page, pageSize);
            return Ok(reviews);
        }

        /// <summary>
        /// Report a review
        /// </summary>
        [HttpPost("reviews/{reviewId}/report")]
        public async Task<IActionResult> ReportReview(Guid reviewId, [FromBody] ReportReviewRequest request)
        {
            var currentUserId = GetCurrentUserId();
            await _leaderboardService.ReportReviewAsync(reviewId, currentUserId, request.Reason);
            return Ok();
        }

        #endregion

        #region Real-time Updates

        /// <summary>
        /// Subscribe to leaderboard updates
        /// </summary>
        [HttpPost("subscribe")]
        public async Task<IActionResult> SubscribeToUpdates()
        {
            var currentUserId = GetCurrentUserId();
            await _leaderboardService.SubscribeToLeaderboardUpdatesAsync(currentUserId);
            return Ok();
        }

        /// <summary>
        /// Unsubscribe from leaderboard updates
        /// </summary>
        [HttpDelete("subscribe")]
        public async Task<IActionResult> UnsubscribeFromUpdates()
        {
            var currentUserId = GetCurrentUserId();
            await _leaderboardService.UnsubscribeFromLeaderboardUpdatesAsync(currentUserId);
            return Ok();
        }

        #endregion

        #region Helper Methods

        private Guid GetCurrentUserId()
        {
            // This would typically get the user ID from the JWT token claims
            // For now, return a placeholder - implement based on your authentication system
            return Guid.NewGuid();
        }

        #endregion
    }

    #region Request/Response DTOs

    public class ShareAchievementRequest
    {
        public string Message { get; set; } = string.Empty;
    }

    public class AddReviewRequest
    {
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }

    public class ModerateReviewRequest
    {
        public ReviewModerationAction Action { get; set; }
        public string Reason { get; set; } = string.Empty;
    }

    public class ReportReviewRequest
    {
        public string Reason { get; set; } = string.Empty;
    }

    #endregion
}