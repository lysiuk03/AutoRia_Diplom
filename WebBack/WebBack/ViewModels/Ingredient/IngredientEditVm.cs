namespace WebBack.ViewModels.Ingredient
{
    public class IngredientEditVm
    {
        public int Id { get; set; }

        public string? Name { get; set; } = null!;

        public IFormFile? Image { get; set; } = null!;
    }
}
