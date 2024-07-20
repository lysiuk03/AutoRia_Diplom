using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebBack.DTOs
{
    public class CarDto
    {
        public int Id { get; set; }

        [Required]
        [Range(1886, 2024)]
        public int Year { get; set; }

        [StringLength(255), Required]
        public string Model { get; set; } = null!;

        [StringLength(255), Required]
        public string Manufacturer { get; set; } = null!;

        [Required]
        [Range(0, 9999)]
        public decimal Mileage { get; set; }

        [StringLength(17)]
        public string VIN { get; set; } = null!;

        [StringLength(50)]
        public string Stage { get; set; } = null!;

        [StringLength(2000)]
        public string Description { get; set; } = null!;

        public TransportTypeDto? TransportType { get; set; }
        public CarModelDto? CarModel { get; set; }
        public BodyTypeDto? BodyType { get; set; }
        public TransmissionTypeDto? TransmissionType { get; set; }
        public NumberOfSeatsDto? NumberOfSeats { get; set; }
        public FuelTypesDto? FuelTypes { get; set; }
        public EngineVolumeDto? EngineVolume { get; set; }
        public CityDto? City { get; set; }
        public PriceDto? Price { get; set; }
        public ColorDto? Color { get; set; }

        public bool Metallic { get; set; }
        public bool AccidentParticipation { get; set; }

        public ICollection<CarPhotoDto> Photos { get; set; } = new List<CarPhotoDto>();

        public CarBrandDto CarBrand { get; set; }
    }

    public class TransportTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }

    public class CarBrandDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public ICollection<CarModelDto> CarModel { get; set; } = new List<CarModelDto>();
    }

    public class CarModelDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int CarBrandId { get; set; }
        public CarBrandDto CarBrand { get; set; } = null!;
    }

    public class BodyTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }

    public class TransmissionTypeDto
    {
        public int Id { get; set; }
        public string Type { get; set; } = null!;
    }

    public class NumberOfSeatsDto
    {
        public int Id { get; set; }
        public int Seats { get; set; }
    }

    public class FuelTypesDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }

    public class EngineVolumeDto
    {
        public int Id { get; set; }
        public decimal Volume { get; set; }
    }

    public class CityDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }

    public class PriceDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
    }

    public class ColorDto
    {
        public int Id { get; set; }
        public string ColorName { get; set; } = null!;
    }

    public class CarPhotoDto
    {
        public int Id { get; set; }
        public string PhotoUrl { get; set; } = null!;
    }



    public class CreateCarDto
    {
        [Required]
        [Range(1886, 2024)]
        public int Year { get; set; }

        [StringLength(255), Required]
        public string Model { get; set; } = null!;

        [StringLength(255), Required]
        public string Manufacturer { get; set; } = null!;

        [Required]
        [Range(0, 9999)]
        public decimal Mileage { get; set; }

        [StringLength(17)]
        public string VIN { get; set; } = null!;

        [StringLength(50)]
        public string Stage { get; set; } = null!;

        [StringLength(2000)]
        public string Description { get; set; } = null!;

        public int? TransportTypeId { get; set; }
        public int? CarBrandId { get; set; }
        public int? BodyTypeId { get; set; }
        public int? TransmissionTypeId { get; set; }
        public int? NumberOfSeatsId { get; set; }
        public int? FuelTypeId { get; set; }
        public int? EngineVolumeId { get; set; }
        public int? CityId { get; set; }
        public int? PriceId { get; set; }
        public int? ColorId { get; set; }

        public bool Metallic { get; set; }
        public bool AccidentParticipation { get; set; }
    }

}
