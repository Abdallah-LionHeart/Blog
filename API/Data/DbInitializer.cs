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
                Url = "",
                IsMain = true,
                AppUserId = appUser.Id
            };

            var backgroundImage = new BackgroundImage
            {
                Url = "",
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
        Title = "Event Article 1",
        Content = "Details about the first event.",
        Headline = "Event Headline 1",
        IsEvent = true,
        FacebookLink = "http://facebook.com/eventarticle1",
        YouTubeLink = "http://youtube.com/eventarticle1"
    },
    new Article
    {
        Title = "Event Article 2",
        Content = "Details about the second event.",
        Headline = "Event Headline 2",
        IsEvent = true,
        FacebookLink = "http://facebook.com/eventarticle2",
        YouTubeLink = "http://youtube.com/eventarticle2"
    },
    new Article
    {
        Title = "Event Article 3",
        Content = "Details about the third event.",
        Headline = "Event Headline 3",
        IsEvent = true,
        FacebookLink = "http://facebook.com/eventarticle3",
        YouTubeLink = "http://youtube.com/eventarticle3"
    },
    new Article
    {
        Title = "Event Article 4",
        Content = "Details about the fourth event.",
        Headline = "Event Headline 4",
        IsEvent = true,
        FacebookLink = "http://facebook.com/eventarticle4",
        YouTubeLink = "http://youtube.com/eventarticle4"
    },
    new Article
    {
        Title = "Event Article 5",
        Content = "Details about the fifth event.",
        Headline = "Event Headline 5",
        IsEvent = true,
        FacebookLink = "http://facebook.com/eventarticle5",
        YouTubeLink = "http://youtube.com/eventarticle5"
    },
    new Article
    {
        Title = "Event Article 6",
        Content = "Details about the sixth event.",
        Headline = "Event Headline 6",
        IsEvent = true,
        FacebookLink = "http://facebook.com/eventarticle6",
        YouTubeLink = "http://youtube.com/eventarticle6"
    },
    new Article
    {
        Title = "Event Article 7",
        Content = "Details about the seventh event.",
        Headline = "Event Headline 7",
        IsEvent = true,
        FacebookLink = "http://facebook.com/eventarticle7",
        YouTubeLink = "http://youtube.com/eventarticle7"
    },
    new Article
    {
        Title = "Event Article 8",
        Content = "Details about the eighth event.",
        Headline = "Event Headline 8",
        IsEvent = true,
        FacebookLink = "http://facebook.com/eventarticle8",
        YouTubeLink = "http://youtube.com/eventarticle8"
    },
    new Article
    {
        Title = "Event Article 9",
        Content = "Details about the ninth event.",
        Headline = "Event Headline 9",
        IsEvent = true,
        FacebookLink = "http://facebook.com/eventarticle9",
        YouTubeLink = "http://youtube.com/eventarticle9"
    },
    new Article
    {
        Title = "Event Article 10",
        Content = "Details about the tenth event.",
        Headline = "Event Headline 10",
        IsEvent = true,
        FacebookLink = "http://facebook.com/eventarticle10",
        YouTubeLink = "http://youtube.com/eventarticle10"
    },
    new Article
    {
        Title = "Regular Article 1",
        Content = "This is the first regular article.",
        Headline = "Regular Headline 1",
        IsEvent = false,
        FacebookLink = "http://facebook.com/regulararticle1",
        YouTubeLink = "http://youtube.com/regulararticle1"
    },
    new Article
    {
        Title = "Regular Article 2",
        Content = "This is the second regular article.",
        Headline = "Regular Headline 2",
        IsEvent = false,
        FacebookLink = "http://facebook.com/regulararticle2",
        YouTubeLink = "http://youtube.com/regulararticle2"
    },
    new Article
    {
        Title = "Regular Article 3",
        Content = "This is the third regular article.",
        Headline = "Regular Headline 3",
        IsEvent = false,
        FacebookLink = "http://facebook.com/regulararticle3",
        YouTubeLink = "http://youtube.com/regulararticle3"
    },
    new Article
    {
        Title = "Regular Article 4",
        Content = "This is the fourth regular article.",
        Headline = "Regular Headline 4",
        IsEvent = false,
        FacebookLink = "http://facebook.com/regulararticle4",
        YouTubeLink = "http://youtube.com/regulararticle4"
    },
    new Article
    {
        Title = "Regular Article 5",
        Content = "This is the fifth regular article.",
        Headline = "Regular Headline 5",
        IsEvent = false,
        FacebookLink = "http://facebook.com/regulararticle5",
        YouTubeLink = "http://youtube.com/regulararticle5"
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
