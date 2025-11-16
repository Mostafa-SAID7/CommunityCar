namespace CommunityCar.Application.DTOs.System;

public class LockAccountRequest
{
    public int? DurationHours { get; set; } // Null means permanent lock
}

public class DeleteUserRequest
{
    public string Confirmation { get; set; } = string.Empty; // Must be "DELETE_{userId}"
}

public class BulkUserOperationRequest
{
    public IEnumerable<string> UserIds { get; set; } = new List<string>();
    public string Operation { get; set; } = string.Empty; // "lock", "unlock", etc.
}
