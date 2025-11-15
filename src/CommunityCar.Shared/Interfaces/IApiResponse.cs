namespace CommunityCar.Shared.Interfaces
{
    public interface IApiResponse<T>
    {
        bool Success { get; set; }
        string Message { get; set; }
        T Data { get; set; }
        IEnumerable<string> Errors { get; set; }
    }
}