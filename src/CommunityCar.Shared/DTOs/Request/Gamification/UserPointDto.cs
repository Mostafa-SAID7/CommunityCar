using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommunityCar.Shared.DTOs.Request.Gamification
{
    internal class UserPointDto
    {
        public Guid UserId { get; set; }
        public int Points { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
