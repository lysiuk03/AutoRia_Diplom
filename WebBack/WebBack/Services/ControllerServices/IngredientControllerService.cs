//using AutoMapper;
//using Microsoft.EntityFrameworkCore;
//using WebBack.Data;
//using WebBack.Data.Entities;
//using WebBack.Services.ControllerServices.Interfaces;
//using WebBack.Services.Interfaces;
//using WebBack.ViewModels.Ingredient;

//namespace WebBack.Services.ControllerServices;

//public class IngredientControllerService(
//    PizzaDbContext pizzaContext,
//    IMapper mapper,
//    IImageService imageService
//    ) : IIngredientControllerService
//{
//    public async Task CreateAsync(IngredientCreateVm vm)
//    {
//        var ingredient = mapper.Map<IngredientEntity>(vm);

//        try
//        {
//            ingredient.Image = await imageService.SaveImageAsync(vm.Image);
//            ingredient.DateCreated = DateTime.UtcNow;

//            await pizzaContext.Ingredients.AddAsync(ingredient);
//            await pizzaContext.SaveChangesAsync();
//        }
//        catch (Exception)
//        {
//            imageService.DeleteImageIfExists(ingredient.Image);
//            throw new Exception("Error ingredient created");
//        }
//    }

//    public async Task DeleteIfExistsAsync(int id)
//    {
//        var ingredient = await pizzaContext.Ingredients.FirstOrDefaultAsync(c => c.Id == id);

//        try
//        {
//            if (ingredient == null)
//            {
//                throw new Exception("Ingredient not found");
//            }

//            imageService.DeleteImageIfExists(ingredient.Image);
//            pizzaContext.Ingredients.Remove(ingredient);
//            await pizzaContext.SaveChangesAsync();
//        }
//        catch (Exception)
//        {
//            throw;
//        }
//    }

//    public async Task UpdateAsync(IngredientEditVm vm)
//    {
//        var ingredient = await pizzaContext.Ingredients.FirstOrDefaultAsync(c => c.Id == vm.Id);

//        try
//        {
//            if (ingredient == null)
//            {
//                throw new Exception("Category not found");
//            }

//            var oldImage = ingredient.Image;

//            if (vm.Name != null)
//            {
//                ingredient.Name = vm.Name;
//            }

//            if (vm.Image != null)
//            {
//                ingredient.Image = await imageService.SaveImageAsync(vm.Image);
//                imageService.DeleteImageIfExists(oldImage);
//            }

//            pizzaContext.Ingredients.Update(ingredient);
//            await pizzaContext.SaveChangesAsync();

//        }
//        catch (Exception)
//        {
//            imageService.DeleteImageIfExists(ingredient.Image);
//            throw;
//        }
//    }
//}
