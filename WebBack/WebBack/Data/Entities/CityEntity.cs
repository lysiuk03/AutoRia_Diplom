using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    [Table("tbl_cities")]
    public class CityEntity : BaseEntity
    {
        [StringLength(255), Required]
        public string Name { get; set; } = null!;

        public int RegionId {  get; set; }

        public RegionEntity Region { get; set; } = null!;
    }
}
