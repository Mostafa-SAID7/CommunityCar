using System;

namespace CommunityCar.Application.DTOs
{
    public class AiSuggestionDto
    {
        public int PostId { get; set; }
        public string Suggestion { get; set; }
        public DateTime GeneratedAt { get; set; }
    }
}