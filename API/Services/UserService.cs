using API.Entities;
using API.Interfaces;

namespace API.Services
{
    public class UserService
    {
        private readonly IUnitOfWork _uow;
        private readonly ICloudinaryService _cloudinaryService;

        public UserService(IUnitOfWork unitOfWork, ICloudinaryService cloudinaryService)
        {
            _cloudinaryService = cloudinaryService;
            _uow = unitOfWork;
        }
        public Task<AppUser> GetUserById(string id)
        {
            return _uow.Users.GetById(id);
        }

        public async Task UpdateUser(AppUser user)
        {
            await _uow.Users.Update(user);
            await _uow.CompleteAsync();
        }
        public Task<IEnumerable<AppUserImages>> GetUserProfileImages(string userId)
        {
            return _uow.Users.GetProfileImages(userId);
        }

        public Task<IEnumerable<AppUserImages>> GetUserBackgroundImages(string userId)
        {
            return _uow.Users.GetBackgroundImages(userId);
        }

        public async Task AddUserImage(int userId, AppUserImages image, Stream fileStream, string fileName, string fileType)
        {
            image.AppUserId = userId;
            image.Url = await _cloudinaryService.UploadFileAsync(fileStream, fileName, fileType);
            await _uow.Users.AddImage(image);
            await _uow.CompleteAsync();
        }

        public async Task RemoveUserImage(int id)
        {
            var image = await _uow.Users.GetImageById(id);
            if (image != null)
            {
                await _cloudinaryService.DeleteFileAsync(image.PublicId);
                await _uow.Users.RemoveImage(id);
                await _uow.CompleteAsync();
            }
        }

        public Task<AppUserImages> GetUserImageById(int id)
        {
            return _uow.Users.GetImageById(id);
        }
        public async Task SetMainProfileImage(int imageId)
        {
            await _uow.Users.SetMainProfileImage(imageId);
            await _uow.CompleteAsync();
        }
    }
}