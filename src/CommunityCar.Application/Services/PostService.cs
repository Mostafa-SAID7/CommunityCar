using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommunityCar.Domain.Entities;
using CommunityCar.Shared.Interfaces;
using AutoMapper;
using CommunityCar.Shared.DTOs.Request.Community.Post;
using CommunityCar.Domain.Interfaces;

namespace CommunityCar.Application.Services;

public class PostService(
    IRepository<Post> postRepository,
    IAiSuggestionService aiSuggestionService,
    ICurrentUser currentUserService,
    IMapper mapper
) 
{
    private readonly IRepository<Post> _postRepository = postRepository;
    private readonly IAiSuggestionService _aiSuggestionService = aiSuggestionService;
    private readonly ICurrentUser _currentUserService = currentUserService;
    private readonly IMapper _mapper = mapper;

    public async Task<PostDto> CreatePostAsync(CreatePostRequest request)
    {
        var post = new Post
        {
            Title = request.Title,
            Body = request.Content,
            Tags = request.Tags ?? new List<string>(),
            AuthorId = _currentUserService.UserId
        };

        await _postRepository.AddAsync(post);

        // Trigger AI suggestion in background
        _ = Task.Run(() => GenerateAiSuggestionAsync(post.Id));

        return _mapper.Map<PostDto>(post);
    }

    public async Task<PostDto> GetPostByIdAsync(Guid id)
    {
        var post = await _postRepository.GetByIdAsync(id);
        return _mapper.Map<PostDto>(post);
    }

    public async Task<IEnumerable<PostDto>> GetAllPostsAsync()
    {
        var posts = await _postRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<PostDto>>(posts);
    }

    public async Task UpdatePostAsync(Guid id, CreatePostRequest request)
    {
        var post = await _postRepository.GetByIdAsync(id);
        if (post == null) throw new KeyNotFoundException("Post not found");

        post.Title = request.Title;
        post.Body = request.Content;
        post.Tags = request.Tags ?? new List<string>();
        post.UpdatedAt = DateTime.UtcNow;

        await _postRepository.UpdateAsync(post);
    }

    public async Task DeletePostAsync(Guid id)
    {
        await _postRepository.DeleteAsync(id);
    }

    private async Task GenerateAiSuggestionAsync(Guid postId)
    {
        var post = await _postRepository.GetByIdAsync(postId);
        if (post == null) return;

        // Wait 3 minutes as per requirements
        await Task.Delay(TimeSpan.FromMinutes(3));

        // Check if human answer exists
        if (post.Answers.Any(a => !a.IsAiSuggested)) return;

        var suggestion = await _aiSuggestionService.GenerateSuggestionAsync(post.Title, post.Body);

        var answer = new Answer
        {
            Content = suggestion,
            IsAiSuggested = true,
            PostId = postId,
            AuthorId = "system" // AI user
        };

        // Note: This would need an answer repository, simplified here
        post.Answers.Add(answer);
        await _postRepository.UpdateAsync(post);
    }


}
