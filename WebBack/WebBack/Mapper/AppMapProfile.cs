using AutoMapper;
using WebBack.Data.Entities;
using WebBack.Data.Entities.Identity;
using WebBack.ViewModels.Account;
using WebBack.ViewModels.Brand;
using WebBack.ViewModels.Car;
using WebBack.ViewModels.EngineVolume;
using WebBack.ViewModels.FuelTypeVm;
using WebBack.ViewModels.Model;
using WebBack.ViewModels.NumberOfSeats;
using WebBack.ViewModels.Region_City;
using WebBack.ViewModels.TransmissionType;


namespace WebBack.Mapper;
public class AppMapProfile : Profile
{
    public AppMapProfile()
    {
        // User
        CreateMap<RegisterVm, UserEntity>();

        CreateMap<CarEntity, CarVm>();


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

        CreateMap<FuelTypesEntity,FuelTypeVm>();
        CreateMap<EngineVolumeEntity,EngineVolumeVm>();
        CreateMap<NumberOfSeatsEntity,NumberOfSeatsVm>();
        CreateMap<TransmissionTypeEntity, TransmissionTypeVm>();
    }

}