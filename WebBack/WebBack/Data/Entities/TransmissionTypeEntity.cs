using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    [Table("tbl_transmisions_types")]
    public class TransmissionTypeEntity : BaseEntity
    {
        public string Name { get; set; } = null!;
    }
}
