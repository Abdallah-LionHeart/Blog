using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly UserManager<Admin> _userManager;

        public AdminController(UserService userService, UserManager<Admin> userManager)
        {
            _userService = userService;
            _userManager = userManager;
        }

        // User Management
        [HttpGet]
        public async Task<ActionResult<AppUser>> GetUser()
        {
            var user = await _userService.GetUser();
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, AppUser user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            await _userService.UpdateUser(user);
            return NoContent();
        }

        [HttpGet("{userId}/profile-images")]
        public async Task<ActionResult<IEnumerable<ProfileImage>>> GetUserProfileImages(int userId)
        {
            var images = await _userService.GetUserProfileImages(userId);
            return Ok(images);
        }

        [HttpPost("{userId}/profile-images")]
        public async Task<ActionResult<ProfileImage>> AddProfileImage(IFormFile file, int userId)
        {
            await _userService.AddProfileImage(file, userId);
            return CreatedAtAction(nameof(GetUser), new { id = userId }, null);
        }

        [HttpDelete("profile-images/{id}")]
        public async Task<IActionResult> DeleteProfileImage(int id)
        {
            var image = await _userService.GetProfileImageById(id);
            if (image == null)
            {
                return NotFound();
            }
            if (image.IsMain)
            {
                return BadRequest("Cannot delete the main profile image.");
            }
            await _userService.RemoveUserProfileImage(id);
            return NoContent();
        }

        [HttpPut("profile-images/{id}/set-main")]
        public async Task<IActionResult> SetMainProfileImage(int id)
        {
            var image = await _userService.GetProfileImageById(id);
            if (image == null)
            {
                return NotFound();
            }
            if (image.IsMain)
            {
                return BadRequest("This image is already the main profile image.");
            }
            await _userService.SetMainProfileImage(id);
            return NoContent();
        }


        [HttpGet("{userId}/background-images")]
        public async Task<ActionResult<IEnumerable<BackgroundImage>>> GetUserBackgroundImages(int userId)
        {
            var images = await _userService.GetUserBackgroundImages(userId);
            return Ok(images);
        }

        [HttpPost("{userId}/background-images")]
        public async Task<ActionResult<BackgroundImage>> AddBackgroundImage(IFormFile file, int userId)
        {
            await _userService.AddBackgroundImage(file, userId);
            return CreatedAtAction(nameof(GetUser), new { id = userId }, null);
        }

        [HttpDelete("background-images/{id}")]
        public async Task<IActionResult> DeleteBackgroundImage(int id)
        {
            await _userService.RemoveUserBackgroundImage(id);
            return NoContent();
        }
    }
}
