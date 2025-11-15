using Azure.Storage.Blobs;

namespace CommunityCar.Infrastructure.Services;

public class StorageService : IStorageService
{
    private readonly BlobServiceClient _blobServiceClient;

    public StorageService(BlobServiceClient blobServiceClient)
    {
        _blobServiceClient = blobServiceClient;
    }

    // Implement IStorageService methods for Azure Blob
}