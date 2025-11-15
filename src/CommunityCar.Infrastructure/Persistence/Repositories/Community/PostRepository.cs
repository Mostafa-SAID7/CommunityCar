using CommunityCar.Domain.Entities;

namespace CommunityCar.Infrastructure.Persistence.Repositories;

public class PostRepository : IRepository<Post>
{
    private readonly AppDbContext _context;

    public PostRepository(AppDbContext context)
    {
        _context = context;
    }

    // Implement IRepository methods
}