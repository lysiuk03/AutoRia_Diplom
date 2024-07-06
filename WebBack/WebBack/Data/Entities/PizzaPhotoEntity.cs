using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{

    [Table("tbl_pizza_photos")]

    public class PizzaPhotoEntity : BaseEntity
    {
        public string Name { get; set; } = null!;

        public int Priority { get; set; }

        public int PizzaId { get; set; }

        public PizzaEntity Pizza { get; set; } = null!;
    }
}
