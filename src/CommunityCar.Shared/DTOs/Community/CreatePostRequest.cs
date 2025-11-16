using System.ComponentModel.DataAnnotations;

namespace CommunityCar.Shared.DTOs.Community
{
    public class CreatePostRequest
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        public List<string> Tags { get; set; }
    }
}
