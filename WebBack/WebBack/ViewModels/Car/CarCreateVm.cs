namespace WebBack.ViewModels.Car
{
    public class CarCreateVm
    {

        public string Description { get; set; } = null!;
        public string Stage { get; set; } = null!;
        public decimal Mileage { get; set; }
        public string VIN { get; set; } = null!;
        public int Year { get; set; }
        public decimal Price { get; set; }
        
        
        public bool Metallic { get; set; } = false!;
        public bool AccidentParticipation { get; set; } = false!;
        public bool HasPowerWindows { get; set; } = false;
        public bool HasAirConditioning { get; set; } = false;
        public bool HasLeatherInterior { get; set; } = false;
        public bool HasPremiumInteriorColor { get; set; } = false;
        public bool HasPowerSteering { get; set; } = false;
        public bool HasHeightAdjustableSeats { get; set; } = false;
        public bool HasHeadlights { get; set; } = false;
        public bool HasSpareWheel { get; set; } = false;
        public bool HasSeatMemory { get; set; } = false;
        public bool HasHeatedSeats { get; set; } = false;
        public bool HasSeatVentilation { get; set; } = false;
        public bool IsNotCustomsCleared { get; set; } = false;
        public bool IsBargainAvailable { get; set; } = false;
        public bool IsExchangeAvailable { get; set; } = false;
        public bool IsInstallmentAvailable { get; set; } = false;


        // Відповідність властивостям зв'язків
        public int? CarBrandId { get; set; }
        public int? TransportTypeId { get; set; }
        public int? CarModelId { get; set; }
        public int? BodyTypeId { get; set; }
        public int? TransmissionTypeId { get; set; }
        public int? NumberOfSeatsId { get; set; }
        public int? FuelTypesId { get; set; }
        public int? EngineVolumeId { get; set; }
        public int? CityId { get; set; }
        public int? ColorId { get; set; }

        // List of photos
        public IEnumerable<IFormFile>? Photos { get; set; } = null!;
    }
}
