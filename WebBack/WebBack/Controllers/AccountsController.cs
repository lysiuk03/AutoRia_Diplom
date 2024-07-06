using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebBack.Constants;
using WebBack.Data.Entities.Identity;
using WebBack.Services.ControllerServices.Interfaces;
using WebBack.Services.Interfaces;
using WebBack.ViewModels.Account;
using WebBack.Services;

namespace WebBack.Controllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountsController(
        IJwtTokenService jwtTokenService,
        IAccountsControllerService service,
        UserManager<UserEntity> userManager
    ) : ControllerBase
    {
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
            catch (Exception)
            {
                return StatusCode(500, "Exception create user!");
            }
        }

    }
}
