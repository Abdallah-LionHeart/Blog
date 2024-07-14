using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {

        Task<AppUser> GetById(string id);
        Task Update(AppUser user);
        // Task<IEnumerable<AppUserImages>> GetImages(int userId);
        Task<IEnumerable<AppUserImages>> GetProfileImages(string userId);
        Task<IEnumerable<AppUserImages>> GetBackgroundImages(string userId);
        Task AddImage(AppUserImages image);
        Task RemoveImage(int id);
        Task<AppUserImages> GetImageById(int id);
        Task SetMainProfileImage(int imageId);

    }
}