using CommunityCar.Application.DTOs;

namespace CommunityCar.Application.Interfaces
{
    public interface IPostService
    {
        Task<PostDto> GetPostByIdAsync(int id);
        Task<IEnumerable<PostDto>> GetAllPostsAsync();
        Task<PostDto> CreatePostAsync(CreatePostRequest request);
        Task UpdatePostAsync(int id, CreatePostRequest request);
        Task DeletePostAsync(int id);
    }
}