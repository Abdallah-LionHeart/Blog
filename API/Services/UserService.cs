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
        public Task<AppUser> GetUser()
        {
            return _uow.Users.GetUser();
        }
        public Task<AppUser> GetUserById(int id)
        {
            return _uow.Users.GetById(id);
        }

        public async Task UpdateUser(AppUser user)
        {
            await _uow.Users.Update(user);
            await _uow.CompleteAsync();
        }
        public Task<IEnumerable<ProfileImage>> GetUserProfileImages(int userId)
        {
            return _uow.Users.GetProfileImages(userId);
        }

        public Task<IEnumerable<BackgroundImage>> GetUserBackgroundImages(int userId)
        {
            return _uow.Users.GetBackgroundImages(userId);
        }

        public async Task AddProfileImage(IFormFile file, int userId)
        {
            var uploadResult = await _cloudinaryService.UploadImageAsync(file);
            var profileImage = new ProfileImage
            {
                Url = uploadResult.SecureUrl.AbsoluteUri,
                PublicId = uploadResult.PublicId,
                AppUserId = userId
            };

            await _uow.Users.AddProfileImage(profileImage);
            await _uow.CompleteAsync();
        }

        public async Task AddBackgroundImage(IFormFile file, int userId)
        {
            var uploadResult = await _cloudinaryService.UploadImageAsync(file);
            var backgroundImage = new BackgroundImage
            {
                Url = uploadResult.SecureUrl.AbsoluteUri,
                PublicId = uploadResult.PublicId,
                AppUserId = userId
            };

            await _uow.Users.AddBackgroundImage(backgroundImage);
            await _uow.CompleteAsync();
        }

        public async Task RemoveUserProfileImage(int id)
        {
            var image = await _uow.Users.GetProfileImageById(id);
            if (image != null)
            {
                await _cloudinaryService.DeleteFileAsync(image.PublicId);
                await _uow.Users.RemoveProfileImage(id);
                await _uow.CompleteAsync();
            }
        }

        public async Task RemoveUserBackgroundImage(int id)
        {
            var image = await _uow.Users.GetBackgroundImageById(id);
            if (image != null)
            {
                await _cloudinaryService.DeleteFileAsync(image.PublicId);
                await _uow.Users.RemoveBackgroundImage(id);
                await _uow.CompleteAsync();
            }
        }

        public Task<ProfileImage> GetProfileImageById(int id)
        {
            return _uow.Users.GetProfileImageById(id);
        }

        public Task<BackgroundImage> GetBackgroundImageById(int id)
        {
            return _uow.Users.GetBackgroundImageById(id);
        }

        public async Task SetMainProfileImage(int imageId)
        {
            await _uow.Users.SetMainProfileImage(imageId);
            await _uow.CompleteAsync();
        }

        public Task<IEnumerable<ProfileImage>> GetAllProfileImages()
        {
            return _uow.Users.GetAllProfileImages();
        }

        public Task<IEnumerable<BackgroundImage>> GetAllBackgroundImages()
        {
            return _uow.Users.GetAllBackgroundImages();
        }
    }
}
