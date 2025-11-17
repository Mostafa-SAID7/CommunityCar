using System.Collections.Generic;

namespace CommunityCar.Shared.DTOs.Request.Community.Post
{
    public class UpdatePostRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public List<string> Tags { get; set; } = new();
    }
}