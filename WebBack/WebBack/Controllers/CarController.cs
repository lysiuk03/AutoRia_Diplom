using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebBack.Data.Entities;
using WebBack.Data;
using WebBack.Services.ControllerServices.Interfaces;
using WebBack.Services.Interfaces;
using WebBack.ViewModels.Car;
using WebBack.ViewModels;
using WebBack.SearchReauestClasses;
using WebBack.ViewModels.BodyType;
using WebBack.ViewModels.Brand;
using WebBack.ViewModels.EngineVolume;
using WebBack.ViewModels.Model;
using WebBack.ViewModels.NumberOfSeats;
using WebBack.ViewModels.Region_City;
using WebBack.ViewModels.TransmissionType;
using WebBack.ViewModels.TransportType;
using WebBack.ViewModels.Account;


namespace WebBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly CarDbContext _context;
        //private readonly IValidator<CarCreateVm> _createValidator;
        private readonly ICarControllerService _service;

        public CarController(
            IMapper mapper,
            CarDbContext context,
            //IValidator<CarCreateVm> createValidator,
            ICarControllerService service)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _context = context ?? throw new ArgumentNullException(nameof(context));
            //_createValidator = createValidator ?? throw new ArgumentNullException(nameof(createValidator));
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // POST: api/Car/search
        [HttpPost("search")]
        public async Task<IActionResult> SearchCars([FromBody] CarSearchRequest searchRequest)
        {
            if (searchRequest == null)
            {
                return BadRequest("Invalid search request.");
            }

            try
            {
                // Ваш код для пошуку автомобілів за заданими параметрами
                var cars = await _service.SearchAsync(searchRequest); // Ви повинні реалізувати метод SearchAsync у вашому сервісі
                return Ok(cars);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        // GET: api/Car
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarVm>>> GetCars()
        {
            var cars = await _context.Cars
                .ProjectTo<CarVm>(_mapper.ConfigurationProvider)
                .ToArrayAsync();
            return Ok(cars);
        }

        // GET: api/Car/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CarVm>> GetCar(int id)
        {
            var carUser = await _context.UserCars.Where(uc=>uc.CarId == id).FirstOrDefaultAsync();

            var car = await _context.Cars
                .Where(c => c.Id == id)
                .ProjectTo<CarVm>(_mapper.ConfigurationProvider) // Project to CarVm using AutoMapper
                .FirstOrDefaultAsync();
            car.user = _context.Users
                .Where(u=>u.Id == carUser.UserId)
                .ProjectTo<ProfileVm>(_mapper.ConfigurationProvider).FirstOrDefault();

            if (car == null)
            {
                return NotFound();
            }

            // Map the car entity to a CarVm using AutoMapper
            var carVm = _mapper.Map<CarVm>(car);

            // Return the CarVm
            return Ok(car);
        }

        // POST: api/Car
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CarCreateVm vm, int UserID)
        {
            // var validationResult = await _createValidator.ValidateAsync(vm);
            //
            // if (!validationResult.IsValid)
            //     return BadRequest(validationResult.Errors);

            try
            {
                await _service.CreateAsync(vm,UserID);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT: api/Car/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromForm] CarEditVm vm)
        {
            try
            {
                await _service.UpdateAsync(vm);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE: api/Car/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarExists(int id)
        {
            return _context.Cars.Any(e => e.Id == id);
        }

        // GET: api/cars/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<CarVm>>> GetCarsByUserId(int userId)
        {

            


            // Check if the user exists
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound($"User with ID {userId} not found.");
            }


            var userCars = await _context.UserCars
                .Where(uc => uc.UserId == userId)
                .Select(uc => uc.CarId) // вибираємо тільки CarId
                .ToListAsync();

            var cars = await _context.Cars
                .Where(c => userCars.Contains(c.Id)) // відбираємо машини, де Id входить у список
                .ProjectTo<CarVm>(_mapper.ConfigurationProvider) // проекція у CarVm
                .ToArrayAsync();


            return Ok(cars);
        }

    }
}
