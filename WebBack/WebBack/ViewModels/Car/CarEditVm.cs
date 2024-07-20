

namespace WebBack.ViewModels.Car
{
    public class CarEditVm
    {
        public int Id { get; set; }

        public string? Model { get; set; } = null!;
        public string? Manufacturer { get; set; } = null!;
        public string? Description { get; set; } = null!;
        public string? Stage { get; set; } = null!;
        public decimal? Mileage { get; set; }
        public string? VIN { get; set; } = null!;



        // Список фото
        public IEnumerable<IFormFile>? Photos { get; set; } = null!;

    }
}