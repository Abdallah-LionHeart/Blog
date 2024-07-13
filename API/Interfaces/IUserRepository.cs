using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {

        Task<AppUser> GetById(int id);
        Task Update(AppUser user);
        Task<IEnumerable<AppUserImages>> GetImages(int userId);
        Task AddImage(AppUserImages image);
        Task RemoveImage(int id);
        Task<AppUserImages> GetImageById(int id);

    }
}