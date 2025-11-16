namespace CommunityCar.Shared.Interfaces  
{  
    public interface ICurrentUser  
    {  
        string UserId { get; }  
        string UserName { get; }  
        bool IsAuthenticated { get; }  
    }  
}  
