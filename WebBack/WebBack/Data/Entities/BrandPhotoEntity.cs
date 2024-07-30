using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{

    [Table("tbl_brand_photos")]

    public class BrandPhotoEntity : BaseEntity
    {
        public string Name { get; set; } = null!;

        public int Priority { get; set; }

        public int BrandId { get; set; }

        public CarBrandEntity Brand { get; set; } = null!;
    }
}