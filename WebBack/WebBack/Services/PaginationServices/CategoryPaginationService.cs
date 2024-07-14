//using AutoMapper;
//using System.Diagnostics.Metrics;
//using WebBack.Data;
//using WebBack.Data.Entities;
//using WebBack.Services.PaginationServices.Base;
//using WebBack.ViewModels.Category;

//namespace WebBack.Services.PaginationServices;
//public class CategoryPaginationService(
//    PizzaDbContext context,
//    IMapper mapper
//) : PaginationService<CategoryEntity, CategoryVm, CategoryFilterVm>(mapper)
//{
//    protected override IQueryable<CategoryEntity> GetQuery() => context.Categories.OrderBy(c => c.Id);

//    protected override IQueryable<CategoryEntity> FilterQuery(IQueryable<CategoryEntity> query, CategoryFilterVm paginationVm)
//    {
//        if (paginationVm.Name is not null)
//            query = query.Where(c => c.Name.ToLower().Contains(paginationVm.Name.ToLower()));

//        return query;
//    }
//}
