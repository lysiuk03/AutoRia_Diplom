using WebBack.Data.Entities.Identity;
using WebBack.ViewModels.Account;

namespace WebBack.Services.ControllerServices.Interfaces
{
    public interface IAccountsControllerService
    {
        Task<UserEntity> SignUpAsync(RegisterVm vm);
        Task SignOutAsync();
    }
}
