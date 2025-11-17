using AutoMapper;
using CommunityCar.Application.DTOs;
using CommunityCar.Application.DTOs.Gamification;
using CommunityCar.Domain.Entities.Community;
using CommunityCar.Domain.Entities.Gamification;
using CommunityCar.Domain.Entities.Identity;
using CommunityCar.Domain.Enums;
using CommunityCar.Shared.DTOs.Request.Community.Post;
using CommunityCar.Shared.DTOs.Request.Gamification;
using CommunityCar.Shared.DTOs.Request.User;

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
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.IconUrl, opt => opt.MapFrom(src => src.IconUrl))
            .ForMember(dest => dest.Criteria, opt => opt.MapFrom(src => src.Criteria));

        // UserAchievement mappings
        CreateMap<UserAchievement, UserAchievementDto>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.BadgeId, opt => opt.MapFrom(src => src.BadgeId))
            .ForMember(dest => dest.EarnedAt, opt => opt.MapFrom(src => src.EarnedAt))
            .ForMember(dest => dest.Badge, opt => opt.MapFrom(src => src.Badge));

        // Leaderboard DTOs mappings (from LeaderboardDtos.cs)
        CreateMap<User, LeaderboardEntry>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.DisplayName ?? src.UserName))
            .ForMember(dest => dest.Points, opt => opt.MapFrom(src => src.TotalPoints));

        // Notification settings mappings
 }
}

