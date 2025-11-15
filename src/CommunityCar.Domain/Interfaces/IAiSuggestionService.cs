namespace CommunityCar.Domain.Interfaces;

public interface IAiSuggestionService
{
    Task<string> GenerateSuggestionAsync(string postTitle, string postBody, CancellationToken cancellationToken = default);
}