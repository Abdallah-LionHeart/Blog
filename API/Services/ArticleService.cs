using API.Entities;
using API.Interfaces;

namespace API.Services
{
    public class ArticleService
    {
        private readonly IUnitOfWork _uow;
        private readonly ICloudinaryService _cloudinaryService;

        public ArticleService(IUnitOfWork unitOfWork, ICloudinaryService cloudinaryService)
        {
            _cloudinaryService = cloudinaryService;
            _uow = unitOfWork;

        }

        public Task<IEnumerable<Article>> GetAllArticles()
        {
            return _uow.Articles.GetAll();
        }

        public Task<Article> GetArticleById(int id)
        {
            return _uow.Articles.GetById(id);
        }

        public async Task AddArticle(Article article)
        {
            await _uow.Articles.Add(article);
            await _uow.CompleteAsync();
        }

        public async Task UpdateArticle(Article article)
        {
            await _uow.Articles.Update(article);
            await _uow.CompleteAsync();
        }

        public async Task DeleteArticle(int id)
        {
            await _uow.Articles.Delete(id);
            await _uow.CompleteAsync();
        }


        public async Task AddImage(IFormFile file, int articleId)
        {
            var uploadResult = await _cloudinaryService.UploadImageAsync(file);
            var image = new Image
            {
                Url = uploadResult.SecureUrl.AbsoluteUri,
                PublicId = uploadResult.PublicId,
                ArticleId = articleId
            };

            await _uow.Articles.AddImage(image);
            await _uow.CompleteAsync();
        }
        public async Task RemoveImage(int id)
        {
            var image = await _uow.Articles.GetImageById(id);
            if (image != null)
            {
                await _cloudinaryService.DeleteFileAsync(image.PublicId);
                await _uow.Articles.RemoveImage(id);
                await _uow.CompleteAsync();
            }
        }

        public Task<Image> GetImageById(int id)
        {
            return _uow.Articles.GetImageById(id);
        }

        public async Task AddVideo(IFormFile file, int articleId)
        {
            var uploadResult = await _cloudinaryService.UploadVideoAsync(file);
            var video = new Video
            {
                Url = uploadResult.SecureUrl.AbsoluteUri,
                PublicId = uploadResult.PublicId,
                ArticleId = articleId
            };

            await _uow.Articles.AddVideo(video);
            await _uow.CompleteAsync();
        }

        public async Task RemoveVideo(int id)
        {
            var video = await _uow.Articles.GetVideoById(id);
            if (video != null && !video.IsExternal)
            {
                await _cloudinaryService.DeleteFileAsync(video.PublicId);
                await _uow.Articles.RemoveVideo(id);
                await _uow.CompleteAsync();
            }
        }

        public Task<Video> GetVideoById(int id)
        {
            return _uow.Articles.GetVideoById(id);
        }
    }
}
