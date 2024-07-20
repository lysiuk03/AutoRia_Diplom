
using WebBack.ViewModels.Car;
using WebBack.ViewModels;

namespace WebBack.Services.ControllerServices.Interfaces
{
    public interface ICarControllerService
    {
        Task CreateAsync(CarCreateVm vm);
        Task UpdateAsync(CarEditVm vm);
        // Task DeleteIfExistsAsync(int id);
    }
}