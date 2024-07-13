using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions<BlogContext> options) : base(options) { }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<AppUserImages> UsersImages { get; set; }

    }
}