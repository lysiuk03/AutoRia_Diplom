namespace WebBack.ViewModels.Account
{
    public class ProfileVm
    {
        public int UserId { get; set; } // User ID from UserEntity
        public string? UserName { get; set; } // Username or Login name
        public string? MiddleName  { get; set; }
        public string? FirstName { get; set; } // First name of the user
        public string? LastName { get; set; } // Last name of the user
        public string? Email { get; set; } // Email address
        public string? PhoneNumber { get; set; } // Contact phone number
        public string? Photo {  get; set; }
    }
}
