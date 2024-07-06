namespace WebBack.Data.Entities;

public interface IEntity
{
    int Id { get; set; }
    bool IsDeleted { get; set; }
    DateTime DateCreated { get; set; }
}

public class BaseEntity : IEntity
{
    public int Id { get; set; }
    public bool IsDeleted { get; set; } = false;
    public DateTime DateCreated { get; set; }
}
