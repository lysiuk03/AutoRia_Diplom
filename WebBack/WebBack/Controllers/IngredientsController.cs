using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebBack.Data;
using WebBack.Services.ControllerServices;
using WebBack.Services.ControllerServices.Interfaces;
using WebBack.Services.Interfaces;
using WebBack.ViewModels.Category;
using WebBack.ViewModels.Ingredient;

namespace WebBack.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class IngredientsController(IMapper mapper,
    PizzaDbContext pizzaContext,
    IValidator<IngredientCreateVm> createValidator,
    IIngredientControllerService service,
    IValidator<IngredientEditVm> editValidator
    ) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var list = await pizzaContext.Ingredients
                .ProjectTo<IngredientVm>(mapper.ConfigurationProvider)
                .ToArrayAsync();

            return Ok(list);
        }
        catch (Exception)
        {
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var ingredient = await pizzaContext.Ingredients
            .ProjectTo<IngredientVm>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (ingredient is null)
            return NotFound();

        return Ok(ingredient);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] IngredientCreateVm vm)
    {
        var validationResult = await createValidator.ValidateAsync(vm);

        if (!validationResult.IsValid)
            return BadRequest(validationResult.Errors);

        try
        {
            await service.CreateAsync(vm);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


    [HttpPatch]
    public async Task<IActionResult> Update([FromForm] IngredientEditVm vm)
    {
        var validationResult = await editValidator.ValidateAsync(vm);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        try
        {
            await service.UpdateAsync(vm);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await service.DeleteIfExistsAsync(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
