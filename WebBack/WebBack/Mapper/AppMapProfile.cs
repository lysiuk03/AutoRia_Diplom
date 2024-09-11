using AutoMapper;
using WebBack.Data.Entities;
using WebBack.Data.Entities.Identity;
using WebBack.ViewModels.Account;
using WebBack.ViewModels.Car;
using WebBack.ViewModels.Region_City;


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

    }

}