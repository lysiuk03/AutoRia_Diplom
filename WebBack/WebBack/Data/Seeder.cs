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

                // Pre car seed

                await SeedBrandsAndModelsAsync(context, configuration);
                await SeedColorsAsync(context, configuration);
                await SeedEngineVolumesAsync(context, configuration);
                await SeedFuelTypesAsync(context, configuration);
                await SeedNumberOfSeatsAsync(context, configuration);
                await SeedTransportTypesAsync(context, configuration);
                await SeedTransportTypesAsync(context, configuration);

                await SeedRegionsAsync(context, configuration);
                await SeedCitiesAsync(context, configuration);


                await context.SaveChangesAsync();

                //// Seed Cars
                //if (await context.Cars.CountAsync() < 1)
                //{
                //    var faker = new Faker();

                //    var fakeCars = new List<CarEntity>();

                //    for (int i = 0; i < 10; i++)
                //    {
                //        var carFaker = new Faker<CarEntity>()
                //            .RuleFor(c => c.Model, f => f.Vehicle.Model())
                //            .RuleFor(c => c.Manufacturer, f => f.Vehicle.Manufacturer())
                //            .RuleFor(c => c.Description, f => f.Lorem.Sentence())
                //            .RuleFor(c => c.Stage, f => f.Lorem.Word())
                //            .RuleFor(c => c.Mileage, f => f.Random.Decimal(0, 9999))
                //            .RuleFor(c => c.VIN, f => f.Vehicle.Vin())
                //            .RuleFor(c => c.DateCreated, f => DateTime.UtcNow.AddDays(f.Random.Int(-10, -1)));

                //        var car = carFaker.Generate();

                //        int numberOfPhotos = faker.Random.Int(1, 5);
                        






                //        var carPhotos = new List<CarPhotoEntity>();

                //        for (int k = 0; k < numberOfPhotos; k++)
                //        {
                //            var imageUrl = faker.Image.LoremFlickrUrl(keywords: "Car", width: 1000, height: 800);
                //            var imageBase64 = await GetImageAsBase64Async(httpClient, imageUrl);

                //            var carPhoto = new CarPhotoEntity
                //            {
                //                Name = await imageService.SaveImageAsync(imageBase64), Priority = k + 1
                //            };

                //            carPhotos.Add(carPhoto);
                //        }

                //        car.Photos = carPhotos; // Assign photos to car

                //        fakeCars.Add(car);
                //    }

                //    // Add all cars to context and save changes
                //    context.Cars.AddRange(fakeCars);
                //    await context.SaveChangesAsync();
                //}


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


            async Task SeedBrandsAndModelsAsync(CarDbContext context, IConfiguration configuration)
            {
                // Перевіряємо, чи є вже дані про моделі
                if (!context.Brands.Any())
                {
                    // Отримуємо бренди та їх моделі з конфігураційного файлу
                    var brandsSection = configuration.GetSection("DefaultSeedData:Brands");
                    var carBrands = brandsSection.GetChildren();

                    foreach (var brandSection in carBrands)
                    {
                        var brandName = brandSection.Value;
                        
                        // Додаємо бренд, якщо його ще немає в базі
                        var carBrandEntity = await context.Brands.FirstOrDefaultAsync(b => b.Name == brandName);
                        if (carBrandEntity == null)
                        {
                            carBrandEntity = new CarBrandEntity
                            {
                                Name = brandName,
                                DateCreated = DateTime.UtcNow
                            };
                            context.Brands.Add(carBrandEntity);
                            await context.SaveChangesAsync(); // Зберігаємо бренд перед додаванням моделей
                        }

                        var modelsSection = configuration.GetSection("DefaultSeedData:Models");
                        var brandModels = modelsSection.GetChildren();
                        var models = brandModels;
                      

                            var carBrandId = carBrandEntity.Id;

                            var currentModels = models.Where(m => m.Key == carBrandEntity.Name).ToList();

                        foreach (var valmodel in currentModels)
                        {

                            foreach (var m in valmodel.GetChildren())
                            {

                                var carModelEntity = new CarModelEntity
                                {
                                    Name = m.Value,
                                    CarBrandId = carBrandId,
                                    DateCreated = DateTime.UtcNow
                                };
                                context.Models.Add(carModelEntity); // Додаємо в контекст
                            }
                        }

                            // SaveChangesAsync варто викликати один раз після виходу з циклу
                        
                        await context.SaveChangesAsync();

                        //{
                        //    if (!context.Models.Any(m => m.Name == model && m.CarBrandId == carBrandEntity.Id))
                        //    {
                        //        var carModelEntity = new CarModelEntity
                        //        {
                        //            Name = model,
                        //            CarBrandId = carBrandEntity.Id,
                        //            DateCreated = DateTime.Now
                        //        };
                        //        context.Models.Add(carModelEntity);
                        //    }
                        //}
                    }

                    // Зберігаємо всі зміни після додавання моделей
                    await context.SaveChangesAsync();
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
                    var engineVolumes = configuration.GetSection("DefaultSeedData:EngineVolume").Get<string[]>();
                    foreach (var volume in engineVolumes)
                    {
                        if (float.TryParse(volume, out float floatVolume))
                        {
                            context.EngineVolumes.Add(new EngineVolumeEntity
                            {
                                Volume = floatVolume, DateCreated = DateTime.UtcNow
                            });
                        }
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
                        configuration.GetSection("DefaultSeedData:TransmissionTypes").Get<string[]>();
                    foreach (var transmissionType in transmissionTypes)
                    {
                        context.TransmissionTypes.Add(new TransmissionTypeEntity
                        {
                            Name = transmissionType, DateCreated = DateTime.UtcNow
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


            //__________________________some regions & coties
            async Task SeedRegionsAsync(CarDbContext context, IConfiguration configuration)
            {
                if (!context.Regions.Any())
                {
                    var regions = configuration.GetSection("DefaultSeedData:Regions").Get<string[]>();
                    foreach (var region in regions)
                    {
                        context.Regions.Add(new RegionEntity { Name = region, DateCreated = DateTime.UtcNow });
                    }

                    await context.SaveChangesAsync();
                }
            }


            async Task SeedCitiesAsync(CarDbContext context, IConfiguration configuration)
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
                                Name = city.Key, RegionId = region.Id, DateCreated = DateTime.UtcNow
                            });
                        }
                    }

                    await context.SaveChangesAsync();
                }
            }


        }
    }
}