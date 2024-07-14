using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly BlogContext _context;

        public UserRepository(BlogContext context)
        {
            _context = context;
        }


        public async Task<AppUser> GetById(string id)
        {
            return await _context.Users.Include(u => u.ProfileImages).Include(u => u.BackgroundImages).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task Update(AppUser user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task AddImage(AppUserImages image)
        {
            await _context.UsersImages.AddAsync(image);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveImage(int id)
        {
            var image = await _context.UsersImages.FindAsync(id);
            if (image != null)
            {
                _context.UsersImages.Remove(image);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<AppUserImages>> GetImages(int userId)
        {
            return await _context.UsersImages.Where(i => i.AppUserId == userId).ToListAsync();
        }

        public async Task<IEnumerable<AppUserImages>> GetProfileImages(string userId)
        {
            if (int.TryParse(userId, out int userIdInt))
            {
                return await _context.UsersImages.Where(i => i.AppUserId == userIdInt && i.IsMain).ToListAsync();
            }
            return new List<AppUserImages>();
        }

        public async Task<IEnumerable<AppUserImages>> GetBackgroundImages(string userId)
        {
            if (int.TryParse(userId, out int userIdInt))
            {
                return await _context.UsersImages.Where(i => i.AppUserId == userIdInt && !i.IsMain).ToListAsync();
            }
            return new List<AppUserImages>();
        }
        public async Task SetMainProfileImage(int imageId)
        {
            var currentMain = await _context.UsersImages.FirstOrDefaultAsync(i => i.IsMain);
            if (currentMain != null)
            {
                currentMain.IsMain = false;
            }

            var newMain = await _context.UsersImages.FindAsync(imageId);
            if (newMain != null)
            {
                newMain.IsMain = true;
            }

            await _context.SaveChangesAsync();
        }
        public async Task<AppUserImages> GetImageById(int id)
        {
            return await _context.UsersImages.FindAsync(id);
        }
    }
}