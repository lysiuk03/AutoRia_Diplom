using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{

    [Table("tbl_car_photos")]

    public class CarPhotoEntity : BaseEntity
    {
        public string Name { get; set; } = null!;

        public int Priority { get; set; }

        public int CarId { get; set; }

        public CarEntity Car { get; set; } = null!;
    }
}