using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    [Table("tbl_fuel_types")]
    public class FuelTypesEntity : BaseEntity
    {
        public string Name { get; set; } = "Petrol";
    }
}
