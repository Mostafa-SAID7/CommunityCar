using Microsoft.Extensions.Hosting;
using CommunityCar.ML.Car.Background.Jobs;

namespace CommunityCar.ML.Car.Background.Workers
{
    public class AiFallbackWorker : IHostedService
    {
        private readonly GenerateSuggestionJob _generateJob;

        public AiFallbackWorker(GenerateSuggestionJob generateJob)
        {
            _generateJob = generateJob;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            // Monitor posts and enqueue jobs
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}