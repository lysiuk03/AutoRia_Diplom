namespace WebBack.ViewModels.Region_City
{
    public class RegionVm
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public ICollection<CityVm> Cities { get; set; } = new List<CityVm>();
    }
}
