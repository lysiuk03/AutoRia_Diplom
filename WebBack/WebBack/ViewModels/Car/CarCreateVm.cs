namespace WebBack.ViewModels.Car
{
    public class CarCreateVm
    {

        public bool AccidentParticipation { get; set; }
        public string UserId { get; set; }
        public string BodyType { get; set; }
        public string CarBrand { get; set; }
        public string CarModel { get; set; }
        public string City { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public string EngineVolume { get; set; }
        public string FuelTypes { get; set; }
        public bool HasAirConditioning { get; set; }
        public bool HasHeadlights { get; set; }
        public bool HasHeatedSeats { get; set; }
        public bool HasHeightAdjustableSeats { get; set; }
        public bool HasLeatherInterior { get; set; }
        public bool HasPowerSteering { get; set; }
        public bool HasPowerWindows { get; set; }
        public bool HasPremiumInteriorColor { get; set; }
        public bool HasSeatMemory { get; set; }
        public bool HasSeatVentilation { get; set; }
        public bool HasSpareWheel { get; set; }
        public bool IsBargainAvailable { get; set; }
        public bool IsExchangeAvailable { get; set; }
        public bool IsInstallmentAvailable { get; set; }
        public bool IsNotCustomsCleared { get; set; }
        public bool Metallic { get; set; }
        public int Mileage { get; set; }
        public string NumberOfSeats { get; set; }
        public IEnumerable<IFormFile>? Photos { get; set; } 
        public decimal Price { get; set; }
        public string Stage { get; set; }
        public string TransmissionType { get; set; }
        public string TransportType { get; set; }
        public string Vin { get; set; }
        public int Year { get; set; }
    }
}
