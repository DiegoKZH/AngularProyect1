namespace Proyect1.Models
{
    // DTO for create/update operations (accepts plain password)
    public class UserInput
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
        // plain password sent from client; will be hashed server-side
        public string? Password { get; set; }
    }
}
