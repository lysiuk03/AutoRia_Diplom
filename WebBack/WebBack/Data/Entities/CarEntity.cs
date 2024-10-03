using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebBack.Data.Entities.Identity;

namespace WebBack.Data.Entities
{
    [Table("tbl_cars")]
    public class CarEntity : BaseEntity
    {

        [Required]
        [Range(1886, 2024)]
        public int Year { get; set; }

        //[StringLength(255), Required]
        //public string Model { get; set; } = null!;

        //[StringLength(255), Required]
        //public string Manufacturer { get; set; } = null!;
        public CarBrandEntity? CarBrand { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        [Range(0, 9999)]
        public decimal Mileage { get; set; }

        [StringLength(17)]
        public string VIN { get; set; } = null!;

        [StringLength(50)]
        public string Stage { get; set; } = null!;


        [StringLength(2000)]
        public string Description { get; set; } = null!;


        // Зв'язок через UserCarEntity
        public virtual ICollection<UserCarEntity> UserCars { get; set; } = new List<UserCarEntity>();


        public ICollection<CarPhotoEntity> Photos { get; set; } = new List<CarPhotoEntity>();

        //Base options
        public TransportTypeEntity? TransportType { get; set; }
        public CarModelEntity? CarModel { get; set; }//CarBrand inside
        public BodyTypeEntity? BodyType { get; set; }


        //_______________________________________________________________
        public TransmissionTypeEntity? TransmissionType { get; set; }
        public NumberOfSeatsEntity? NumberOfSeats { get; set; }
        public FuelTypesEntity? FuelTypes { get; set; }
        public EngineVolumeEntity? EngineVolume { get; set; }


        //Region and parcing
        public CityEntity? City { get; set; }//Region inside
        public decimal Price { get; set; }

        //Appearance
        public ColorEntity? Color { get; set; }
        public bool Metallic { get; set; } = false!;
        public bool AccidentParticipation { get; set; } = false!;

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

        public int Likes {  get; set; } = 0;
        public int Views { get; set; } = 0;
    }
}
