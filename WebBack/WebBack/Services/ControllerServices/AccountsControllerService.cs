using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using WebBack.Constants;
using WebBack.Data;
using WebBack.Data.Entities.Identity;
using WebBack.Services.ControllerServices.Interfaces;
using WebBack.Services.Interfaces;
using WebBack.ViewModels.Account;

namespace WebBack.Services.ControllerServices;

public class AccountsControllerService : IAccountsControllerService
{
    private readonly CarDbContext context;
    private readonly UserManager<UserEntity> userManager;
    private readonly RoleManager<RoleEntity> roleManager; // Add RoleManager to manage roles
    private readonly IMapper mapper;
    private readonly IImageService imageService;
    private readonly ILogger<AccountsControllerService> logger;

    public AccountsControllerService(
        CarDbContext context,
        UserManager<UserEntity> userManager,
        RoleManager<RoleEntity> roleManager, // Inject RoleManager
        IMapper mapper,
        IImageService imageService,
        ILogger<AccountsControllerService> logger
    )
    {
        this.context = context;
        this.userManager = userManager;
        this.roleManager = roleManager; // Initialize RoleManager
        this.mapper = mapper;
        this.imageService = imageService;
        this.logger = logger;
    }

    public async Task<UserEntity> SignUpAsync(RegisterVm vm)
    {
        UserEntity user = mapper.Map<RegisterVm, UserEntity>(vm);

        try
        {
            user.Photo = await imageService.SaveImageAsync(vm.Image);
            await CreateUserAsync(user, vm.Password);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error occurred during user registration.");

            // Cleanup the image if user creation fails
            imageService.DeleteImageIfExists(user.Photo);

            // Rethrow the exception to be handled by the controller
            throw;
        }

        return user;
    }

    private async Task CreateUserAsync(UserEntity user, string? password = null)
    {
        using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            // Ensure the role exists before assigning it
            await EnsureRoleExistsAsync(Roles.User);

            IdentityResult identityResult = await CreateUserInDatabaseAsync(user, password);
            if (!identityResult.Succeeded)
            {
                var errors = string.Join(", ", identityResult.Errors.Select(e => e.Description));
                throw new Exception($"User creation error: {errors}");
            }

            identityResult = await userManager.AddToRoleAsync(user, Roles.User);
            if (!identityResult.Succeeded)
            {
                var errors = string.Join(", ", identityResult.Errors.Select(e => e.Description));
                throw new Exception($"Role assignment error: {errors}");
            }

            await transaction.CommitAsync();
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            logger.LogError(ex, "Transaction failed during user creation or role assignment.");
            throw;
        }
    }

    private async Task EnsureRoleExistsAsync(string roleName)
    {
        var roleExists = await roleManager.RoleExistsAsync(roleName);
        if (!roleExists)
        {
            var roleResult = await roleManager.CreateAsync(new RoleEntity { Name = roleName });
            if (!roleResult.Succeeded)
            {
                var errors = string.Join(", ", roleResult.Errors.Select(e => e.Description));
                throw new Exception($"Role creation error: {errors}");
            }
        }
    }

    private async Task<IdentityResult> CreateUserInDatabaseAsync(UserEntity user, string? password)
    {
        if (password is null)
            return await userManager.CreateAsync(user);

        return await userManager.CreateAsync(user, password);
    }
}
