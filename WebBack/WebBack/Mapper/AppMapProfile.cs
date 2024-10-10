using AutoMapper;
using WebBack.Data.Entities;
using WebBack.Data.Entities.Identity;
using WebBack.ViewModels.Account;
using WebBack.ViewModels.BodyType;
using WebBack.ViewModels.Brand;
using WebBack.ViewModels.Car;
using WebBack.ViewModels.EngineVolume;
using WebBack.ViewModels.FuelTypeVm;
using WebBack.ViewModels.Model;
using WebBack.ViewModels.NumberOfSeats;
using WebBack.ViewModels.Region_City;
using WebBack.ViewModels.TransmissionType;
using WebBack.ViewModels.TransportType;


namespace WebBack.Mapper;
public class AppMapProfile : Profile
{
    public AppMapProfile()
    {
        // User
        CreateMap<RegisterVm, UserEntity>();

        CreateMap<CarEntity, CarVm>()
    .ForMember(dest => dest.CarModel, opt => opt.MapFrom(src => src.CarModel))
    .ForMember(dest => dest.CarBrand, opt => opt.MapFrom(src => src.CarBrand))
    .ForMember(dest => dest.BodyType, opt => opt.MapFrom(src => src.BodyType))
    .ForMember(dest => dest.TransmissionType, opt => opt.MapFrom(src => src.TransmissionType))
    .ForMember(dest => dest.NumberOfSeats, opt => opt.MapFrom(src => src.NumberOfSeats))
    .ForMember(dest => dest.EngineVolume, opt => opt.MapFrom(src => src.EngineVolume))
    .ForMember(dest => dest.TransportType, opt => opt.MapFrom(src => src.TransportType))
    .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City))
    .ForMember(dest => dest.Photos, opt => opt.MapFrom(src => src.Photos))
    .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
    .ForMember(dest => dest.FuelTypes, opt => opt.MapFrom(src => src.FuelTypes))
    .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
    .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src => src.DateCreated))
    .ForMember(dest => dest.Stage, opt => opt.MapFrom(src => src.Stage))
    .ForMember(dest => dest.VIN, opt => opt.MapFrom(src => src.VIN))
    .ForMember(dest => dest.Mileage, opt => opt.MapFrom(src => src.Mileage))
    .ForMember(dest => dest.Metallic, opt => opt.MapFrom(src => src.Metallic))
    .ForMember(dest => dest.AccidentParticipation, opt => opt.MapFrom(src => src.AccidentParticipation))
    .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
    .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year))

    // New fields mapping
    .ForMember(dest => dest.HasPowerWindows, opt => opt.MapFrom(src => src.HasPowerWindows))
    .ForMember(dest => dest.HasAirConditioning, opt => opt.MapFrom(src => src.HasAirConditioning))
    .ForMember(dest => dest.HasLeatherInterior, opt => opt.MapFrom(src => src.HasLeatherInterior))
    .ForMember(dest => dest.HasPremiumInteriorColor, opt => opt.MapFrom(src => src.HasPremiumInteriorColor))
    .ForMember(dest => dest.HasPowerSteering, opt => opt.MapFrom(src => src.HasPowerSteering))
    .ForMember(dest => dest.HasHeightAdjustableSeats, opt => opt.MapFrom(src => src.HasHeightAdjustableSeats))
    .ForMember(dest => dest.HasHeadlights, opt => opt.MapFrom(src => src.HasHeadlights))
    .ForMember(dest => dest.HasSpareWheel, opt => opt.MapFrom(src => src.HasSpareWheel))
    .ForMember(dest => dest.HasSeatMemory, opt => opt.MapFrom(src => src.HasSeatMemory))
    .ForMember(dest => dest.HasHeatedSeats, opt => opt.MapFrom(src => src.HasHeatedSeats))
    .ForMember(dest => dest.HasSeatVentilation, opt => opt.MapFrom(src => src.HasSeatVentilation))
    .ForMember(dest => dest.IsNotCustomsCleared, opt => opt.MapFrom(src => src.IsNotCustomsCleared))
    .ForMember(dest => dest.IsBargainAvailable, opt => opt.MapFrom(src => src.IsBargainAvailable))
    .ForMember(dest => dest.IsExchangeAvailable, opt => opt.MapFrom(src => src.IsExchangeAvailable))
    .ForMember(dest => dest.IsInstallmentAvailable, opt => opt.MapFrom(src => src.IsInstallmentAvailable));



        CreateMap<CarEntity, CarCreateVm>()
            .ForMember(c => c.Photos, opt => opt.Ignore());

        CreateMap<CarEditVm, CarEntity>()
            .ForMember(c => c.Photos, opt => opt.Ignore());

        CreateMap<CarPhotoEntity, CarPhotoVm>();



        CreateMap<UserEntity, ProfileVm>()
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id)) // Map the user ID
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName)) // Map the username
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.MiddleName))
            .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
            .ForMember(dest => dest.Photo, opt => opt.MapFrom(src => src.Photo)); // Assuming the `UserEntity` has a Photo property



        // Map from RegionEntity to RegionVm
        CreateMap<RegionEntity, RegionVm>()
            .ForMember(dest => dest.Cities, opt => opt.MapFrom(src => src.Cities));

        // Map from CityEntity to CityVm
        CreateMap<CityEntity, CityVm>();


        CreateMap<CarBrandEntity, CarBrandVm>()
            .ForMember(dest => dest.Models, opt => opt.MapFrom(src => src.Models));

        CreateMap<CarModelEntity, CarModelVm>();

        CreateMap<CarBrandEntity, CarBrandCutVm>();

        CreateMap<FuelTypesEntity, FuelTypeVm>();
        CreateMap<EngineVolumeEntity, EngineVolumeVm>();
        CreateMap<NumberOfSeatsEntity, NumberOfSeatsVm>();
        CreateMap<TransmissionTypeEntity, TransmissionTypeVm>();
        CreateMap<BodyTypeEntity, BodyTypeVm>();
        CreateMap<TransportTypeEntity, TransportTypeVm>();


    }

}