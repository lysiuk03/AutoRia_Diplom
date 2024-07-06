using Microsoft.EntityFrameworkCore;
using WebBack.Data;
using WebBack.Services.Interfaces;

namespace WebBack.Services;

public class ExistingEntityCheckerService(
    PizzaDbContext context
 ) : IExistingEntityCheckerService
{
    public async Task<bool> IsCorrectCategoryId(int id, CancellationToken cancellationToken) =>
        await context.Categories.AnyAsync(c => c.Id == id, cancellationToken);

    public async Task<bool> IsCorrectIngredientId(int id, CancellationToken cancellationToken) =>
        await context.Ingredients.AnyAsync(c => c.Id == id, cancellationToken);
}
