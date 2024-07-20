using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    [Table("tbl_car_models")]
    public class CarModelEntity : BaseEntity
    {
        [StringLength(255), Required]
        public string Name { get; set; } = null!;

        public int CarBrandId { get; set; }

        public CarBrandEntity CarBrand { get; set; } = null!;

    }
}
