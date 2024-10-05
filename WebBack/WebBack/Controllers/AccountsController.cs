using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebBack.Constants;
using WebBack.Data.Entities.Identity;
using WebBack.Services.ControllerServices.Interfaces;
using WebBack.Services.Interfaces;
using WebBack.ViewModels.Account;
using WebBack.SearchReauestClasses;
namespace WebBack.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IJwtTokenService jwtTokenService;
        private readonly IAccountsControllerService service;
        private readonly UserManager<UserEntity> userManager;
        private readonly SignInManager<UserEntity> signInManager;

        public AccountsController(
            IJwtTokenService jwtTokenService,
            IAccountsControllerService service,
            UserManager<UserEntity> userManager)
        {
            this.jwtTokenService = jwtTokenService;
            this.service = service;
            this.userManager = userManager;
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await service.SignOutAsync();
            return Ok("Успішний вихід");
        }

        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody] SignInVm model)
        {
            UserEntity? user = await userManager.FindByEmailAsync(model.Email);

            if (user is null || !await userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized("Невірні дані");

            // Генеруємо токен
            var token = await jwtTokenService.CreateTokenAsync(user);

            // Зберігаємо токен у таблиці AspNetUserTokens
            await userManager.SetAuthenticationTokenAsync(user, "JWT", "AccessToken", token);

            return Ok(new JwtTokenResponse
            {
                Token = token
            });
        }

        [HttpPost]
        public async Task<IActionResult> Registration([FromForm] RegisterVm vm)
        {
            try
            {
                var user = await service.SignUpAsync(vm);

                // Генеруємо токен
                var token = await jwtTokenService.CreateTokenAsync(user);

                // Зберігаємо токен у таблиці AspNetUserTokens
                await userManager.SetAuthenticationTokenAsync(user, "JWT", "AccessToken", token);

                return Ok(new JwtTokenResponse
                {
                    Token = token
                });
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(new { Message = "Registration failed: Missing required fields.", Details = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception (optional, depending on your logging strategy)
                // _logger.LogError(ex, "Error occurred during user registration.");

                return StatusCode(500, new { Message = "An error occurred during user registration.", Details = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = userManager.Users.ToList();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound(new { Message = "User not found." });

            return Ok(user);
        }


        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserProfileModel model)
        {
            // Отримання поточного користувача
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound("Користувач не знайдений");
            }

            // Оновлення полів користувача
            user.FirstName = model.FirstName;
            user.MiddleName = model.MiddleName;
            user.LastName = model.LastName;
            user.City = model.City;
            user.Region = model.Region;
            user.Photo = model.Photo;
            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;
            user.UserName = model.UserName;
            // Оновлення рейтингу, якщо необхідно
            //user.Rating = model.Rating;

            // Спроба збереження змін
            var result = await userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                // Якщо щось пішло не так, повертаємо помилки
                return BadRequest(result.Errors);
            }

            // Якщо зміни успішно застосовані, оновлюємо сесію користувача (якщо необхідно)
            await signInManager.RefreshSignInAsync(user);

            return Ok("Профіль успішно оновлено");
        }
    }
}
