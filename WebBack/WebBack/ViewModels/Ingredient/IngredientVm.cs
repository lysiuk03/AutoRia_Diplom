namespace WebBack.ViewModels.Ingredient
{
    public class IngredientVm
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Image { get; set; } = null!;
        public DateTime DateCreated { get; set; }
    }
}
