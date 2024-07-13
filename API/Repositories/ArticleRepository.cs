using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly BlogContext _context;
        public ArticleRepository(BlogContext context)
        {
            _context = context;

        }
        public async Task Add(Article article)
        {
            await _context.Articles.AddAsync(article);
            await _context.SaveChangesAsync();

        }

        public async Task Delete(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article != null)
            {
                _context.Articles.Remove(article);
                await _context.SaveChangesAsync();

            }
        }

        public async Task<IEnumerable<Article>> GetAll()
        {
            return await _context.Articles.Include(a => a.Images).Include(a => a.Videos).ToListAsync();
        }

        public async Task<Article> GetById(int id)
        {
            return await _context.Articles.Include(a => a.Images).Include(a => a.Videos).FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task Update(Article article)
        {
            _context.Entry(article).State = EntityState.Modified;
            await _context.SaveChangesAsync();

        }
        public async Task AddImage(Image image)
        {
            await _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();

        }

        public async Task RemoveImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image != null)
            {
                _context.Images.Remove(image);
                await _context.SaveChangesAsync();

            }
        }

        public async Task AddVideo(Video video)
        {
            await _context.Videos.AddAsync(video);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveVideo(int id)
        {
            var video = await _context.Videos.FindAsync(id);
            if (video != null)
            {
                _context.Videos.Remove(video);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Image> GetImageById(int id)
        {
            return await _context.Images.FindAsync(id);
        }
        public async Task<Video> GetVideoById(int id)
        {
            return await _context.Videos.FindAsync(id);
        }
    }
}