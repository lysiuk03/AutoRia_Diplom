using System.ComponentModel.DataAnnotations;

namespace WebBack.Data.Entities
{
    public class TransportTypeEntity : BaseEntity
    {
        [StringLength(255), Required]
        public string Name { get; set; } = null!;
    }
}
