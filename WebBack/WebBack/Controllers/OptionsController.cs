using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebBack.Data;
using WebBack.Data.Entities;

[ApiController]
[Route("api/[controller]")]
public class OptionsController : ControllerBase
{
    private readonly CarDbContext _context;

    public OptionsController(CarDbContext context)
    {
        _context = context;
    }

    // GET: api/options/transport-types
    [HttpGet("transport-types")]
    public async Task<ActionResult<IEnumerable<TransportTypeEntity>>> GetTransportTypes()
    {
        return await _context.TransportTypes.ToListAsync();
    }

    // GET: api/options/car-brands
    [HttpGet("car-brands")]
    public async Task<ActionResult<IEnumerable<CarBrandEntity>>> GetCarBrands()
    {
        return await _context.Brands.ToListAsync();
    }

    // GET: api/options/body-types
    [HttpGet("body-types")]
    public async Task<ActionResult<IEnumerable<BodyTypeEntity>>> GetBodyTypes()
    {
        return await _context.BodyTypes.ToListAsync();
    }
}
