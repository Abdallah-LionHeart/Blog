using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Repositories;
using API.Services;

namespace API.Extensions
{
    public static class ApplicationserviceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<IArticleRepository, ArticleRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ICloudinaryService, CloudinaryService>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<ArticleService>();
            services.AddScoped<UserService>();



            return services;

        }
    }
}