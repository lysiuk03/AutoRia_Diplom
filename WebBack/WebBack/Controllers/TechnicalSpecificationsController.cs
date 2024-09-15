using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebBack.Data;
using WebBack.ViewModels.EngineVolume;
using WebBack.ViewModels.FuelTypeVm;
using WebBack.ViewModels.NumberOfSeats;
using WebBack.ViewModels.TransmissionType; // Assuming your entities are in this namespace

namespace WebBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TechnicalSpecificationsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly CarDbContext _context;
        public TechnicalSpecificationsController(
        IMapper mapper,
            CarDbContext context)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // GET: api/technicalspecifications/fueltypes
        [HttpGet("fueltypes")]
        public async Task<ActionResult<IEnumerable<FuelTypeVm>>> GetFuelTypes()
        {
            var fuelTypes = await _context.FuelTypes.ToListAsync();
            var fuelTypeVms = _mapper.Map<IEnumerable<FuelTypeVm>>(fuelTypes);

            return Ok(fuelTypeVms);
        }

        // GET: api/technicalspecifications/enginevolumes
        [HttpGet("enginevolumes")]
        public async Task<ActionResult<IEnumerable<EngineVolumeVm>>> GetEngineVolumes()
        {
            var engineVolumes = await _context.EngineVolumes.ToListAsync();
            var engineVolumeVms = _mapper.Map<IEnumerable<EngineVolumeVm>>(engineVolumes);

            return Ok(engineVolumeVms);
        }

        // GET: api/technicalspecifications/numberofseats
        [HttpGet("numberofseats")]
        public async Task<ActionResult<IEnumerable<NumberOfSeatsVm>>> GetNumberOfSeats()
        {
            var numberOfSeats = await _context.numbersOfSeats.ToListAsync();
            var numberOfSeatsVms = _mapper.Map<IEnumerable<NumberOfSeatsVm>>(numberOfSeats);

            return Ok(numberOfSeatsVms);
        }

        // GET: api/technicalspecifications/transmissiontypes
        [HttpGet("transmissiontypes")]
        public async Task<ActionResult<IEnumerable<TransmissionTypeVm>>> GetTransmissionTypes()
        {
            var transmissionTypes = await _context.TransmissionTypes.ToListAsync();
            var transmissionTypeVms = _mapper.Map<IEnumerable<TransmissionTypeVm>>(transmissionTypes);

            return Ok(transmissionTypeVms);
        }
    }
}
