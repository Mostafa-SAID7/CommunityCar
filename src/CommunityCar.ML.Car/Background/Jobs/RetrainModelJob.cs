using CommunityCar.ML.Car.Services;
using CommunityCar.ML.Car.Models;

namespace CommunityCar.ML.Car.Background.Jobs
{
    public class RetrainModelJob
    {
        private readonly FeedbackService _feedbackService;
        private readonly Trainer _trainer;

        public RetrainModelJob(FeedbackService feedbackService, Trainer trainer)
        {
            _feedbackService = feedbackService;
            _trainer = trainer;
        }

        public async Task ExecuteAsync()
        {
            var feedbackData = await _feedbackService.GetFeedbackDataAsync();
            // Retrain model using feedback
            _trainer.RetrainModel(null, feedbackData); // Simplified
        }
    }
}