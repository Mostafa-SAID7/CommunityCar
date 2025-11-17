using System;

namespace CommunityCar.Shared.DTOs.Request.Community.Post
{
    public class AiSuggestionDto
    {
        public int PostId { get; set; }
        public string Suggestion { get; set; }
        public DateTime GeneratedAt { get; set; }
    }
}
