namespace CommunityCar.Shared.DTOs.Request.Common
{
    public class PaginatedRequest
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
