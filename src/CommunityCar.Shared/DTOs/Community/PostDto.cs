using System;

namespace CommunityCar.Shared.DTOs.Community
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Likes { get; set; }
        public List<string> Tags { get; set; }
    }
}
