using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public static class DbInitializer
{
    public static async Task SeedData(BlogContext context, UserManager<Admin> userManager, RoleManager<IdentityRole> roleManager)
    {
        // Ensure database is created
        context.Database.Migrate();

        // Seed Admin User
        var adminRole = "Admin";

        if (!await roleManager.RoleExistsAsync(adminRole))
        {
            await roleManager.CreateAsync(new IdentityRole(adminRole));
        }

        var adminUser = new Admin
        {
            UserName = "UmSadam",
            Email = "umSadam@outlook.com",
            FirstName = "Sadam",
            LastName = "Magableh",
            EmailConfirmed = true
        };

        if (await userManager.FindByNameAsync(adminUser.UserName) == null)
        {
            var result = await userManager.CreateAsync(adminUser, "Magableh@Admin2024");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, adminRole);
            }
        }

        // Seed AppUser data
        if (!await context.AppUsers.AnyAsync())
        {
            var appUser = new AppUser
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "john.doe@example.com",
                Education = "B.Sc. Computer Science",
                Experience = "5 years in software development",
                Position = "Software Engineer",
                Overview = "Experienced software engineer...",
                PhoneNumber = "123-456-7890",
                Age = 30,
                FacebookLink = "http://facebook.com/johndoe",
                TwitterLink = "http://twitter.com/johndoe",
                YouTubeLink = "http://youtube.com/johndoe"
            };

            context.AppUsers.Add(appUser);
            await context.SaveChangesAsync();

            // Seed ProfileImages and BackgroundImages
            var profileImage = new ProfileImage
            {
                Url = "https://res.cloudinary.com/dlfn7tqlb/image/upload/v1721236911/blog/v81g2n1gd2vc3ssyaqve.avif",
                IsMain = true,
                AppUserId = appUser.Id
            };

            var backgroundImage = new BackgroundImage
            {
                Url = "https://res.cloudinary.com/dlfn7tqlb/image/upload/v1721257081/blog/w2m0jcvu7lqrow5rd2nk.avif",
                AppUserId = appUser.Id
            };

            context.ProfileImages.Add(profileImage);
            context.BackgroundImages.Add(backgroundImage);
            await context.SaveChangesAsync();
        }

        // Seed Articles
        if (!await context.Articles.AnyAsync())
        {
            var articles = new List<Article>
            {
                new Article
                {
                    Title = "Sample Article 1",
                    Content = "This is the first sample article.",
                    Headline = "Sample Headline 1",
                    IsEvent = false,
                    FacebookLink = "http://facebook.com/samplearticle1",
                    YouTubeLink = "http://youtube.com/samplearticle1"
                },
                new Article
                {
                    Title = "Sample Article 2",
                    Content = "This is the second sample article.",
                    Headline = "Sample Headline 2",
                    IsEvent = false,
                    FacebookLink = "http://facebook.com/samplearticle2",
                    YouTubeLink = "http://youtube.com/samplearticle2"
                },
                new Article
                {
                    Title = "Sample Article 3",
                    Content = "This is the third sample article.",
                    Headline = "Sample Headline 3",
                    IsEvent = false,
                    FacebookLink = "http://facebook.com/samplearticle3",
                    YouTubeLink = "http://youtube.com/samplearticle3"
                },
                new Article
                {
                    Title = "Sample Article 4",
                    Content = "This is the fourth sample article.",
                    Headline = "Sample Headline 4",
                    IsEvent = false,
                    FacebookLink = "http://facebook.com/samplearticle4",
                    YouTubeLink = "http://youtube.com/samplearticle4"
                },
                new Article
                {
                    Title = "Sample Article 5",
                    Content = "This is the fifth sample article.",
                    Headline = "Sample Headline 5",
                    IsEvent = false,
                    FacebookLink = "http://facebook.com/samplearticle5",
                    YouTubeLink = "http://youtube.com/samplearticle5"
                }
            };

            context.Articles.AddRange(articles);
            await context.SaveChangesAsync();

            // Seed Images and Videos for Article
            foreach (var article in articles)
            {
                var image = new Image
                {
                    Url = "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    ArticleId = article.Id
                };

                var video = new Video
                {
                    Url = "https://videocdn.cdnpk.net/videos/052a09da-c166-402b-b10d-cffd8756e747/horizontal/previews/videvo_watermarked/large.mp4",
                    IsExternal = true,
                    ArticleId = article.Id
                };

                context.Images.Add(image);
                context.Videos.Add(video);
            }
            await context.SaveChangesAsync();
        }
    }
}
