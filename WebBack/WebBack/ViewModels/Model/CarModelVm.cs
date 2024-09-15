namespace WebBack.ViewModels.Model
{
    public class CarModelVm
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int CarBrandId { get; set; }
        public string CarBrandName { get; set; } = null!;
    }
}
