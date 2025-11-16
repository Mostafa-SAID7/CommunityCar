using CommunityCar.Domain.Interfaces;

namespace CommunityCar.ML.Car.Background.Jobs
{
    public class GenerateSuggestionJob
    {
        private readonly IAiSuggestionService _aiService;

        public GenerateSuggestionJob(IAiSuggestionService aiService)
        {
            _aiService = aiService;
        }

        public async Task ExecuteAsync(int postId, string postTitle, string postBody, CancellationToken cancellationToken = default)
        {
            // Check if no human answer in 3 min, then generate
            await _aiService.GenerateSuggestionAsync(postTitle, postBody, cancellationToken);
        }
    }
}