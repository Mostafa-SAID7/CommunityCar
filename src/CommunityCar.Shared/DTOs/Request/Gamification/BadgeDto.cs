using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommunityCar.Shared.DTOs.Request.Gamification
{
    public class BadgeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string IconUrl { get; set; } = string.Empty;
        public string Criteria { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
