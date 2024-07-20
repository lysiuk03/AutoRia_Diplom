namespace WebBack.ViewModels.Car
{
    public class CarCreateVm
    {
        public string Model { get; set; } = null!;
        public string Manufacturer { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Stage { get; set; } = null!;
        public decimal Mileage { get; set; }
        public string VIN { get; set; } = null!;

        // List of photos
        public IEnumerable<IFormFile>? Photos { get; set; } = null!;
    }
}