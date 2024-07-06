using AutoMapper.QueryableExtensions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebBack.Services.Interfaces;
using WebBack.ViewModels.Pagination;

namespace WebBack.Services.PaginationServices.Base;

public abstract class PaginationService<EntityType, EntityVmType, PaginationVmType>(
IMapper mapper
) : IPaginationService<EntityVmType, PaginationVmType> where PaginationVmType : PaginationVm
{

    public async Task<PageVm<EntityVmType>> GetPageAsync(PaginationVmType vm)
    {
        if (vm.PageSize is not null && vm.PageIndex is null)
            throw new Exception("PageIndex is required if PageSize is initialized");

        if (vm.PageIndex < 0)
            throw new Exception("PageIndex less than 0");

        if (vm.PageSize < 1)
            throw new Exception("PageSize is invalid");


        var query = GetQuery();

        query = FilterQuery(query, vm);

        int count = await query.CountAsync();

        int pagesAvailable;

        if (vm.PageSize is not null)
        {
            pagesAvailable = (int)Math.Ceiling(count / (double)vm.PageSize);
            query = query
                .Skip((int)vm.PageIndex! * (int)vm.PageSize)
                .Take((int)vm.PageSize);
        }
        else
        {
            pagesAvailable = (count > 0) ? (1) : (0);
        }

        var data = await MapAsync(query);

        return new PageVm<EntityVmType>
        {
            Data = data,
            PagesAvailable = pagesAvailable,
            ItemsAvailable = count
        };
    }

    protected abstract IQueryable<EntityType> GetQuery();

    protected abstract IQueryable<EntityType> FilterQuery(IQueryable<EntityType> query, PaginationVmType paginationVm);

    protected virtual async Task<IEnumerable<EntityVmType>> MapAsync(IQueryable<EntityType> query)
    {
        return await query
            .ProjectTo<EntityVmType>(mapper.ConfigurationProvider)
            .ToArrayAsync();
    }
}
