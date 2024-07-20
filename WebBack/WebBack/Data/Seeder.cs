using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebBack.Data.Entities.Identity;
using WebBack.Services.Interfaces;
using Bogus;
using Bogus.DataSets;
using WebBack.Data.Entities;
using WebBack.Services;

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
                var imageService = scope.ServiceProvider.GetRequiredService<IImageService>();
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

                        var car = carFaker.Generate();

                        int numberOfPhotos = faker.Random.Int(1, 5);
                        for (int k = 0; k < numberOfPhotos; k++)
                        {
                            var imageUrl = faker.Image.LoremFlickrUrl(keywords: "Car", width: 1000, height: 800);
                            var imageBase64 = await GetImageAsBase64Async(httpClient, imageUrl);

                            car.Photos.Add(new CarPhotoEntity
                            {
                                Name = await imageService.SaveImageAsync(imageBase64),
                                Priority = k + 1
                            });
                        }
                        fakeCars.Add(car);
                    }

                    context.Cars.AddRange(fakeCars);
                    //await context.SaveChangesAsync();
                }

                await context.SaveChangesAsync();
            }
        }


        private static async Task<string> GetImageAsBase64Async(HttpClient httpClient, string imageUrl)
        {
            var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
            return Convert.ToBase64String(imageBytes);
        }


        private static void SeedModels(CarDbContext context, IConfiguration configuration)
        {
            if (!context.Models.Any())
            {
                var models = configuration.GetSection("DefaultSeedData:Models").Get<string[]>();
                foreach (var model in models)
                {
                    context.Models.Add(new CarModelEntity { Name = model });
                }
                context.SaveChanges();
            }
        }

        private static void SeedColors(CarDbContext context, IConfiguration configuration)
        {
            if (!context.Colors.Any())
            {
                var colors = configuration.GetSection("DefaultSeedData:Colors").Get<string[]>();
                foreach (var color in colors)
                {
                    context.Colors.Add(new ColorEntity { Color = color });
                }
                context.SaveChanges();
            }
        }

        private static void SeedEngineVolumes(CarDbContext context, IConfiguration configuration)
        {
            if (!context.EngineVolumes.Any())
            {
                var engineVolumes = configuration.GetSection("DefaultSeedData:EngineVolume").Get<string[]>();
                foreach (var volume in engineVolumes)
                {
                    if (decimal.TryParse(volume, out decimal decimalVolume))
                    {
                        context.EngineVolumes.Add(new EngineVolumeEntity { Volume = decimalVolume });
                    }
                }
                context.SaveChanges();
            }
        }

        private static void SeedFuelTypes(CarDbContext context, IConfiguration configuration)
        {
            if (!context.FuelTypes.Any())
            {
                var fuelTypes = configuration.GetSection("DefaultSeedData:FuelTypes").Get<string[]>();
                foreach (var fuelType in fuelTypes)
                {
                    context.FuelTypes.Add(new FuelTypesEntity { Name = fuelType });
                }
                context.SaveChanges();
            }
        }

        private static void SeedNumberOfSeats(CarDbContext context, IConfiguration configuration)
        {
            if (!context.numbersOfSeats.Any())
            {
                var numberOfSeats = configuration.GetSection("DefaultSeedData:NumberOfSeats").Get<string[]>();
                foreach (var seats in numberOfSeats)
                {
                    if (int.TryParse(seats, out int intSeats))
                    {
                        context.numbersOfSeats.Add(new NumberOfSeatsEntity { Number = intSeats });

                    }
                    context.SaveChanges();
                }
            }
        }

        private static void SeedTransmissionTypes(CarDbContext context, IConfiguration configuration)
        {
            if (!context.TransmissionTypes.Any())
            {
                var transmissionTypes = configuration.GetSection("DefaultSeedData:TransmissionTypes").Get<string[]>();
                foreach (var transmissionType in transmissionTypes)
                {
                    context.TransmissionTypes.Add(new TransmissionTypeEntity { Name = transmissionType });
                }
                context.SaveChanges();
            }
        }

        private static void SeedTransportTypes(CarDbContext context, IConfiguration configuration)
        {
            if (!context.TransportTypes.Any())
            {
                var transportTypes = configuration.GetSection("DefaultSeedData:TransportTypes").Get<string[]>();
                foreach (var transportType in transportTypes)
                {
                    context.TransportTypes.Add(new TransportTypeEntity { Name = transportType });
                }
                context.SaveChanges();
            }
        }

    }
}