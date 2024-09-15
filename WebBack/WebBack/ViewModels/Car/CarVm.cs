using WebBack.Data.Entities;
using WebBack.ViewModels.Brand;
using WebBack.ViewModels.EngineVolume;
using WebBack.ViewModels.Model;
using WebBack.ViewModels.NumberOfSeats;
using WebBack.ViewModels.Region_City;
using WebBack.ViewModels.TransmissionType;

namespace WebBack.ViewModels.Car
{
    public class CarVm
    {
        public int Id { get; set; } // Assuming CarEntity has an Id property in BaseEntity
        public CarModelVm CarModel { get; set; }
        public CarBrandCutVm CarBrand { get; set; }
        public string Description { get; set; } = null!;
        public string Stage { get; set; } = null!;
        public decimal Mileage { get; set; }
        public string VIN { get; set; } = null!;
        public IEnumerable<CarPhotoVm> Photos { get; set; } = new List<CarPhotoVm>();


        public TransmissionTypeVm TransmissionType { get; set; }
        public NumberOfSeatsVm NumberOfSeats { get; set; }
        public FuelTypesEntity FuelTypes { get; set; }
        public EngineVolumeVm EngineVolume { get; set; }
        public CityVm City { get; set; }
        public decimal? Price { get; set; }
        public ColorEntity Color { get; set; }
        public bool Metallic { get; set; }
        public bool AccidentParticipation { get; set; }


        public DateTime DateCreated { get; set; } // Assuming CarEntity has a DateCreated property in BaseEntity
    }
}