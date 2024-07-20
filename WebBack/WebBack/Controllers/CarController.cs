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
        public async Task<ActionResult<CarEntity>> GetCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        // POST: api/Car
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CarCreateVm vm)
        {
            // var validationResult = await _createValidator.ValidateAsync(vm);
            //
            // if (!validationResult.IsValid)
            //     return BadRequest(validationResult.Errors);

            try
            {
                await _service.CreateAsync(vm);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT: api/Car/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(int id, CarEntity car)
        {
            if (id != car.Id)
            {
                return BadRequest();
            }

            _context.Entry(car).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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
    }
}
