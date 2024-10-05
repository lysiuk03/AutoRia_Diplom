using WebBack.Data.Entities;

namespace WebBack.SearchReauestClasses
{
    public class UpdateUserProfileModel
    {
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string? City { get; set; } = null!;
        public string? Region { get; set; }
        //public string Rating { get; set; } = null!;
        public string? Photo { get; set; }
    }
}
