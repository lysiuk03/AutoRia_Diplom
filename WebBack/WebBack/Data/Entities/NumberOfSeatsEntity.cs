namespace WebBack.Data.Entities
{
    public class NumberOfSeatsEntity : BaseEntity
    {
        public int NumberOfSeats { get; set; }
        public string SeatType { get; set; } = "Standard";
    }
}
