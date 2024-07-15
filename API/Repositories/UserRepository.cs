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


        public async Task<AppUser> GetById(int id)
        {
            return await _context.AppUsers.Include(u => u.ProfileImages).Include(u => u.BackgroundImages).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task Update(AppUser user)
        {
            _context.AppUsers.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ProfileImage>> GetProfileImages(int userId)
        {
            return await _context.ProfileImages
                .Where(i => i.AppUserId == userId && i.IsMain)
                .ToListAsync();
        }


        public async Task<IEnumerable<BackgroundImage>> GetBackgroundImages(int userId)
        {
            return await _context.BackgroundImages
                .Where(i => i.AppUserId == userId)
                .ToListAsync();
        }

        public async Task<ProfileImage> GetProfileImageById(int id)
        {
            return await _context.ProfileImages.FindAsync(id);
        }

        public async Task<BackgroundImage> GetBackgroundImageById(int id)
        {
            return await _context.BackgroundImages.FindAsync(id);
        }

        public async Task AddBackgroundImage(BackgroundImage backgroundImage)
        {
            await _context.BackgroundImages.AddAsync(backgroundImage);
            await _context.SaveChangesAsync();
        }

        public async Task AddProfileImage(ProfileImage profileImage)
        {
            await _context.ProfileImages.AddAsync(profileImage);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveProfileImage(int id)
        {
            var profileImage = await _context.ProfileImages.FindAsync(id);
            if (profileImage != null)
            {
                _context.ProfileImages.Remove(profileImage);
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveBackgroundImage(int id)
        {
            var backgroundImage = await _context.BackgroundImages.FindAsync(id);
            if (backgroundImage != null)
            {
                _context.BackgroundImages.Remove(backgroundImage);
                await _context.SaveChangesAsync();
            }
        }

        public async Task SetMainProfileImage(int imageId)
        {
            var currentMain = await _context.ProfileImages.FirstOrDefaultAsync(i => i.IsMain);
            if (currentMain != null)
            {
                currentMain.IsMain = false;
            }

            var newMain = await _context.ProfileImages.FindAsync(imageId);
            if (newMain != null)
            {
                newMain.IsMain = true;
            }

            await _context.SaveChangesAsync();
        }
    }
}