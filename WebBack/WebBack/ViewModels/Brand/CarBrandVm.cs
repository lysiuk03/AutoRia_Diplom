using WebBack.ViewModels.Model;

namespace WebBack.ViewModels.Brand
{
    public class CarBrandVm
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public List<CarModelVm> Models { get; set; } = new();
    }
}
