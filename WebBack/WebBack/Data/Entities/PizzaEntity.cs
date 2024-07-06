using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Metrics;

namespace WebBack.Data.Entities;

[Table("tbl_pizzas")]
public class PizzaEntity : BaseEntity
{
    [StringLength(255), Required]
    public string Name { get; set; } = null!;

    [StringLength(500)]
    public string Description { get; set; } = null!;

    [Range(0, 5)]
    public double Rating { get; set; }

    [Required]
    public bool IsAvailable { get; set; }

    public int CategoryId { get; set; }
    public CategoryEntity Category { get; set; } = null!;

    public ICollection<PizzaPhotoEntity> Photos { get; set; } = new List<PizzaPhotoEntity>();
    public List<PizzaIngredientEntity> Ingredients { get; set; } = new List<PizzaIngredientEntity>();
    public List<PizzaSizePriceEntity> Sizes { get; set; } = new List<PizzaSizePriceEntity>();
}
