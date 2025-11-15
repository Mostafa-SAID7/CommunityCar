using CommunityCar.Application.DTOs;

namespace CommunityCar.Application.Interfaces
{
    public interface IAiSuggestionService
    {
        Task<AiSuggestionDto> GenerateSuggestionAsync(int postId);
    }
}