namespace CommunityCar.Application.DTOs.Common
{
    public class FileUploadRequest
    {
        public string FileName { get; set; }
        public Stream FileStream { get; set; }
        public string ContentType { get; set; }
    }
}
