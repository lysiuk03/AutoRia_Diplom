using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    [Table("tbl_regions")]
    public class RegionEntity : BaseEntity 
    {
        [StringLength(255), Required]
        public string Name { get; set; } = null!;

        public ICollection<CityEntity> Cities { get; set; } = null!;
    }
}
