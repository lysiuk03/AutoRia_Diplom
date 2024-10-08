﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebBack.Data;
using WebBack.Data.Entities;
using WebBack.Services.ControllerServices.Interfaces;
using WebBack.Services.Interfaces;
using WebBack.ViewModels.Car;
using WebBack.ViewModels;
using AutoMapper.QueryableExtensions;
using WebBack.SearchReauestClasses;
using WebBack.Data.Entities.Identity;

namespace WebBack.Services.ControllerServices
{
    public class CarControllerService : ICarControllerService
    {
        private readonly CarDbContext _carContext;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;

        public CarControllerService(
            CarDbContext carContext,
            IMapper mapper,
            IImageService imageService
        )
        {
            _carContext = carContext ?? throw new ArgumentNullException(nameof(carContext));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _imageService = imageService ?? throw new ArgumentNullException(nameof(imageService));
        }

        public async Task CreateAsync(CarCreateVm vm)
        {
            var car = new CarEntity();

            car.DateCreated = DateTime.UtcNow;

            int priorityIndex = 1;

            if (vm.Photos != null && vm.Photos.Any())
            {
                car.Photos = new List<CarPhotoEntity>();

                foreach (var photo in vm.Photos)
                {
                    car.Photos.Add(new CarPhotoEntity
                    {
                        Name = await _imageService.SaveImageAsync(photo),
                        Priority = priorityIndex
                    });
                    priorityIndex++;
                }
            }
            car.BodyType = await _carContext.BodyTypes.Where(bt => bt.Name == vm.BodyType).FirstOrDefaultAsync();
            car.CarModel = await _carContext.Models.Where(m => m.Name == vm.CarModel).FirstOrDefaultAsync();
            car.CarBrand = await _carContext.Brands.Where(b => b.Name == vm.CarBrand).FirstOrDefaultAsync();
            
            car.City = await _carContext.Cities.Where(c => c.Name == vm.City).FirstOrDefaultAsync();
            car.Color = await _carContext.Colors.Where(cl => cl.Color == vm.Color).FirstOrDefaultAsync();

            car.Description = vm.Description;
            car.EngineVolume = await _carContext.EngineVolumes.Where(ev => ev.Volume == float.Parse(vm.EngineVolume)).FirstOrDefaultAsync();
            car.FuelTypes = await _carContext.FuelTypes.Where(ft => ft.Name == vm.FuelTypes).FirstOrDefaultAsync();
            car.NumberOfSeats = await _carContext.numbersOfSeats.Where(ns => ns.Number == int.Parse(vm.NumberOfSeats)).FirstOrDefaultAsync();
            car.Stage = vm.Stage;
            car.TransportType = await _carContext.TransportTypes.Where(tt => tt.Name == vm.TransportType).FirstOrDefaultAsync();
            car.VIN = vm.Vin;
            car.TransmissionType = await _carContext.TransmissionTypes.Where(tt => tt.Name == vm.TransmissionType).FirstOrDefaultAsync();
            
            
           
            


            try
            {
                // Додаємо автомобіль в таблицю Cars і зберігаємо зміни, щоб отримати згенерований CarId
                await _carContext.Cars.AddAsync(car);
                await _carContext.SaveChangesAsync(); // Зберігаємо, щоб Id було згенеровано
                // Створюємо запис для таблиці UserCars
                var userCar = new UserCarEntity
                {
                    User = await _carContext.Users.Where(u => u.Id == int.Parse(vm.UserId)).FirstOrDefaultAsync() ,
                    UserId = int.Parse(vm.UserId), // Id користувача
                    Car = car,
                    CarId = car.Id // Використовуємо згенерований Id автомобіля
                };
                // Додаємо запис в таблицю UserCars
                if (userCar != null)
                {
                    await _carContext.UserCars.AddAsync(userCar);
                    await _carContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                throw new Exception("Error creating car: " + ex.Message);
            }
        }

        public async Task UpdateAsync(CarEditVm vm)
        {
            var car = await _carContext.Cars
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(c => c.Id == vm.Id);

            if (car == null)
            {
                throw new Exception("Car not found");
            }

            // Update car properties based on vm
            _mapper.Map(vm, car);

            if (vm.Photos != null && vm.Photos.Any())
            {
                // Handle photo updates (similar to CreateAsync)
            }

            _carContext.Cars.Update(car);
            await _carContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<CarVm>> SearchAsync(CarSearchRequest searchRequest)
        {
            // Ініціалізуємо запит для фільтрації
            IQueryable<CarEntity> query = _carContext.Cars;

            // Фільтрація за брендом
            if (searchRequest.SelectedBrand != "Будь-який")
            {
                query = query.Where(c => c.CarBrand.Name == searchRequest.SelectedBrand);
            }

            // Фільтрація за моделлю
            if (searchRequest.SelectedModel != "Будь-який")
            {
                query = query.Where(c => c.CarModel.Name == searchRequest.SelectedModel);
            }

            // Фільтрація за типом кузова (BodyType)
            if (searchRequest.CarType != "Будь-який")
            {
                query = query.Where(c => c.BodyType.Name == searchRequest.CarType);
            }

            // Фільтрація за роком
            if (searchRequest.Year != "Будь-який")
            {
                if (int.TryParse(searchRequest.Year, out int year))
                {
                    query = query.Where(c => c.Year == year);
                }
            }

            // Фільтрація за регіоном
            if (searchRequest.Region != "Будь-який")
            {
                query = query.Where(c => c.City.Region.Name == searchRequest.Region);
            }

            // Фільтрація за VIN (якщо ввімкнено перевірку VIN)
            if (searchRequest.VinChecked)
            {
                query = query.Where(c => !string.IsNullOrEmpty(c.VIN));
            }

            // Повертаємо результати
            return await query.ProjectTo<CarVm>(_mapper.ConfigurationProvider).ToListAsync();
        }



        // Uncomment and complete the following methods as needed

        // public async Task DeleteIfExistsAsync(int id)
        // {
        //     var car = await _carContext.Cars
        //         .Include(x => x.Photos)
        //         .FirstOrDefaultAsync(c => c.Id == id);
        //
        //     if (car == null)
        //     {
        //         throw new Exception("Car not found");
        //     }
        //
        //     if (car.Photos != null && car.Photos.Any())
        //     {
        //         foreach (var photo in car.Photos)
        //         {
        //             _imageService.DeleteImageIfExists(photo.Name);
        //         }
        //     }
        //
        //     _carContext.Cars.Remove(car);
        //     await _carContext.SaveChangesAsync();
        // }


    }
}
