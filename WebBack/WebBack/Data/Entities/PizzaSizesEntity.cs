using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebBack.Data.Entities
{
    [Table("tbl_sizes")]
    public class PizzaSizeEntity
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50), Required]
        public string Name { get; set; } = null!;

        public List<PizzaSizePriceEntity> PizzaSizePrices { get; set; } = new List<PizzaSizePriceEntity>();
    }
}
