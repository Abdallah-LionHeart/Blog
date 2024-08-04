using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PublicEmail { get; set; }
        public string Education { get; set; }
        public string Experience { get; set; }
        public string Position { get; set; }
        public string Overview { get; set; }
        public string PublicPhoneNumber { get; set; }
        public int Age { get; set; }
        public string FacebookAccount { get; set; }
        public string XAccount { get; set; }
        public string YouTubeAccount { get; set; }
        public string WhatsAppAccount { get; set; }
        public string OtherAccount { get; set; }
        public string EmailConfirmationCode { get; set; }
        public DateTime? EmailConfirmationExpiry { get; set; }
        // [JsonIgnore]
        public List<ProfileImage> ProfileImages { get; set; } = new();
        // [JsonIgnore]
        public List<BackgroundImage> BackgroundImages { get; set; } = new();
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}