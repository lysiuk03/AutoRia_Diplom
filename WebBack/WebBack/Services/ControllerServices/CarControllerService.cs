using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebBack.Data;
using WebBack.Data.Entities;
using WebBack.Services.ControllerServices.Interfaces;
using WebBack.Services.Interfaces;
using WebBack.ViewModels.Car;

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
            var car = _mapper.Map<CarEntity>(vm);
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

            try
            {
                await _carContext.Cars.AddAsync(car);
                await _carContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                throw new Exception("Error creating car: " + ex.Message);
            }
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

        // public async Task UpdateAsync(CarEditVm vm)
        // {
        //     var car = await _carContext.Cars
        //         .Include(x => x.Photos)
        //         .FirstOrDefaultAsync(c => c.Id == vm.Id);
        //
        //     if (car == null)
        //     {
        //         throw new Exception("Car not found");
        //     }
        //
        //     // Update car properties based on vm
        //     _mapper.Map(vm, car);
        //
        //     if (vm.Photos != null && vm.Photos.Any())
        //     {
        //         // Handle photo updates (similar to CreateAsync)
        //     }
        //
        //     _carContext.Cars.Update(car);
        //     await _carContext.SaveChangesAsync();
        // }
    }
}
