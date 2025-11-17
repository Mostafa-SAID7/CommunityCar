using System;

namespace CommunityCar.Shared.DTOs.Request.User
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}
