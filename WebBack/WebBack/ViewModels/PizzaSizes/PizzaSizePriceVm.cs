namespace WebBack.ViewModels.PizzaSizes
{
    public class PizzaSizePriceVm
    {
        public int Id { get; set; }
        public int SizeId { get; set; }
        public string SizeName { get; set; } = null!;
        public decimal Price { get; set; }
    }
}
