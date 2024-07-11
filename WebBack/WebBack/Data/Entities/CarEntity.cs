using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    public class CarEntity : BaseEntity
    {
        [StringLength(255), Required]
        public string Name { get; set; } = null!;

        [StringLength(2000)]
        public string Description { get; set; } = null!;

        [StringLength(50)]
        public string Stage { get; set; } = null!;

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        [Range(0, 9999)]
        public decimal Mileage { get; set; }

        [StringLength(17)]
        public string VIN { get; set; } = null!;

        //possible entity 

        public bool Metallic { get; set; } = false!;
        public bool AccidentParticipation { get; set; } = false!;
    }
}
