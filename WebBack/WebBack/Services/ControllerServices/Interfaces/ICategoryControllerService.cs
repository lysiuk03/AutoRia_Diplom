using WebBack.ViewModels.Category;

namespace WebBack.Services.ControllerServices.Interfaces;

public interface ICategoryControllerService
{
    Task CreateAsync(CategoryCreateVm vm);
    Task UpdateAsync(CategoryEditVm vm);
    Task DeleteIfExistsAsync(int id);
}
