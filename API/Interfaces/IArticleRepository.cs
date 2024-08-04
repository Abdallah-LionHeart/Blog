using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IArticleRepository
    {
        Task<IEnumerable<Article>> GetAll();
        Task<IEnumerable<Article>> GetAllEvents();
        Task<Article> GetById(int id);
        Task Add(Article article);
        Task Update(Article article);
        Task Delete(int id);
        Task AddImage(Image image);
        Task RemoveImage(int id);
        Task AddVideo(Video video);
        Task RemoveVideo(int id);
        Task<Image> GetImageById(int id);
        Task<Video> GetVideoById(int id);
        Task<PagedList<Article>> GetAllArticles(ArticleParams articleParams);
        Task<PagedList<Article>> SearchArticles(ArticleParams articleParams, string searchTerm, string filter);
        Task AddTag(Tag tag);
        Task UpdateTag(Tag tag);
        Task RemoveTag(int id);
        Task<Tag> GetTagById(int id);
        Task<IEnumerable<Tag>> GetTagsByArticleId(int articleId);
        Task<IEnumerable<Tag>> GetAllTags();
    }
}