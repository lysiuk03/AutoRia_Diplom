using System.ComponentModel.DataAnnotations.Schema;

namespace WebBack.Data.Entities
{
    [Table("tbl_engine_volumes")]
    public class EngineVolumeEntity : BaseEntity
    {
        public float Volume { get; set; }


    }
}
