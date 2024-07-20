using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using WebBack.Data.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using WebBack.Data.Entities;

namespace WebBack.Data
{
    public class CarDbContext : IdentityDbContext<UserEntity, RoleEntity, int,
        IdentityUserClaim<int>, UserRoleEntity, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public CarDbContext(DbContextOptions<CarDbContext> options) : base(options) { }

        public DbSet<CarEntity> Cars { get; set; }
        public DbSet<BodyTypeEntity> BodyTypes { get; set; }
        public DbSet<CarBrandEntity> Brands { get; set; }
        public DbSet<CarModelEntity> Models { get; set; }
        public DbSet<ColorEntity> Colors { get; set; }
        public DbSet<EngineVolumeEntity> EngineVolumes { get; set; }
        public DbSet<FuelTypesEntity> FuelTypes { get; set; }
        public DbSet<NumberOfSeatsEntity> numbersOfSeats { get; set; }
        public DbSet<TransmissionTypeEntity> TransmissionTypes { get; set; }
        public DbSet<TransportTypeEntity> TransportTypes { get; set; }
        public DbSet<CarPhotoEntity> CarPhotos { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // UserRoleEntity builder
            modelBuilder.Entity<UserRoleEntity>(ur =>
            {
                ur.HasKey(ur => new { ur.UserId, ur.RoleId });
                ur.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(r => r.RoleId)
                    .IsRequired();
                ur.HasOne(ur => ur.User)
                    .WithMany(u => u.UserRoles)
                    .HasForeignKey(u => u.UserId)
                    .IsRequired();
            });
        }
    }

}
