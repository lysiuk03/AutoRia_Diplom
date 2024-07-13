using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebBack.Data.Entities.Identity;
using WebBack.Services.Interfaces;

namespace WebBack.Data
{
    public static class Seeder
    {
        public static async void SeedData(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<CarDbContext>();
                //var imageService = scope.ServiceProvider.GetService<IImageService>();
                var configuration = scope.ServiceProvider.GetService<IConfiguration>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();

                using var httpClient = new HttpClient();

                context.Database.Migrate();

                await context.SaveChangesAsync();
            }
        }
        //private static async Task<string> GetImageAsBase64Async(HttpClient httpClient, string imageUrl)
        //{
        //    var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
        //    return Convert.ToBase64String(imageBytes);
        //}
    }
}
