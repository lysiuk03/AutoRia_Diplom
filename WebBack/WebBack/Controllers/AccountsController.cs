using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebBack.Constants;
using WebBack.Data.Entities.Identity;
using WebBack.Services.ControllerServices.Interfaces;
using WebBack.Services.Interfaces;
using WebBack.ViewModels.Account;

namespace WebBack.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IJwtTokenService jwtTokenService;
        private readonly IAccountsControllerService service;
        private readonly UserManager<UserEntity> userManager;

        public AccountsController(
            IJwtTokenService jwtTokenService,
            IAccountsControllerService service,
            UserManager<UserEntity> userManager)
        {
            this.jwtTokenService = jwtTokenService;
            this.service = service;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody] SignInVm model)
        {
            UserEntity? user = await userManager.FindByEmailAsync(model.Email);

            if (user is null || !await userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized("Wrong authentication data");

            return Ok(new JwtTokenResponse
            {
                Token = await jwtTokenService.CreateTokenAsync(user)
            });
        }

        [HttpPost]
        public async Task<IActionResult> Registration([FromForm] RegisterVm vm)
        {
            try
            {
                var user = await service.SignUpAsync(vm);

                return Ok(new JwtTokenResponse
                {
                    Token = await jwtTokenService.CreateTokenAsync(user)
                });
            }
            catch (Exception ex)
            {
                // Log the exception (optional, depending on your logging strategy)
                // _logger.LogError(ex, "Error occurred during user registration.");

                return StatusCode(500, $"Exception creating user: {ex.Message}");
            }
        }
    }
}
