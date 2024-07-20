namespace WebBack.ViewModels.Car
{
    public class CarVm
    {
        public int Id { get; set; } // Assuming CarEntity has an Id property in BaseEntity
        public string Model { get; set; } = null!;
        public string Manufacturer { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Stage { get; set; } = null!;
        public decimal Mileage { get; set; }
        public string VIN { get; set; } = null!;
        public IEnumerable<CarPhotoVm> Photos { get; set; } = new List<CarPhotoVm>();

        public DateTime DateCreated { get; set; } // Assuming CarEntity has a DateCreated property in BaseEntity
    }
}