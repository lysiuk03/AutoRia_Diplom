using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebBack.Data.Entities.Identity;
using WebBack.Services.Interfaces;

namespace WebBack.Services;

public class JwtTokenService(
  UserManager<UserEntity> userManager,
  IConfiguration configuration
  ) : IJwtTokenService
{
    public async Task<string> CreateTokenAsync(UserEntity user)
    {
        var key = Encoding.UTF8.GetBytes(
            configuration["Authentication:Jwt:SecretKey"]
                ?? throw new NullReferenceException("Authentication:Jwt:SecretKey")
        );

        int tokenLifetimeInDays = Convert.ToInt32(
            configuration["Authentication:Jwt:TokenLifetimeInDays"]
                ?? throw new NullReferenceException("Authentication:Jwt:TokenLifetimeInDays")
        );

        var signinKey = new SymmetricSecurityKey(key);

        var signinCredential = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

        var jwt = new JwtSecurityToken(
            signingCredentials: signinCredential,
            expires: DateTime.Now.AddDays(tokenLifetimeInDays),
            claims: await GetClaimsAsync(user));

        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }

    private async Task<List<Claim>> GetClaimsAsync(UserEntity user)
    {
        string userEmail = user.Email
            ?? throw new NullReferenceException($"User.Email");

        var userRoles = await userManager.GetRolesAsync(user);

        var roleClaims = userRoles
            .Select(r => new Claim(ClaimTypes.Role, r))
            .ToList();

        var claims = new List<Claim> {
            new ("id", user.Id.ToString()),
            new ("email", userEmail),
            new ("firstName", user.FirstName),
            new ("lastName", user.LastName),
            new ("photo", user.Photo)
        };
        claims.AddRange(roleClaims);

        return claims;
    }
}
