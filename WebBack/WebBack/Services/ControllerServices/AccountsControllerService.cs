using AutoMapper;
using Microsoft.AspNetCore.Identity;
using WebBack.Constants;
using WebBack.Data;
using WebBack.Data.Entities.Identity;
using WebBack.Services.ControllerServices.Interfaces;
using WebBack.Services.Interfaces;
using WebBack.ViewModels.Account;

namespace WebBack.Services.ControllerServices;

public class AccountsControllerService(
    CarDbContext context,
    UserManager<UserEntity> userManager,
    IMapper mapper,
    IImageService imageService
     ) : IAccountsControllerService
{
    public async Task<UserEntity> SignUpAsync(RegisterVm vm)
    {
        UserEntity user = mapper.Map<RegisterVm, UserEntity>(vm);
        user.Photo = await imageService.SaveImageAsync(vm.Image);

        try
        {
            await CreateUserAsync(user, vm.Password);
        }
        catch
        {
            imageService.DeleteImageIfExists(user.Photo);
            throw;
        }

        return user;
    }

    private async Task CreateUserAsync(UserEntity user, string? password = null)
    {
        using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            IdentityResult identityResult = await CreateUserInDatabaseAsync(user, password);
            if (!identityResult.Succeeded)
                throw new Exception("User creating error");

            identityResult = await userManager.AddToRoleAsync(user, Roles.User);
            if (!identityResult.Succeeded)
                throw new Exception("Role assignment error");

            await transaction.CommitAsync();
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    private async Task<IdentityResult> CreateUserInDatabaseAsync(UserEntity user, string? password)
    {
        if (password is null)
            return await userManager.CreateAsync(user);

        return await userManager.CreateAsync(user, password);
    }
}
