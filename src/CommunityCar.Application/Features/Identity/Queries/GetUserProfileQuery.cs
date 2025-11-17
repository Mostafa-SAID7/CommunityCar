using MediatR;
using CommunityCar.Application.DTOs;
using CommunityCar.Shared.DTOs.Request.User;

namespace CommunityCar.Application.Queries
{
    public class GetUserProfileQuery : IRequest<UserDto>
    {
        public Guid UserId { get; set; }
    }
}