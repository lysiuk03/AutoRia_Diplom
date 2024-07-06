using AutoMapper;
using WebBack.Data;
using WebBack.Data.Entities;
using WebBack.Services.PaginationServices.Base;
using WebBack.ViewModels.Category;
using WebBack.ViewModels.Pizza;

namespace WebBack.Services.PaginationServices;


public class PizzaPaginationService(
    PizzaDbContext context,
    IMapper mapper
) : PaginationService<PizzaEntity, PizzaVm, PizzaFilterVm>(mapper)
{
    protected override IQueryable<PizzaEntity> GetQuery() => context.Pizzas.OrderBy(c => c.Name);

    protected override IQueryable<PizzaEntity> FilterQuery(IQueryable<PizzaEntity> query, PizzaFilterVm paginationVm)
    {
        return query;
    }
}
