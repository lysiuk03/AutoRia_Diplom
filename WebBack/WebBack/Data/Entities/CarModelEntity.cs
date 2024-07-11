using System.ComponentModel.DataAnnotations;

namespace WebBack.Data.Entities
{
    public class CarModelEntity : BaseEntity
    {
        [StringLength(255), Required]
        public string Name { get; set; } = null!;

        public int CarBrandId { get; set; }

        public CarBrandEntity CarBrand { get; set; } = null!;

    }
}
