using System.Text.Json.Serialization;

namespace API.DTOs
{
    public class AppUserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProfileImageUrl { get; set; }
        public string BackgroundImageUrl { get; set; }
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
        public string WhatsappAccount { get; set; }
        public string OtherAccount { get; set; }
        [JsonIgnore]
        public List<ProfileImageDto> ProfileImages { get; set; }
        [JsonIgnore]
        public List<BackgroundImageDto> BackgroundImages { get; set; }
    }
}