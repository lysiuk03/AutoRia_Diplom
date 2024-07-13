using System.ComponentModel.DataAnnotations;

namespace WebBack.Data.Entities
{
    public class RegionEntity : BaseEntity 
    {
        [StringLength(255), Required]
        public string Name { get; set; } = null!;

        public ICollection<CityEntity> Cities { get; set; } = null!;
    }
}
