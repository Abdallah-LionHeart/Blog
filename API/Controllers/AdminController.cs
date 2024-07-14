using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly ArticleService _articleService;
        private readonly UserManager<AppUser> _userManager;

        public AdminController(UserService userService, ArticleService articleService, UserManager<AppUser> userManager)
        {
            _userService = userService;
            _articleService = articleService;
            _userManager = userManager;
        }

        // User Management
        [HttpGet("users/{id}")]
        public async Task<ActionResult<AppUser>> GetUser(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("users/{id}")]
        public async Task<IActionResult> UpdateUser(string id, AppUser user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            await _userService.UpdateUser(user);
            return NoContent();
        }

        [HttpPost("users/profile-images")]
        public async Task<ActionResult<AppUserImages>> AddProfileImage([FromForm] AppUserImages image, [FromForm] IFormFile file)
        {
            using var stream = file.OpenReadStream();
            await _userService.AddUserImage(image.AppUserId, image, stream, file.FileName, file.ContentType);
            return CreatedAtAction(nameof(GetUser), new { id = image.AppUserId }, image);
        }

        [HttpDelete("users/profile-images/{id}")]
        public async Task<IActionResult> DeleteProfileImage(int id)
        {
            await _userService.RemoveUserImage(id);
            return NoContent();
        }

        [HttpPost("users/background-images")]
        public async Task<ActionResult<AppUserImages>> AddBackgroundImage([FromForm] AppUserImages image, [FromForm] IFormFile file)
        {
            using var stream = file.OpenReadStream();
            await _userService.AddUserImage(image.AppUserId, image, stream, file.FileName, file.ContentType);
            return CreatedAtAction(nameof(GetUser), new { id = image.AppUserId }, image);
        }

        [HttpDelete("users/background-images/{id}")]
        public async Task<IActionResult> DeleteBackgroundImage(int id)
        {
            await _userService.RemoveUserImage(id);
            return NoContent();
        }

        [HttpGet("articles")]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            return Ok(await _articleService.GetAllArticles());
        }

        [HttpGet("articles/{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var article = await _articleService.GetArticleById(id);
            if (article == null)
            {
                return NotFound();
            }
            return Ok(article);
        }

        [HttpPost("articles")]
        public async Task<ActionResult<Article>> AddArticle(Article article)
        {
            await _articleService.AddArticle(article);
            return CreatedAtAction(nameof(GetArticle), new { id = article.Id }, article);
        }

        [HttpPut("articles/{id}")]
        public async Task<IActionResult> UpdateArticle(int id, Article article)
        {
            if (id != article.Id)
            {
                return BadRequest();
            }
            await _articleService.UpdateArticle(article);
            return NoContent();
        }

        [HttpDelete("articles/{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            await _articleService.DeleteArticle(id);
            return NoContent();
        }

        [HttpPost("articles/{id}/images")]
        public async Task<ActionResult> AddImage(int id, [FromForm] Image image, [FromForm] IFormFile file)
        {
            using var stream = file.OpenReadStream();
            await _articleService.AddImage(id, image, stream, file.FileName, file.ContentType);
            return Ok(image);
        }

        [HttpDelete("articles/images/{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            await _articleService.RemoveImage(id);
            return NoContent();
        }

        [HttpPost("articles/{id}/videos")]
        public async Task<ActionResult> AddVideo(int id, [FromForm] Video video, [FromForm] IFormFile file)
        {
            if (file != null)
            {
                using var stream = file.OpenReadStream();
                await _articleService.AddVideo(id, video, stream, file.FileName, file.ContentType);
            }
            else
            {
                await _articleService.AddVideo(id, video, null, null, null);
            }
            return Ok(video);
        }

        [HttpDelete("articles/videos/{id}")]
        public async Task<IActionResult> DeleteVideo(int id)
        {
            await _articleService.RemoveVideo(id);
            return NoContent();
        }
    }
}
