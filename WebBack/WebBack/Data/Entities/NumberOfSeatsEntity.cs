namespace WebBack.Data.Entities
{
    public class NumberOfSeatsEntity : BaseEntity
    {
        public int Number { get; set; }
        public string SeatType { get; set; } = "Standard";
    }
}
