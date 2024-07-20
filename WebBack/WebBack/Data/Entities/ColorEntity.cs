using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    [Table("tbl_colors")]
    public class ColorEntity : BaseEntity
    {
        public string Color { get; set; } = null!;
    }
}
