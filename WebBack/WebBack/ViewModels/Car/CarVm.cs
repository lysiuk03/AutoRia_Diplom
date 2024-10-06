using WebBack.Data.Entities;
using WebBack.Data.Entities.Identity;
using WebBack.ViewModels.Account;
using WebBack.ViewModels.BodyType;
using WebBack.ViewModels.Brand;
using WebBack.ViewModels.EngineVolume;
using WebBack.ViewModels.Model;
using WebBack.ViewModels.NumberOfSeats;
using WebBack.ViewModels.Region_City;
using WebBack.ViewModels.TransmissionType;
using WebBack.ViewModels.TransportType;

namespace WebBack.ViewModels.Car
{
    public class CarVm
    {
        public int Year { get; set; }
        public int Id { get; set; } // Припускаючи, що CarEntity має властивість Id у BaseEntity
        public CarModelVm CarModel { get; set; } = null!;
        public CarBrandCutVm CarBrand { get; set; } = null!;
        public BodyTypeVm BodyType { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Stage { get; set; } = null!;
        public decimal Mileage { get; set; }
        public string VIN { get; set; } = null!;
        public IEnumerable<CarPhotoVm> Photos { get; set; } = new List<CarPhotoVm>();

        public TransmissionTypeVm TransmissionType { get; set; } = null!;
        public NumberOfSeatsVm NumberOfSeats { get; set; } = null!;
        public FuelTypesEntity FuelTypes { get; set; } = null!;
        public EngineVolumeVm EngineVolume { get; set; } = null!;
        public TransportTypeVm TransportType { get; set; } = null!;
        public CityVm City { get; set; } = null!;
        public decimal? Price { get; set; }
        public ColorEntity Color { get; set; } = null!;
        public bool Metallic { get; set; }
        public bool AccidentParticipation { get; set; }
        public bool HasPowerWindows { get; set; } = false; // Електросклопідйомники
        public bool HasAirConditioning { get; set; } = false; // Кондиціонер
        public bool HasLeatherInterior { get; set; } = false; // Матеріали салону
        public bool HasPremiumInteriorColor { get; set; } = false; // Колір салону
        public bool HasPowerSteering { get; set; } = false; // Підсилювач керма
        public bool HasHeightAdjustableSeats { get; set; } = false; // Регулювання сидіння салону по висоті
        public bool HasHeadlights { get; set; } = false; // Фари
        public bool HasSpareWheel { get; set; } = false; // Запасне колесо
        public bool HasSeatMemory { get; set; } = false; // Пам'ять положення сидіння
        public bool HasHeatedSeats { get; set; } = false; // Підігрів сидінь
        public bool HasSeatVentilation { get; set; } = false; // Вентиляція сидінь
        public bool IsNotCustomsCleared { get; set; } = false; // Нерозмитнений
        public bool IsBargainAvailable { get; set; } = false; // Можливий торг
        public bool IsExchangeAvailable { get; set; } = false; // Можливий обмін на авто
        public bool IsInstallmentAvailable { get; set; } = false;


        // Дата створення, припускаючи, що CarEntity має властивість DateCreated у BaseEntity
        public DateTime DateCreated { get; set; }
        public ProfileVm user { get; set; } = null!;
    }
}