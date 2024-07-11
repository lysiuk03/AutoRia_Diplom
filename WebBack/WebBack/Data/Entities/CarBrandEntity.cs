using System.ComponentModel.DataAnnotations;

namespace WebBack.Data.Entities
{
    public class CarBrandEntity : BaseEntity
    {
        [StringLength(255), Required]
        public string Name { get; set; } = null!;

        public ICollection<CarModelEntity> Models { get; set; } = null!;
    }
}
