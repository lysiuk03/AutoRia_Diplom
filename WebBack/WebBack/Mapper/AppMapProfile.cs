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
            .ForMember(dest => dest.CarModel, opt => opt.MapFrom(src => src.CarModel)) // Якщо потрібно мапити модель
            .ForMember(dest => dest.CarBrand, opt => opt.MapFrom(src => src.CarBrand)) // Мапимо бренд
            .ForMember(dest => dest.BodyType, opt => opt.MapFrom(src => src.BodyType)) // Мапимо тип кузова
            .ForMember(dest => dest.TransmissionType, opt => opt.MapFrom(src => src.TransmissionType))
            .ForMember(dest => dest.NumberOfSeats, opt => opt.MapFrom(src => src.NumberOfSeats))
            .ForMember(dest => dest.EngineVolume, opt => opt.MapFrom(src => src.EngineVolume))
            .ForMember(dest => dest.TransportType, opt => opt.MapFrom(src => src.TransportType))
            .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City)) // Мапимо місто та регіон
            .ForMember(dest => dest.Photos, opt => opt.MapFrom(src => src.Photos)) // Мапимо фотографії
            .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
            .ForMember(dest => dest.FuelTypes, opt => opt.MapFrom(src => src.FuelTypes))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
            .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src => src.DateCreated)) // Дата створення
            .ForMember(dest => dest.Stage, opt => opt.MapFrom(src => src.Stage))
            .ForMember(dest => dest.VIN, opt => opt.MapFrom(src => src.VIN))
            .ForMember(dest => dest.Mileage, opt => opt.MapFrom(src => src.Mileage))
            .ForMember(dest => dest.Metallic, opt => opt.MapFrom(src => src.Metallic))
            .ForMember(dest => dest.AccidentParticipation, opt => opt.MapFrom(src => src.AccidentParticipation))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year));


        CreateMap<CarCreateVm, CarEntity>()
            .ForMember(c => c.Photos, opt => opt.Ignore());

        CreateMap<CarEditVm, CarEntity>()
            .ForMember(c => c.Photos, opt => opt.Ignore());

        CreateMap<CarPhotoEntity, CarPhotoVm>();



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