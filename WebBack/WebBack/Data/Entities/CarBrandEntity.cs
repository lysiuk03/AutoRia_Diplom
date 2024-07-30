using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    [Table("tbl_car_brands")]
    public class CarBrandEntity : BaseEntity
    {
        [StringLength(255), Required]
        public string Name { get; set; } = null!;

        public ICollection<BrandPhotoEntity> Photos { get; set; } = new List<BrandPhotoEntity>();
        public ICollection<CarModelEntity> Models { get; set; } = null!;
    }
}
