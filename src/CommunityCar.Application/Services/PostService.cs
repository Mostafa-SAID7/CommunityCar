using CommunityCar.Application.Interfaces;
using CommunityCar.Domain.Entities;
using CommunityCar.Domain.Interfaces;
using CommunityCar.Shared.Interfaces;

namespace CommunityCar.Application.Services;

public class PostService : IPostService
{
    private readonly IRepository<Post> _postRepository;
    private readonly IAiSuggestionService _aiSuggestionService;
    private readonly ICurrentUserService _currentUserService;

    public PostService(
        IRepository<Post> postRepository,
        IAiSuggestionService aiSuggestionService,
        ICurrentUserService currentUserService)
    {
        _postRepository = postRepository;
        _aiSuggestionService = aiSuggestionService;
        _currentUserService = currentUserService;
    }

    public async Task<Post> CreatePostAsync(string title, string body, string category, CancellationToken cancellationToken = default)
    {
        var post = new Post
        {
            Title = title,
            Body = body,
            Category = Enum.Parse<PostCategory>(category),
            AuthorId = _currentUserService.UserId
        };

        await _postRepository.AddAsync(post, cancellationToken);

        // Trigger AI suggestion in background
        _ = Task.Run(() => GenerateAiSuggestionAsync(post.Id, cancellationToken), cancellationToken);

        return post;
    }

    public async Task<Post?> GetPostByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _postRepository.GetByIdAsync(id, cancellationToken);
    }

    public async Task<IEnumerable<Post>> GetPostsAsync(int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
    {
        return await _postRepository.GetPagedAsync(page, pageSize, cancellationToken);
    }

    public async Task UpdatePostAsync(Guid id, string title, string body, CancellationToken cancellationToken = default)
    {
        var post = await _postRepository.GetByIdAsync(id, cancellationToken);
        if (post == null) throw new KeyNotFoundException("Post not found");

        post.Title = title;
        post.Body = body;
        post.UpdatedAt = DateTime.UtcNow;

        await _postRepository.UpdateAsync(post, cancellationToken);
    }

    public async Task DeletePostAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await _postRepository.DeleteAsync(id, cancellationToken);
    }

    private async Task GenerateAiSuggestionAsync(Guid postId, CancellationToken cancellationToken)
    {
        var post = await _postRepository.GetByIdAsync(postId, cancellationToken);
        if (post == null) return;

        // Wait 3 minutes as per requirements
        await Task.Delay(TimeSpan.FromMinutes(3), cancellationToken);

        // Check if human answer exists
        if (post.Answers.Any(a => !a.IsAiSuggested)) return;

        var suggestion = await _aiSuggestionService.GenerateSuggestionAsync(post.Title, post.Body, cancellationToken);

        var answer = new Answer
        {
            Content = suggestion,
            IsAiSuggested = true,
            PostId = postId,
            AuthorId = "system" // AI user
        };

        // Note: This would need an answer repository, simplified here
        post.Answers.Add(answer);
        await _postRepository.UpdateAsync(post, cancellationToken);
    }
}