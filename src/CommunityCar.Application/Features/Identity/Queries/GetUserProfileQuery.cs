using MediatR;
using CommunityCar.Application.DTOs;

namespace CommunityCar.Application.Queries
{
    public class GetUserProfileQuery : IRequest<UserDto>
    {
        public int UserId { get; set; }
    }
}