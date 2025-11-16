using AutoMapper;
using CommunityCar.Application.DTOs;
using CommunityCar.Domain.Entities.Community;
using CommunityCar.Domain.Entities.Gamification;
using CommunityCar.Domain.Entities.Identity;
using CommunityCar.Domain.Enums;

namespace CommunityCar.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // User mappings
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()))
            .ForMember(dest => dest.JoinedAt, opt => opt.MapFrom(src => src.CreatedAt));

        // Reverse mapping for updates
        CreateMap<UserDto, User>()
            .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.UtcNow));
        // Post mappings
        CreateMap<Post, PostDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
            .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Body))
            .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Author.UserName))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
            .ForMember(dest => dest.Likes, opt => opt.MapFrom(src => src.Reactions.Count))
            .ForMember(dest => dest.Tags, opt => opt.MapFrom(src => src.Tags));


        // UserFollow mappings
        CreateMap<UserFollow, UserFollowDto>()
            .ForMember(dest => dest.FollowerId, opt => opt.MapFrom(src => src.FollowerId))
            .ForMember(dest => dest.FollowingId, opt => opt.MapFrom(src => src.FollowingId))
            .ForMember(dest => dest.FollowedAt, opt => opt.MapFrom(src => src.FollowedAt))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));

        // Badge mappings
        CreateMap<Badge, BadgeDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.IconUrl, opt => opt.MapFrom(src => src.IconUrl))
            .ForMember(dest => dest.Criteria, opt => opt.MapFrom(src => src.Criteria))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));

        // UserAchievement mappings
        CreateMap<UserAchievement, UserAchievementDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.BadgeId, opt => opt.MapFrom(src => src.BadgeId))
            .ForMember(dest => dest.EarnedAt, opt => opt.MapFrom(src => src.EarnedAt))
            .ForMember(dest => dest.Badge, opt => opt.MapFrom(src => src.Badge));

        // UserPoint mappings
        CreateMap<UserPoint, UserPointDto>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.Points, opt => opt.MapFrom(src => src.Points))
            .ForMember(dest => dest.LastUpdated, opt => opt.MapFrom(src => src.LastUpdated));

        // Leaderboard DTOs mappings (from LeaderboardDtos.cs)
        CreateMap<User, LeaderboardEntry>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.DisplayName ?? src.UserName))
            .ForMember(dest => dest.Points, opt => opt.MapFrom(src => src.TotalPoints));

        // Notification settings mappings
        CreateMap<UserNotificationSettings, NotificationSettingsDto>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.EmailOnNewFollower, opt => opt.MapFrom(src => src.EmailOnNewFollower))
            .ForMember(dest => dest.EmailOnAchievement, opt => opt.MapFrom(src => src.EmailOnAchievement))
            .ForMember(dest => dest.EmailOnMention, opt => opt.MapFrom(src => src.EmailOnMention))
            .ForMember(dest => dest.EmailOnComment, opt => opt.MapFrom(src => src.EmailOnComment))
            .ForMember(dest => dest.EmailOnLike, opt => opt.MapFrom(src => src.EmailOnLike))
            .ForMember(dest => dest.EmailOnLeaderboardChange, opt => opt.MapFrom(src => src.EmailOnLeaderboardChange))
            .ForMember(dest => dest.EmailOnCompetition, opt => opt.MapFrom(src => src.EmailOnCompetition))
            .ForMember(dest => dest.EmailWeeklyDigest, opt => opt.MapFrom(src => src.EmailWeeklyDigest))
            .ForMember(dest => dest.EmailMarketing, opt => opt.MapFrom(src => src.EmailMarketing))
            .ForMember(dest => dest.PushOnNewFollower, opt => opt.MapFrom(src => src.PushOnNewFollower))
            .ForMember(dest => dest.PushOnAchievement, opt => opt.MapFrom(src => src.PushOnAchievement))
            .ForMember(dest => dest.PushOnMention, opt => opt.MapFrom(src => src.PushOnMention))
            .ForMember(dest => dest.PushOnComment, opt => opt.MapFrom(src => src.PushOnComment))
            .ForMember(dest => dest.PushOnLike, opt => opt.MapFrom(src => src.PushOnLike))
            .ForMember(dest => dest.PushOnLeaderboardChange, opt => opt.MapFrom(src => src.PushOnLeaderboardChange))
            .ForMember(dest => dest.PushOnCompetition, opt => opt.MapFrom(src => src.PushOnCompetition))
            .ForMember(dest => dest.EnableQuietHours, opt => opt.MapFrom(src => src.EnableQuietHours))
            .ForMember(dest => dest.QuietHoursStart, opt => opt.MapFrom(src => src.QuietHoursStart.ToString(@"hh\:mm")))
            .ForMember(dest => dest.QuietHoursEnd, opt => opt.MapFrom(src => src.QuietHoursEnd.ToString(@"hh\:mm")));
    }
}

// Additional DTOs for mapping
public class UserFollowDto
{
    public Guid FollowerId { get; set; }
    public Guid FollowingId { get; set; }
    public DateTime FollowedAt { get; set; }
    public FollowStatus Status { get; set; }
}

public class BadgeDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string IconUrl { get; set; } = string.Empty;
    public string Criteria { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class UserAchievementDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid BadgeId { get; set; }
    public DateTime EarnedAt { get; set; }
    public BadgeDto? Badge { get; set; }
}

public class UserPointDto
{
    public Guid UserId { get; set; }
    public int Points { get; set; }
    public DateTime LastUpdated { get; set; }
}

public class NotificationSettingsDto
{
    public Guid UserId { get; set; }
    public bool? EmailOnNewFollower { get; set; }
    public bool? EmailOnAchievement { get; set; }
    public bool? EmailOnMention { get; set; }
    public bool? EmailOnComment { get; set; }
    public bool? EmailOnLike { get; set; }
    public bool? EmailOnLeaderboardChange { get; set; }
    public bool? EmailOnCompetition { get; set; }
    public bool? EmailWeeklyDigest { get; set; }
    public bool? EmailMarketing { get; set; }
    public bool? PushOnNewFollower { get; set; }
    public bool? PushOnAchievement { get; set; }
    public bool? PushOnMention { get; set; }
    public bool? PushOnComment { get; set; }
    public bool? PushOnLike { get; set; }
    public bool? PushOnLeaderboardChange { get; set; }
    public bool? PushOnCompetition { get; set; }
    public bool? EnableQuietHours { get; set; }
    public string? QuietHoursStart { get; set; }
    public string? QuietHoursEnd { get; set; }
}
