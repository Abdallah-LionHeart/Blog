using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppIdentityDbContext _appIdentityDb;

        public UserRepository(AppIdentityDbContext appIdentityDb)
        {
            _appIdentityDb = appIdentityDb;
        }

        public async Task<AppUser> GetUser()
        {
            return await _appIdentityDb.Users.Include(u => u.ProfileImages)
                .Include(u => u.BackgroundImages)
                .FirstOrDefaultAsync();

        }
        public async Task<AppUser> GetById(int id)
        {
            return await _appIdentityDb.Users.Include(u => u.ProfileImages).Include(u => u.BackgroundImages).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task Update(AppUser user)
        {
            _appIdentityDb.Entry(user).State = EntityState.Modified;
            await _appIdentityDb.SaveChangesAsync();

        }

        public async Task<IEnumerable<ProfileImage>> GetProfileImages(int userId)
        {
            return await _appIdentityDb.ProfileImages
                .Where(i => i.AppUserId == userId && i.IsMain)
                .ToListAsync();
        }


        public async Task<IEnumerable<BackgroundImage>> GetBackgroundImages(int userId)
        {
            return await _appIdentityDb.BackgroundImages
                .Where(i => i.AppUserId == userId)
                .ToListAsync();
        }

        public async Task<ProfileImage> GetProfileImageById(int id)
        {
            return await _appIdentityDb.ProfileImages.FindAsync(id);
        }

        public async Task<BackgroundImage> GetBackgroundImageById(int id)
        {
            return await _appIdentityDb.BackgroundImages.FindAsync(id);
        }
        public async Task<IEnumerable<ProfileImage>> GetAllProfileImages()
        {
            return await _appIdentityDb.ProfileImages.ToListAsync();
        }

        public async Task<IEnumerable<BackgroundImage>> GetAllBackgroundImages()
        {
            return await _appIdentityDb.BackgroundImages.ToListAsync();
        }

        public async Task AddBackgroundImage(BackgroundImage backgroundImage)
        {
            await _appIdentityDb.BackgroundImages.AddAsync(backgroundImage);

        }

        public async Task AddProfileImage(ProfileImage profileImage)
        {
            await _appIdentityDb.ProfileImages.AddAsync(profileImage);

        }

        public async Task RemoveProfileImage(int id)
        {
            var profileImage = await _appIdentityDb.ProfileImages.FindAsync(id);
            if (profileImage != null)
            {
                _appIdentityDb.ProfileImages.Remove(profileImage);

            }
        }

        public async Task RemoveBackgroundImage(int id)
        {
            var backgroundImage = await _appIdentityDb.BackgroundImages.FindAsync(id);
            if (backgroundImage != null)
            {
                _appIdentityDb.BackgroundImages.Remove(backgroundImage);

            }
        }


        public void UpdateProfileImage(ProfileImage profileImage)
        {
            _appIdentityDb.ProfileImages.Update(profileImage);
        }


        public async Task SetMainProfileImage(int imageId)
        {
            var image = await _appIdentityDb.ProfileImages.FindAsync(imageId);
            if (image != null)
            {
                var currentMain = await _appIdentityDb.ProfileImages
                    .Where(i => i.AppUserId == image.AppUserId && i.IsMain)
                    .FirstOrDefaultAsync();
                if (currentMain != null)
                {
                    currentMain.IsMain = false;
                    _appIdentityDb.ProfileImages.Update(currentMain);
                }

                image.IsMain = true;
                _appIdentityDb.ProfileImages.Update(image);
                await _appIdentityDb.SaveChangesAsync();
            }
        }

        // public async Task SetMainProfileImage(int imageId)
        // {
        //     var image = await GetProfileImageById(imageId);
        //     if (image != null)
        //     {
        //         var currentMain = await _appIdentityDb.ProfileImages.FirstOrDefaultAsync(i => i.IsMain);
        //         if (currentMain != null)
        //         {
        //             currentMain.IsMain = false;
        //         }

        //         image.IsMain = true;
        //         await _appIdentityDb.SaveChangesAsync();
        //     }
        // }


    }
}