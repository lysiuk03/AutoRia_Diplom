using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebBack.Data.Entities;

[Table("tbl_ingredients")]
public class IngredientEntity : BaseEntity
{
    [StringLength(255), Required]
    public string Name { get; set; } = null!;

    [StringLength(255), Required]
    public string Image { get; set; } = null!;

    public ICollection<PizzaIngredientEntity> Pizzas { get; set; } = null!;
}
