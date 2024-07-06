namespace WebBack.ViewModels.Pagination;

public class PageVm<T>
{
    public IEnumerable<T> Data { get; set; } = null!;
    public int PagesAvailable { get; set; }
    public int ItemsAvailable { get; set; }
}
