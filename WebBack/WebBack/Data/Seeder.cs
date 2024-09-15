using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebBack.Data.Entities.Identity;
using WebBack.Services.Interfaces;
using Bogus;
using Bogus.DataSets;
using WebBack.Data.Entities;
using WebBack.Services;
using System.Globalization;
using WebBack.ViewModels.Car;

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

                // Pre car seed

                await SeedBrandsAndModelsAsync(context, configuration);
                await SeedColorsAsync(context, configuration);
                await SeedEngineVolumesAsync(context, configuration);
                await SeedFuelTypesAsync(context, configuration);
                await SeedNumberOfSeatsAsync(context, configuration);
                await SeedTransportTypesAsync(context, configuration);
                await SeedTransmissionTypesAsync(context, configuration);
                await SeedBodyTypesAsync(context, configuration);
                await SeedRegionsAndCitiesAsync(context, configuration);
                await SeedBodyTypesAsync(context,configuration);

                await context.SaveChangesAsync();

               
                // Seed Cars
                if (await context.Cars.CountAsync() < 1)
                {
                    var faker = new Faker();
                    var fakeCars = new List<CarEntity>();

                    for (int i = 0; i < 10; i++)
                    {
                        // Вибір випадкової моделі автомобіля, що містить інформацію про бренд
                        var carModel = await context.Models
                                                    .Include(m => m.CarBrand) // Завантажуємо бренд разом із моделлю
                                                    .OrderBy(r => Guid.NewGuid())
                                                    .FirstOrDefaultAsync();

                        // Вибір випадкового типу кузова
                        var bodyType = await context.BodyTypes.OrderBy(r => Guid.NewGuid()).FirstOrDefaultAsync();

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

                        var car = new CarEntity
                        {
                            Year = faker.Random.Int(1990, 2024),
                            CarBrand = carModel.CarBrand,
                            CarModel = carModel, // Прив'язка до моделі, яка містить бренд
                            Description = faker.Lorem.Sentence(),
                            Stage = faker.Lorem.Word(),
                            Mileage = faker.Random.Decimal(0, 9999),
                            VIN = faker.Vehicle.Vin(),
                            Metallic = faker.Random.Bool(),
                            AccidentParticipation = faker.Random.Bool(),
                            DateCreated = DateTime.UtcNow.AddDays(faker.Random.Int(-10, -1)),

                            // Base options
                            TransportType = await context.TransportTypes.OrderBy(r => Guid.NewGuid()).FirstOrDefaultAsync(),
                            BodyType = bodyType, // Прив'язка до кузова (BodyType)

                            // Інші опції
                            TransmissionType = await context.TransmissionTypes.OrderBy(r => Guid.NewGuid()).FirstOrDefaultAsync(),
                            NumberOfSeats = await context.numbersOfSeats.OrderBy(r => Guid.NewGuid()).FirstOrDefaultAsync(),
                            FuelTypes = await context.FuelTypes.OrderBy(r => Guid.NewGuid()).FirstOrDefaultAsync(),
                            EngineVolume = await context.EngineVolumes.OrderBy(r => Guid.NewGuid()).FirstOrDefaultAsync(),

                            // Місто та регіон
                            City = await context.Cities.OrderBy(r => Guid.NewGuid()).FirstOrDefaultAsync(),

                            // Appearance
                            Color = await context.Colors.OrderBy(r => Guid.NewGuid()).FirstOrDefaultAsync(),

                            Photos = carPhotos
                        };

                        // Додаємо автомобіль до списку
                        fakeCars.Add(car);
                    }

                    // Зберігаємо згенеровані дані в базу
                    await context.Cars.AddRangeAsync(fakeCars);
                    await context.SaveChangesAsync();
                }






                await context.SaveChangesAsync();

                //context.Cars.AddRange(fakeCars);
                //await context.SaveChangesAsync();
            }

            
            //}
            //}


            static async Task<string> GetImageAsBase64Async(HttpClient httpClient, string imageUrl)
            {
                var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);
                return Convert.ToBase64String(imageBytes);
            }


            async Task SeedBodyTypesAsync(CarDbContext context,IConfiguration configuration)
            {
                if (!context.BodyTypes.Any())
                {
                    var bodyTypes = configuration.GetSection("DefaultSeedData:BodyTypes").Get<string[]>();
                    foreach (var type in bodyTypes)
                    {
                        context.BodyTypes.Add(new BodyTypeEntity { Name = type, DateCreated = DateTime.UtcNow });
                    }

                    await context.SaveChangesAsync();
                }

            }

            async Task SeedBrandsAndModelsAsync(CarDbContext context, IConfiguration configuration)
            {
                // Check if brands exist in the database
                if (!context.Brands.Any())
                {
                    // Get brands from configuration
                    var brandsSection = configuration.GetSection("DefaultSeedData:Brands");
                    var carBrands = brandsSection.GetChildren();

                    foreach (var brandSection in carBrands)
                    {
                        var brandName = brandSection.Value;

                        // Check if the brand exists in the database
                        var carBrandEntity = await context.Brands.FirstOrDefaultAsync(b => b.Name == brandName);
                        if (carBrandEntity == null)
                        {
                            // Add new brand
                            carBrandEntity = new CarBrandEntity
                            {
                                Name = brandName,
                                DateCreated = DateTime.UtcNow
                            };
                            context.Brands.Add(carBrandEntity);
                            await context.SaveChangesAsync(); // Save after adding the brand
                        }

                        // Get models for the specific brand
                        var modelsSection = configuration.GetSection($"DefaultSeedData:Models:{brandName}");
                        var brandModels = modelsSection.GetChildren();

                        foreach (var modelSection in brandModels)
                        {
                            var modelName = modelSection.Value;

                            // Check if the model already exists in the database
                            var existingModel = await context.Models.FirstOrDefaultAsync(m => m.Name == modelName && m.CarBrandId == carBrandEntity.Id);
                            if (existingModel == null)
                            {
                                // Add new model
                                var carModelEntity = new CarModelEntity
                                {
                                    Name = modelName,
                                    CarBrandId = carBrandEntity.Id,
                                    DateCreated = DateTime.UtcNow
                                };
                                context.Models.Add(carModelEntity);
                            }
                        }

                        // Save all models for the brand in one go
                        await context.SaveChangesAsync();
                    }
                }
            }



            async Task SeedColorsAsync(CarDbContext context, IConfiguration configuration)
            {
                if (!context.Colors.Any())
                {
                    var colors = configuration.GetSection("DefaultSeedData:Colors").Get<string[]>();
                    foreach (var color in colors)
                    {
                        context.Colors.Add(new ColorEntity { Color = color, DateCreated = DateTime.UtcNow });
                    }

                    await context.SaveChangesAsync();
                }
            }

            async Task SeedEngineVolumesAsync(CarDbContext context, IConfiguration configuration)
            {
                if (!context.EngineVolumes.Any())
                {
                    var engineVolumes = configuration.GetSection("DefaultSeedData:EngineVolume").GetChildren();
                    foreach (var volume in engineVolumes)
                    {
                        context.EngineVolumes.Add(new EngineVolumeEntity
                        {
                            // Використовуємо InvariantCulture для правильного парсингу чисел з крапкою
                            Volume = float.Parse(volume.Value, CultureInfo.InvariantCulture),
                            DateCreated = DateTime.UtcNow
                        });
                    }

                    await context.SaveChangesAsync();
                }
            }

            async Task SeedFuelTypesAsync(CarDbContext context, IConfiguration configuration)
            {
                if (!context.FuelTypes.Any())
                {
                    var fuelTypes = configuration.GetSection("DefaultSeedData:FuelTypes").Get<string[]>();
                    foreach (var fuelType in fuelTypes)
                    {
                        context.FuelTypes.Add(new FuelTypesEntity { Name = fuelType, DateCreated = DateTime.UtcNow });
                    }

                    await context.SaveChangesAsync();
                }
            }

            async Task SeedNumberOfSeatsAsync(CarDbContext context, IConfiguration configuration)
            {
                if (!context.numbersOfSeats.Any())
                {
                    var numberOfSeats = configuration.GetSection("DefaultSeedData:NumberOfSeats").Get<string[]>();
                    foreach (var seats in numberOfSeats)
                    {
                        if (int.TryParse(seats, out int intSeats))
                        {
                            context.numbersOfSeats.Add(new NumberOfSeatsEntity
                            {
                                Number = intSeats, DateCreated = DateTime.UtcNow
                            });

                        }

                        await context.SaveChangesAsync();
                    }
                }
            }

            async Task SeedTransmissionTypesAsync(CarDbContext context, IConfiguration configuration)
            {
                if (!context.TransmissionTypes.Any())
                {
                    var transmissionTypes =
                        configuration.GetSection("DefaultSeedData:TransmissionTypes").GetChildren();
                    foreach (var transmissionType in transmissionTypes)
                    {
                        context.TransmissionTypes.Add(new TransmissionTypeEntity
                        {
                            Name = transmissionType.Value, DateCreated = DateTime.UtcNow
                        });
                    }

                    await context.SaveChangesAsync();
                }
            }

            async Task SeedTransportTypesAsync(CarDbContext context, IConfiguration configuration)
            {
                if (!context.TransportTypes.Any())
                {
                    var transportTypes = configuration.GetSection("DefaultSeedData:TransportTypes").Get<string[]>();
                    foreach (var transportType in transportTypes)
                    {
                        context.TransportTypes.Add(new TransportTypeEntity
                        {
                            Name = transportType, DateCreated = DateTime.UtcNow
                        });
                    }

                    await context.SaveChangesAsync();
                }
            }


            async Task SeedRegionsAndCitiesAsync(CarDbContext context, IConfiguration configuration)
            {
                // Check if regions exist in the database
                if (!context.Regions.Any())
                {
                    var regionsSection = configuration.GetSection("DefaultSeedData:Regions");
                    var regionNames = regionsSection.GetChildren();
                   
                    foreach (var regionSection in regionNames)
                    {
                        var regionName = regionSection.Value;

                        // Create region and add to context
                        var regionEntity = new RegionEntity
                        {
                            Name = regionName,
                            Cities = new List<CityEntity>(), // Initialize the Cities collection
                            DateCreated = DateTime.UtcNow
                        };
                        context.Regions.Add(regionEntity);
                    }

                    // Save all regions to the database
                    await context.SaveChangesAsync();
                }

                // Check if cities exist in the database
                if (!context.Cities.Any())
                {
                    var citiesSection = configuration.GetSection("DefaultSeedData:Cities");

                    foreach (var regionSection in citiesSection.GetChildren())
                    {
                        var regionName = regionSection.Value; // Use Key for the region name
                        var region = await context.Regions.FirstOrDefaultAsync(r => r.Name == regionName);

                        if (region != null)
                        {
                            var cities = regionSection.GetChildren(); // Get cities for this region

                            
                                var cityName = regionSection.Key;

                                // Create city and add to context
                                var cityEntity = new CityEntity
                                {
                                    Name = cityName,
                                    RegionId = region.Id,
                                    DateCreated = DateTime.UtcNow
                                };

                                // Add city to the region's Cities collection
                                region.Cities.Add(cityEntity);

                                // Add the city to the context (optional if relationship is tracked through RegionEntity)
                                context.Cities.Add(cityEntity);
                            

                            // Save changes to the region, which includes cities
                            await context.SaveChangesAsync();
                        }
                    }
                }
            }




        }
    }
}