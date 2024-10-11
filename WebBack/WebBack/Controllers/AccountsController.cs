using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebBack.Constants;
using WebBack.Data.Entities.Identity;
using WebBack.Services.ControllerServices.Interfaces;
using WebBack.Services.Interfaces;
using WebBack.ViewModels.Account;
using WebBack.SearchReauestClasses;
using Microsoft.EntityFrameworkCore;
using WebBack.Data;
using WebBack.Services;
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
        private readonly CarDbContext context;
        private readonly IImageService imageService;

        public AccountsController(
            IJwtTokenService jwtTokenService,
            IAccountsControllerService service,
            CarDbContext context,
            SignInManager<UserEntity> signInManager,
            IImageService imageService,
            UserManager<UserEntity> userManager)
        {
            this.jwtTokenService = jwtTokenService;
            this.service = service;
            this.userManager = userManager;
            this.context = context;
            this.imageService = imageService;
            this.signInManager = signInManager;
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

        [HttpGet("{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound(new { Message = "User not found." });

            return Ok(user);
            
        }


        [HttpPost("update-profile/{userId}")]
        public async Task<IActionResult> UpdateProfile(string userId, [FromForm] UpdateUserProfileModel model)
        {
            if (model == null)
            {
                return BadRequest("Дані профілю не можуть бути порожніми");
            }

            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("Користувач не знайдений");
            }

            user.FirstName = model.FirstName ?? user.FirstName;
            user.MiddleName = model.MiddleName ?? user.MiddleName;
            user.LastName = model.LastName ?? user.LastName;
            


            // Find the city that matches the provided city name
            var cityEntity = await context.Cities
                .Include(c => c.Region) // Ensure the region is included
                .FirstOrDefaultAsync(c => c.Name == model.City);

            if (cityEntity != null)
            {
                user.City = cityEntity.Name; // Assign the city entity
                user.Region = cityEntity.Region.Name; // Assign the region associated with the city
            }
            else { user.City = "Вказано не вірно"; user.Region = "Вказано не вірно"; }

            if (model.Photo != null)
            {
                user.Photo = await imageService.SaveImageAsync(model.Photo);
            }
                user.Email = model.Email ?? user.Email;
            user.PhoneNumber = model.PhoneNumber ?? user.PhoneNumber;
            user.UserName = model.UserName ?? user.UserName;

            var result = await userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            if (signInManager != null)
            {
                await signInManager.RefreshSignInAsync(user);
            }

            return Ok("Профіль успішно оновлено");


        }
        
        [HttpPut("update-password/{id}")]
        public async Task<IActionResult> UpdatePassword(string id, [FromBody] UpdatePasswordModel model)
        {
            // Отримання користувача за ID
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound("Користувача не знайдено");
            }

            // Спроба зміни пароля
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var resetPasswordResult = await userManager.ResetPasswordAsync(user, token, model.NewPassword);
    
            if (!resetPasswordResult.Succeeded)
            {
                // Якщо щось пішло не так, повертаємо помилки
                return BadRequest(resetPasswordResult.Errors);
            }

            // Якщо зміни успішно застосовані
            return Ok("Пароль успішно оновлено");
        }
        


    }
}
