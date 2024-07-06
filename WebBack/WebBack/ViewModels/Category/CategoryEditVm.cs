namespace WebBack.ViewModels.Category;

public class CategoryEditVm
{
    public int Id { get; set; }

    public string? Name { get; set; } = null!;

    public IFormFile? Image { get; set; } = null!;
}
