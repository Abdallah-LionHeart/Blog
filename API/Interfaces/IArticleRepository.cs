using API.Entities;

namespace API.Interfaces
{
    public interface IArticleRepository
    {
        Task<IEnumerable<Article>> GetAll();
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
    }
}