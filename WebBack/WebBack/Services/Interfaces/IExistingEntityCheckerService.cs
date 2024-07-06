namespace WebBack.Services.Interfaces
{
    public interface IExistingEntityCheckerService
    {
        Task<bool> IsCorrectCategoryId(int id, CancellationToken cancellationToken);

        Task<bool> IsCorrectIngredientId(int id, CancellationToken cancellationToken);

    }
}
