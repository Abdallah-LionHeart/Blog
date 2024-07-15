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
                Url = "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
                IsMain = true,
                AppUserId = appUser.Id
            };

            var backgroundImage = new BackgroundImage
            {
                Url = "https://images.unsplash.com/photo-1587032286390-7edffb326523?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D",
                AppUserId = appUser.Id
            };

            context.ProfileImages.Add(profileImage);
            context.BackgroundImages.Add(backgroundImage);
            await context.SaveChangesAsync();
        }

        // Seed Articles
        if (!await context.Articles.AnyAsync())
        {
            var article = new Article
            {
                Title = "Sample Article",
                Content = "This is a sample article.",
                Headline = "Sample Headline",
                IsEvent = false,
                FacebookLink = "http://facebook.com/samplearticle",
                YouTubeLink = "http://youtube.com/samplearticle"
            };

            context.Articles.Add(article);
            await context.SaveChangesAsync();

            // Seed Images and Videos for Article
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
            await context.SaveChangesAsync();
        }
    }
}
