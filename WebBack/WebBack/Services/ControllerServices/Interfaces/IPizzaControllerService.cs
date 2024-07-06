using WebBack.ViewModels.Ingredient;
using WebBack.ViewModels.Pizza;

namespace WebBack.Services.ControllerServices.Interfaces
{
    public interface IPizzaControllerService
    {
        Task CreateAsync(PizzaCreateVm vm);
        Task UpdateAsync(PizzaEditVm vm);
        Task DeleteIfExistsAsync(int id);
    }
}
