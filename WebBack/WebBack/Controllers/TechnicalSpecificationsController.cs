using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebBack.Data;
using WebBack.Data.Entities;

namespace WebBack.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TechnicalSpecificationsController : ControllerBase
    {
        private readonly CarDbContext _context;

        public TechnicalSpecificationsController(CarDbContext context)
        {
            _context = context;
        }

        // GET: api/technicalspecifications/engine-volumes
        [HttpGet("engine-volumes")]
        public async Task<ActionResult<IEnumerable<EngineVolumeEntity>>> GetEngineVolumes()
        {
            return await _context.EngineVolumes.ToListAsync();
        }

        // GET: api/technicalspecifications/fuel-types
        [HttpGet("fuel-types")]
        public async Task<ActionResult<IEnumerable<FuelTypesEntity>>> GetFuelTypes()
        {
            return await _context.FuelTypes.ToListAsync();
        }

        // GET: api/technicalspecifications/transmission-types
        [HttpGet("transmission-types")]
        public async Task<ActionResult<IEnumerable<TransmissionTypeEntity>>> GetTransmissionTypes()
        {
            return await _context.TransmissionTypes.ToListAsync();
        }
    }
}
