using Microsoft.AspNetCore.Identity;

namespace WebBack.Data.Entities.Identity;

public class UserEntity : IdentityUser<int>
{
    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? Photo { get; set; } = null!;

    public virtual ICollection<UserRoleEntity> UserRoles { get; set; } = null!;
}