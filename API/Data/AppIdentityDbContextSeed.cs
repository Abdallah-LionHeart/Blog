using System.Security.Cryptography;
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            // Check if there are any users already in the database
            if (await userManager.Users.AnyAsync()) return;

            // Define roles
            var roles = new List<AppRole>
            {
                new AppRole { Name = "User" },
                new AppRole { Name = "Admin" }
            };

            // Create roles if they don't exist
            foreach (var role in roles)
            {
                if (await roleManager.RoleExistsAsync(role.Name)) continue;
                await roleManager.CreateAsync(role);
            }

            // Define the admin user with all properties
            var admin = new AppUser
            {
                UserName = "umsadam",
                FirstName = "Sadam",
                LastName = "User",
                Email = "umsadam@outlook.com",
                PublicEmail = "admin@example.com",
                PublicPhoneNumber = "1234567890",
                Education = "Computer Science",
                Experience = "10 years in software development",
                Position = "Chief Technology Officer",
                Overview = "Experienced CTO with a demonstrated history of working in the tech industry.",
                FacebookAccount = "https://facebook.com/admin",
                XAccount = "@admin",
                YouTubeAccount = "https://youtube.com/admin",
                WhatsAppAccount = "+1234567890",
                OtherAccount = "https://linkedin.com/in/admin",

                ProfileImages = new List<ProfileImage>
                {
                    new ProfileImage
                    {
                        Url = "https://cdn.pixabay.com/photo/2019/08/01/05/59/girl-4376755_640.jpg",
                        IsMain = true,
                    }
                },
                BackgroundImages = new List<BackgroundImage>
                {
                    new BackgroundImage
                    {
                        Url = "https://cdn.pixabay.com/photo/2015/12/06/09/15/maple-1079235_640.jpg",
                    },
                    new BackgroundImage
                    {
                        Url = "https://cdn.pixabay.com/photo/2016/09/01/19/53/pocket-watch-1637396_640.jpg",
                    },
                    new BackgroundImage
                    {
                        Url = "https://cdn.pixabay.com/photo/2017/10/03/17/53/nature-2813487_640.jpg",
                    },
                    new BackgroundImage
                    {
                        Url = "https://cdn.pixabay.com/photo/2016/09/04/20/14/sunset-1645103_640.jpg",
                    }
                }

                // Set other properties as needed
            };

            // Create the admin user with a password if they don't already exist
            if (await userManager.FindByEmailAsync(admin.Email) == null)
            {
                await userManager.CreateAsync(admin, "Pa$$w0rd");

                // Assign roles to the admin user
                await userManager.AddToRolesAsync(admin, new[] { "Admin", "User" });
            }
        }
    }
}