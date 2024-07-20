using AutoMapper;
using WebBack.Data.Entities;
using WebBack.Data.Entities.Identity;
using WebBack.ViewModels.Account;
using WebBack.ViewModels.Car;


namespace WebBack.Mapper;
public class AppMapProfile : Profile
{
    public AppMapProfile()
    {
        // User
        CreateMap<RegisterVm, UserEntity>();

        CreateMap<CarEntity, CarVm>();

        // CreateMap<CarCreateVm, CarEntity>()
        //     .ForMember(c => c.Photos, opt => opt.Ignore());

        CreateMap<CarPhotoEntity, CarPhotoVm>();

    }

}