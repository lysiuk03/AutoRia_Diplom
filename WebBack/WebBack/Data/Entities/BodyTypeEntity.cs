using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    [Table("tbl_body_types")]
    public class BodyTypeEntity : BaseEntity
    {
        [StringLength(255), Required]
        public string Name { get; set; } = null!;
    }
}
