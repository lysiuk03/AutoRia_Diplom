using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    [Table("tbl_cars")]
    public class CarEntity : BaseEntity
    {

        [Required]
        [Range(1886, 2024)]
        public int Year { get; set; }

        [StringLength(255), Required]
        public string Model { get; set; } = null!;

        [StringLength(255), Required]
        public string Manufacturer { get; set; } = null!;

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

   

        //possible entity 



        public ICollection<CarPhotoEntity> Photos { get; set; } = new List<CarPhotoEntity>();

        //Base options
        public TransportTypeEntity ?TransportType { get; set; }
        public CarModelEntity? CarModel { get; set; }//CarBrand inside
        public BodyTypeEntity ?BodyType { get; set; }


        //_______________________________________________________________
        public TransmissionTypeEntity ?TransmissionType { get; set; }
        public NumberOfSeatsEntity ?NumberOfSeats { get; set; }
        public FuelTypesEntity ?FuelTypes { get; set; }
        public EngineVolumeEntity ?EngineVolume { get; set; }


        //Region and parcing
        public CityEntity? City { get; set; }//Region inside
        public PriceEntity? Price { get; set; }


        //Appearance
        public ColorEntity ?Color { get; set; }
        public bool Metallic { get; set; } = false!;
        public bool AccidentParticipation { get; set; } = false!;


    }
}
