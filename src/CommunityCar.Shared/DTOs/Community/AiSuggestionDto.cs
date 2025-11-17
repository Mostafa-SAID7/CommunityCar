using System;

namespace CommunityCar.Application.DTOs.Community
{
    public class AiSuggestionDto
    {
        public int PostId { get; set; }
        public string Suggestion { get; set; }
        public DateTime GeneratedAt { get; set; }
    }
}
