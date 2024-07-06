using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{

    [Table("tbl_pizza_sizes")]
    public class PizzaSizePriceEntity : BaseEntity
    {
        public int PizzaId { get; set; }
        public PizzaEntity Pizza { get; set; } = null!;

        public int SizeId { get; set; }
        public PizzaSizeEntity Size { get; set; } = null!;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
    }
}
