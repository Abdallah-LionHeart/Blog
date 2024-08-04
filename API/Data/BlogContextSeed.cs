using System.Text.Json;
using API.Entities;

namespace API.Data
{
    public class BlogContextSeed
    {
        public static async Task SeedAsync(BlogContext context)
        {
            // Seed Articles
            if (!context.Articles.Any())
            {
                var articleData = File.ReadAllText("Data/SeedData/ArticleSeed.json");
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var articles = JsonSerializer.Deserialize<List<Article>>(articleData, options);
                context.Articles.AddRange(articles);

                if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
            }
        }
    }
}