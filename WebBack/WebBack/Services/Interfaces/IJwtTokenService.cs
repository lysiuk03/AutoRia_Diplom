using WebBack.Data.Entities.Identity;

namespace WebBack.Services.Interfaces;

public interface IJwtTokenService
{
    Task<string> CreateTokenAsync(UserEntity user);
}
