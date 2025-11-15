using Microsoft.ML.Data;

namespace CommunityCar.ML.Car.Models
{
    public class SuggestionInput
    {
        [LoadColumn(0)]
        public string PostText { get; set; }

        [LoadColumn(1)]
        public string Suggestion { get; set; }
    }

    public class SuggestionOutput
    {
        [ColumnName("PredictedLabel")]
        public string PredictedSuggestion { get; set; }
    }
}