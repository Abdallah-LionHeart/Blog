using API.Data;
using API.Entities;
using API.Helpers;
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
            return await _context.Articles
            .Include(a => a.Images)
            .Include(a => a.Videos)
            .Include(a => a.Tags)
            .ToListAsync();
        }

        public async Task<IEnumerable<Article>> GetAllEvents()
        {
            return await _context.Articles
            .Include(a => a.Images)
            .Include(a => a.Videos)
            .Include(a => a.Tags)
            .Where(a => a.IsEvent)
            .ToListAsync();
        }

        public async Task<Article> GetById(int id)
        {
            return await _context.Articles
            .Include(a => a.Images)
            .Include(a => a.Videos)
               .Include(a => a.Tags)
            .FirstOrDefaultAsync(a => a.Id == id);
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
        public async Task<PagedList<Article>> GetAllArticles(ArticleParams articleParams)
        {
            var query = _context.Articles.Include(a => a.Images).Include(a => a.Videos).Include(a => a.Tags).AsQueryable();

            if (!string.IsNullOrWhiteSpace(articleParams.Search))
            {
                var searchTerm = articleParams.Search;
                query = query.Where(a =>
                    a.Title.ToLower().Contains(searchTerm) ||
                    a.Content.ToLower().Contains(searchTerm) ||
                    a.Headline.ToLower().Contains(searchTerm));
            }

            switch (articleParams.OrderBy.ToLower())
            {
                case "lastday":
                    query = query.Where(a => a.PublishDate >= DateTime.UtcNow.AddDays(-1));
                    break;
                case "lastweek":
                    query = query.Where(a => a.PublishDate >= DateTime.UtcNow.AddDays(-7));
                    break;
                case "lastmonth":
                    query = query.Where(a => a.PublishDate >= DateTime.UtcNow.AddMonths(-1));
                    break;
                case "recently":
                default:
                    query = query.OrderByDescending(a => a.PublishDate);
                    break;
            }

            return await PagedList<Article>.CreateAsync(query, articleParams.PageNumber, articleParams.PageSize);
        }

        public async Task<PagedList<Article>> SearchArticles(ArticleParams articleParams, string searchTerm, string filter)
        {
            var query = _context.Articles.Include(a => a.Images).Include(a => a.Videos).Include(a => a.Tags).AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(a => a.Title.Contains(searchTerm) || a.Content.Contains(searchTerm) || a.Headline.Contains(searchTerm));
            }

            return await PagedList<Article>.CreateAsync(query, articleParams.PageNumber, articleParams.PageSize);
        }

        public async Task AddTag(Tag tag)
        {
            await _context.Tags.AddAsync(tag);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTag(Tag tag)
        {
            _context.Entry(tag).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task RemoveTag(int id)
        {
            var tag = await _context.Tags.FindAsync(id);
            if (tag != null)
            {
                _context.Tags.Remove(tag);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Tag> GetTagById(int id)
        {
            return await _context.Tags.FindAsync(id);
        }

        public async Task<IEnumerable<Tag>> GetTagsByArticleId(int articleId)
        {
            return await _context.Tags.Where(t => t.ArticleId == articleId).ToListAsync();
        }

        public async Task<IEnumerable<Tag>> GetAllTags()
        {
            return await _context.Tags.ToListAsync();
        }
    }
}