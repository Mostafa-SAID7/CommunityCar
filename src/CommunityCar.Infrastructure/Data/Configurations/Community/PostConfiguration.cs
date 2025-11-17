using CommunityCar.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CommunityCar.Infrastructure.Data.Configurations.Community;

public class PostConfiguration : IEntityTypeConfiguration<Post>
{
    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Title).IsRequired().HasMaxLength(200);
        builder.Property(p => p.Body).IsRequired();
        builder.Property(p => p.Category).IsRequired();
        builder.Property(p => p.Visibility).IsRequired();
        builder.Property(p => p.IsSolved).HasDefaultValue(false);
        builder.HasOne(p => p.Author).WithMany(u => u.Posts).HasForeignKey(p => p.AuthorId);
        builder.HasMany(p => p.Answers).WithOne(a => a.Post).HasForeignKey(a => a.PostId);
        builder.HasMany(p => p.Reactions).WithOne(r => r.Post).HasForeignKey(r => r.PostId);
    }
}