using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBack.Data;
using WebBack.Data.Entities;
using WebBack.DTOs;

namespace WebBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : ControllerBase
    {
        private readonly CarDbContext _context;

        public CarController(CarDbContext context)
        {
            _context = context;
        }

        // GET: api/car
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDto>>> GetCars()
        {
            var cars = await _context.Cars
                .Include(c => c.TransportType)
                //.Include(c => c.CarBrand)
                .Include(c => c.BodyType)
                .Include(c => c.TransmissionType)
                .Include(c => c.NumberOfSeats)
                .Include(c => c.FuelTypes)
                .Include(c => c.EngineVolume)
                .Include(c => c.City)
                .Include(c => c.Price)
                .Include(c => c.Color)
                //.Include(c => c.Photos)
                .ToListAsync();

            var carDtos = cars.Select(c => new CarDto
            {
                Id = c.Id,
                Year = c.Year,
                Model = c.Model,
                Manufacturer = c.Manufacturer,
                Mileage = c.Mileage,
                VIN = c.VIN,
                Stage = c.Stage,
                Description = c.Description,
                TransportType = c.TransportType != null ? new TransportTypeDto
                {
                    Id = c.TransportType.Id,
                    Name = c.TransportType.Name
                } : null,
                CarBrand = c.CarModel.CarBrand != null ? new CarBrandDto
                {
                    Id = c.CarBrand.Id,
                    Name = c.CarBrand.Name,
                } : null,
                BodyType = c.BodyType != null ? new BodyTypeDto
                {
                    Id = c.BodyType.Id,
                    Name = c.BodyType.Name
                } : null,
                TransmissionType = c.TransmissionType != null ? new TransmissionTypeDto
                {
                    Id = c.TransmissionType.Id,
                    Type = c.TransmissionType.Name
                } : null,
                NumberOfSeats = c.NumberOfSeats != null ? new NumberOfSeatsDto
                {
                    Id = c.NumberOfSeats.Id,
                    Seats = c.NumberOfSeats.Number
                } : null,
                FuelTypes = c.FuelTypes != null ? new FuelTypesDto
                {
                    Id = c.FuelTypes.Id,
                    Name = c.FuelTypes.Name
                } : null,
                EngineVolume = c.EngineVolume != null ? new EngineVolumeDto
                {
                    Id = c.EngineVolume.Id,
                    Volume = c.EngineVolume.Volume
                } : null,
                City = c.City != null ? new CityDto
                {
                    Id = c.City.Id,
                    Name = c.City.Name
                } : null,
                Price = c.Price != null ? new PriceDto
                {
                    Id = c.Price.Id,
                    Amount = c.Price.Amount
                } : null,
                Color = c.Color != null ? new ColorDto
                {
                    Id = c.Color.Id,
                    ColorName = c.Color.Color
                } : null,
                Metallic = c.Metallic,
                AccidentParticipation = c.AccidentParticipation,
                //Photos = c.Photos.Select(p => new CarPhotoDto
                //{
                //    Id = p.Id,
                //    PhotoUrl = p.PhotoUrl
                //}).ToList()
            }).ToList();

            return carDtos;
        }

        // GET: api/car/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CarDto>> GetCar(int id)
        {
            var car = await _context.Cars
                .Include(c => c.TransportType)
                .Include(c => c.CarBrand)
                .Include(c => c.BodyType)
                .Include(c => c.TransmissionType)
                .Include(c => c.NumberOfSeats)
                .Include(c => c.FuelTypes)
                .Include(c => c.EngineVolume)
                .Include(c => c.City)
                .Include(c => c.Price)
                .Include(c => c.Color)
                //.Include(c => c.Photos)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (car == null)
            {
                return NotFound();
            }

            var carDto = new CarDto
            {
                Id = car.Id,
                Year = car.Year,
                Model = car.Model,
                Manufacturer = car.Manufacturer,
                Mileage = car.Mileage,
                VIN = car.VIN,
                Stage = car.Stage,
                Description = car.Description,
                TransportType = car.TransportType != null ? new TransportTypeDto
                {
                    Id = car.TransportType.Id,
                    Name = car.TransportType.Name
                } : null,
                CarBrand = car.CarBrand != null ? new CarBrandDto
                {
                    Id = car.CarBrand.Id,
                    Name = car.CarBrand.Name,
                    CarModel = car.CarBrand.CarModel
                } : null,
                BodyType = car.BodyType != null ? new BodyTypeDto
                {
                    Id = car.BodyType.Id,
                    Name = car.BodyType.Name
                } : null,
                TransmissionType = car.TransmissionType != null ? new TransmissionTypeDto
                {
                    Id = car.TransmissionType.Id,
                    Type = car.TransmissionType.Name
                } : null,
                NumberOfSeats = car.NumberOfSeats != null ? new NumberOfSeatsDto
                {
                    Id = car.NumberOfSeats.Id,
                    Seats = car.NumberOfSeats.Number
                } : null,
                FuelTypes = car.FuelTypes != null ? new FuelTypesDto
                {
                    Id = car.FuelTypes.Id,
                    Name = car.FuelTypes.Name
                } : null,
                EngineVolume = car.EngineVolume != null ? new EngineVolumeDto
                {
                    Id = car.EngineVolume.Id,
                    Volume = car.EngineVolume.Volume
                } : null,
                City = car.City != null ? new CityDto
                {
                    Id = car.City.Id,
                    Name = car.City.Name
                } : null,
                Price = car.Price != null ? new PriceDto
                {
                    Id = car.Price.Id,
                    Amount = car.Price.Amount
                } : null,
                Color = car.Color != null ? new ColorDto
                {
                    Id = car.Color.Id,
                    ColorName = car.Color.Color
                } : null,
                Metallic = car.Metallic,
                AccidentParticipation = car.AccidentParticipation,
                //Photos = car.Photos.Select(p => new CarPhotoDto
                //{
                //    Id = p.Id,
                //    PhotoUrl = p.PhotoUrl
                //}).ToList()
            };

            return carDto;
        }

        // POST: api/car
        [HttpPost]
        public async Task<ActionResult<CarEntity>> CreateCar(CreateCarDto carDto)
        {
            var car = new CarEntity
            {
                Year = carDto.Year,
                Model = carDto.Model,
                Manufacturer = carDto.Manufacturer,
                Mileage = carDto.Mileage,
                VIN = carDto.VIN,
                Stage = carDto.Stage,
                Description = carDto.Description,
                TransportType = carDto.TransportTypeId.HasValue ? await _context.TransportTypes.FindAsync(carDto.TransportTypeId.Value) : null,
                CarBrand = carDto.CarBrandId.HasValue ? await _context.Brands.FindAsync(carDto.CarBrandId.Value) : null,
                BodyType = carDto.BodyTypeId.HasValue ? await _context.BodyTypes.FindAsync(carDto.BodyTypeId.Value) : null,
                TransmissionType = carDto.TransmissionTypeId.HasValue ? await _context.TransmissionTypes.FindAsync(carDto.TransmissionTypeId.Value) : null,
                NumberOfSeats = carDto.NumberOfSeatsId.HasValue ? await _context.numbersOfSeats.FindAsync(carDto.NumberOfSeatsId.Value) : null,
                FuelTypes = carDto.FuelTypeId.HasValue ? await _context.FuelTypes.FindAsync(carDto.FuelTypeId.Value) : null,
                EngineVolume = carDto.EngineVolumeId.HasValue ? await _context.EngineVolumes.FindAsync(carDto.EngineVolumeId.Value) : null,
                City = carDto.CityId.HasValue ? await _context.Cities.FindAsync(carDto.CityId.Value) : null,
                Price = carDto.PriceId.HasValue ? await _context.Prices.FindAsync(carDto.PriceId.Value) : null,
                Color = carDto.ColorId.HasValue ? await _context.Colors.FindAsync(carDto.ColorId.Value) : null,
                Metallic = carDto.Metallic,
                AccidentParticipation = carDto.AccidentParticipation
            };

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCar), new { id = car.Id }, car);
        }
    }
}
