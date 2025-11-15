namespace CommunityCar.Shared.Interfaces
{
    public interface ICurrentUser
    {
        int Id { get; }
        string Username { get; }
        string Email { get; }
        string Role { get; }
        bool IsAuthenticated { get; }
    }
}