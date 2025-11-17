using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommunityCar.Shared.DTOs.Request.Mechanic
{
    public class UpdateMechanicAvailabilityRequest
    {
        public bool MobileService { get; set; } = true;
        public int ServiceRadius { get; set; } = 25; // miles
        public bool EmergencyService { get; set; } = true;
        public string? BusinessHours { get; set; }
    }
}
