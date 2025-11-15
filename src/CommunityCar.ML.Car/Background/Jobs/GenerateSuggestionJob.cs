using CommunityCar.Application.Interfaces;

namespace CommunityCar.ML.Car.Background.Jobs
{
    public class GenerateSuggestionJob
    {
        private readonly IAiSuggestionService _aiService;

        public GenerateSuggestionJob(IAiSuggestionService aiService)
        {
            _aiService = aiService;
        }

        public async Task ExecuteAsync(int postId)
        {
            // Check if no human answer in 3 min, then generate
            await _aiService.GenerateSuggestionAsync(postId);
        }
    }
}