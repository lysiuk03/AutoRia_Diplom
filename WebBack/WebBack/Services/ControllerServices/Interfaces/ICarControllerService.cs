
using WebBack.ViewModels.Car;

namespace WebBack.Services.ControllerServices.Interfaces
{
    public interface ICarControllerService
    {
        Task CreateAsync(CarCreateVm vm);
        // Task UpdateAsync(EditVm vm);
        // Task DeleteIfExistsAsync(int id);
    }
}