using WebBack.ViewModels.Category;
using WebBack.ViewModels.Ingredient;

namespace WebBack.Services.ControllerServices.Interfaces
{
    public interface IIngredientControllerService
    {
        Task CreateAsync(IngredientCreateVm vm);
        Task UpdateAsync(IngredientEditVm vm);
        Task DeleteIfExistsAsync(int id);
    }
}
