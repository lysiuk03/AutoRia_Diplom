using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    [Table("tbl_engine_volumes")]
    public class EngineVolumeEntity : BaseEntity
    {
        public decimal Volume { get; set; }


    }
}
