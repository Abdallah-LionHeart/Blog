using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
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

        [HttpGet("{userId}/images")]
        public async Task<ActionResult<IEnumerable<AppUserImages>>> GetUserImages(int userId)
        {
            return Ok(await _userService.GetUserImages(userId));
        }

        [HttpPost("{userId}/images")]
        public async Task<ActionResult<AppUserImages>> AddUserImage(int userId, [FromForm] AppUserImages image, [FromForm] IFormFile file)
        {
            using var stream = file.OpenReadStream();
            await _userService.AddUserImage(userId, image, stream, file.FileName, file.ContentType);
            return CreatedAtAction(nameof(GetUser), new { id = userId }, image);
        }

        [HttpDelete("images/{id}")]
        public async Task<IActionResult> DeleteUserImage(int id)
        {
            await _userService.RemoveUserImage(id);
            return NoContent();
        }

        [HttpGet("images/{id}")]
        public async Task<ActionResult<AppUserImages>> GetUserImage(int id)
        {
            var image = await _userService.GetUserImageById(id);
            if (image == null)
            {
                return NotFound();
            }
            return Ok(image);
        }
    }

}
