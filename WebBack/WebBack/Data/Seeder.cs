using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebBack.Data.Entities.Identity;
using WebBack.Services.Interfaces;
using Bogus;
using Bogus.DataSets;
using WebBack.Data.Entities;

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
                
                // Сar seed
                if (await context.Cars.CountAsync() < 1)
                {
                    var faker = new Faker();
                
                    var fakeCars = new List<CarEntity>();
                
                    for (int i = 0; i < 10; i++)
                    {
                        var carFaker = new Faker<CarEntity>()
                            .RuleFor(c => c.Model, f => f.Vehicle.Model())
                            .RuleFor(c => c.Manufacturer, f => f.Vehicle.Manufacturer())
                            .RuleFor(c => c.Description, f => f.Lorem.Sentence())
                            .RuleFor(c => c.Stage, f => f.Lorem.Word())
                            .RuleFor(c => c.Mileage, f => f.Random.Decimal(0, 9999))
                            .RuleFor(c => c.VIN, f => f.Vehicle.Vin())
                            .RuleFor(c => c.DateCreated, f => DateTime.UtcNow.AddDays(f.Random.Int(-10, -1)));
                
                        fakeCars.Add(carFaker.Generate());
                    }
                
                    context.Cars.AddRange(fakeCars);
                    await context.SaveChangesAsync();
                }

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
