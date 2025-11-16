using CommunityCar.Application.DTOs;

namespace CommunityCar.Application.Interfaces
{
    public interface IPostService
    {
        Task<PostDto> GetPostByIdAsync(Guid id);
        Task<IEnumerable<PostDto>> GetAllPostsAsync();
        Task<PostDto> CreatePostAsync(CreatePostRequest request);
        Task UpdatePostAsync(Guid id, CreatePostRequest request);
        Task DeletePostAsync(Guid id);
    }
}
