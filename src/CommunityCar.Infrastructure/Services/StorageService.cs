using Azure.Storage.Blobs;
using CommunityCar.Application.Interfaces;

namespace CommunityCar.Infrastructure.Services;

public class StorageService : IStorageService
{
    private readonly BlobServiceClient _blobServiceClient;

    public StorageService(BlobServiceClient blobServiceClient)
    {
        _blobServiceClient = blobServiceClient;
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient("communitycar");
        await containerClient.CreateIfNotExistsAsync();
        
        var blobClient = containerClient.GetBlobClient(fileName);
        await blobClient.UploadAsync(fileStream, overwrite: true);
        
        return blobClient.Uri.ToString();
    }

    public async Task<Stream> DownloadFileAsync(string fileUrl)
    {
        var uri = new Uri(fileUrl);
        var containerClient = _blobServiceClient.GetBlobContainerClient("communitycar");
        var blobName = uri.Segments.Last();
        var blobClient = containerClient.GetBlobClient(blobName);
        
        var response = await blobClient.DownloadAsync();
        return response.Value.Content;
    }

    public async Task DeleteFileAsync(string fileUrl)
    {
        var uri = new Uri(fileUrl);
        var containerClient = _blobServiceClient.GetBlobContainerClient("communitycar");
        var blobName = uri.Segments.Last();
        var blobClient = containerClient.GetBlobClient(blobName);
        
        await blobClient.DeleteIfExistsAsync();
    }
}