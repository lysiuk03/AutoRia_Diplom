
using WebBack.ViewModels.Car;
using WebBack.ViewModels;
using WebBack.SearchRequestClasses;

namespace WebBack.Services.ControllerServices.Interfaces
{
    public interface ICarControllerService
    {
        Task CreateAsync(CarCreateVm vm);
        Task UpdateAsync(CarEditVm vm);
        Task<IEnumerable<CarVm>> SearchAsync(CarSearchRequest? searchRequest);
        // Task DeleteIfExistsAsync(int id);
    }
}