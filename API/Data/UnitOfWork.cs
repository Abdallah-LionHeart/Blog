using API.Interfaces;
using API.Repositories;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly BlogContext _context;
        private readonly AppIdentityDbContext _appIdentityDb;
        public UnitOfWork(BlogContext context, AppIdentityDbContext appIdentityDb)
        {
            _appIdentityDb = appIdentityDb;
            _context = context;

        }
        public IArticleRepository Articles => new ArticleRepository(_context);
        public IUserRepository Users => new UserRepository(_appIdentityDb);

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}