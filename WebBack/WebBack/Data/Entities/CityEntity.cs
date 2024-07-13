using System.ComponentModel.DataAnnotations;

namespace WebBack.Data.Entities
{
    public class CityEntity : BaseEntity
    {
        [StringLength(255), Required]
        public string Name { get; set; } = null!;

        public int RegionId {  get; set; }

        public RegionEntity Region { get; set; } = null!;
    }
}
