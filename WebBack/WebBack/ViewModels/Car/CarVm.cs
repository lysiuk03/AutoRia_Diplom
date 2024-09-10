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


        public string? TransmissionType { get; set; }
        public int? NumberOfSeats { get; set; }
        public string? FuelTypes { get; set; }
        public decimal? EngineVolume { get; set; }
        public string? City { get; set; }
        public decimal? Price { get; set; }
        public string? Color { get; set; }
        public bool Metallic { get; set; }
        public bool AccidentParticipation { get; set; }


        public DateTime DateCreated { get; set; } // Assuming CarEntity has a DateCreated property in BaseEntity
    }
}