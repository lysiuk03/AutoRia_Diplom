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

                await context.Database.MigrateAsync();

                // Сar seed

                // Seed Cars
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
                        var carPhotos = new List<CarPhotoEntity>();

                        for (int k = 0; k < numberOfPhotos; k++)
                        {
                            var imageUrl = faker.Image.LoremFlickrUrl(keywords: "Car", width: 1000, height: 800);
                            var imageBase64 = await GetImageAsBase64Async(httpClient, imageUrl);

                            var carPhoto = new CarPhotoEntity
                            {
                                Name = await imageService.SaveImageAsync(imageBase64),
                                Priority = k + 1
                            };

                            carPhotos.Add(carPhoto);
                        }

                        car.Photos = carPhotos; // Assign photos to car

                        fakeCars.Add(car);
                    }

                    // Add all cars to context and save changes
                    context.Cars.AddRange(fakeCars);
                    await context.SaveChangesAsync();
                }


                await context.SaveChangesAsync();

                    //context.Cars.AddRange(fakeCars);
                    //await context.SaveChangesAsync();
                    //}

                //SeedModels(context, configuration);
                //    SeedColors(context, configuration);
                //     SeedEngineVolumes(context, configuration);
                //     SeedFuelTypes(context, configuration);
                //     SeedNumberOfSeats(context, configuration);
                //     SeedTransmissionTypes(context, configuration);
                //     SeedTransportTypes(context, configuration);
                
                //await SeedRegionsAsync(context, configuration);
                //await SeedCitiesAsync(context, configuration);


                //await context.SaveChangesAsync();
            }
        }


        private static async Task<string> GetImageAsBase64Async(HttpClient httpClient, string imageUrl)
        {
            var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
            return Convert.ToBase64String(imageBytes);
        }


        private static async Task SeedModelsAsync(CarDbContext context, IConfiguration configuration)
        {
            if (!context.Models.Any())
            {
                var models = configuration.GetSection("DefaultSeedData:Models").Get<string[]>();
                foreach (var model in models)
                {
                    context.Models.Add(new CarModelEntity { Name = model, DateCreated = DateTime.Now });
                }
                await context.SaveChangesAsync();
            }
        }

        private static async Task SeedColorsAsync(CarDbContext context, IConfiguration configuration)
        {
            if (!context.Colors.Any())
            {
                var colors = configuration.GetSection("DefaultSeedData:Colors").Get<string[]>();
                foreach (var color in colors)
                {
                    context.Colors.Add(new ColorEntity { Color = color, DateCreated = DateTime.Now });
                }
                await context.SaveChangesAsync();
            }
        }

        private static async Task SeedEngineVolumesAsync(CarDbContext context, IConfiguration configuration)
        {
            if (!context.EngineVolumes.Any())
            {
                var engineVolumes = configuration.GetSection("DefaultSeedData:EngineVolume").Get<string[]>();
                foreach (var volume in engineVolumes)
                {
                    if (decimal.TryParse(volume, out decimal decimalVolume))
                    {
                        context.EngineVolumes.Add(new EngineVolumeEntity { Volume = decimalVolume, DateCreated = DateTime.Now });
                    }
                }
                await context.SaveChangesAsync();
            }
        }

        private static async Task SeedFuelTypesAsync(CarDbContext context, IConfiguration configuration)
        {
            if (!context.FuelTypes.Any())
            {
                var fuelTypes = configuration.GetSection("DefaultSeedData:FuelTypes").Get<string[]>();
                foreach (var fuelType in fuelTypes)
                {
                    context.FuelTypes.Add(new FuelTypesEntity { Name = fuelType, DateCreated = DateTime.Now });
                }
                await context.SaveChangesAsync();
            }
        }

        private static async Task SeedNumberOfSeatsAsync(CarDbContext context, IConfiguration configuration)
        {
            if (!context.numbersOfSeats.Any())
            {
                var numberOfSeats = configuration.GetSection("DefaultSeedData:NumberOfSeats").Get<string[]>();
                foreach (var seats in numberOfSeats)
                {
                    if (int.TryParse(seats, out int intSeats))
                    {
                        context.numbersOfSeats.Add(new NumberOfSeatsEntity { Number = intSeats, DateCreated = DateTime.Now });

                    }
                    await context.SaveChangesAsync();
                }
            }
        }

        private static async Task SeedTransmissionTypesAsync(CarDbContext context, IConfiguration configuration)
        {
            if (!context.TransmissionTypes.Any())
            {
                var transmissionTypes = configuration.GetSection("DefaultSeedData:TransmissionTypes").Get<string[]>();
                foreach (var transmissionType in transmissionTypes)
                {
                    context.TransmissionTypes.Add(new TransmissionTypeEntity { Name = transmissionType, DateCreated = DateTime.Now });
                }
                await context.SaveChangesAsync();
            }
        }

        private static async Task SeedTransportTypesAsync(CarDbContext context, IConfiguration configuration)
        {
            if (!context.TransportTypes.Any())
            {
                var transportTypes = configuration.GetSection("DefaultSeedData:TransportTypes").Get<string[]>();
                foreach (var transportType in transportTypes)
                {
                    context.TransportTypes.Add(new TransportTypeEntity { Name = transportType, DateCreated = DateTime.Now });
                }
                await context.SaveChangesAsync();
            }
        }


        //__________________________some regions & coties
        private static async Task SeedRegionsAsync(CarDbContext context, IConfiguration configuration)
        {
            if (!context.Regions.Any())
            {
                var regions = configuration.GetSection("DefaultSeedData:Regions").Get<string[]>();
                foreach (var region in regions)
                {
                    context.Regions.Add(new RegionEntity { Name = region, DateCreated = DateTime.Now });
                }
                await context.SaveChangesAsync();
            }
        }


        private static async Task SeedCitiesAsync(CarDbContext context, IConfiguration configuration)
        {
            if (!context.Cities.Any())
            {
                var cities = configuration.GetSection("DefaultSeedData:Cities").Get<Dictionary<string, string>>();

                foreach (var city in cities)
                {
                    var region = await context.Regions.FirstOrDefaultAsync(r => r.Name == city.Value);
                    if (region != null)
                    {
                        context.Cities.Add(new CityEntity
                        {
                            Name = city.Key,
                            RegionId = region.Id,
                            DateCreated = DateTime.Now
                        });
                    }
                }
                await context.SaveChangesAsync();
            }
        }


    }
}