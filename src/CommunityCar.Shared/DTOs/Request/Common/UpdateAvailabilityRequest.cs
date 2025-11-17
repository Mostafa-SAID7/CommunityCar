using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommunityCar.Shared.DTOs.Request.Common
{
    public class UpdateAvailabilityRequest
    {
        public string Status { get; set; } = "Available"; // Available, Busy, Offline
        public string? Message { get; set; }
    }
}
