using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BusinessEmail { get; set; }
        public string Education { get; set; }
        public string Experience { get; set; }
        public string Position { get; set; }
        public string Overview { get; set; }
        public string PublicPhoneNumber { get; set; }
        public string EmailConfirmationCode { get; set; }
        public DateTime? EmailConfirmationExpiry { get; set; }
        public int Age { get; set; }
        public string FacebookLink { get; set; }
        public string TwitterLink { get; set; }
        public string YouTubeLink { get; set; }
        public List<AppUserImages> ProfileImages { get; set; }
        public List<AppUserImages> BackgroundImages { get; set; }
    }
}