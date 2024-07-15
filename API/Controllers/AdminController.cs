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
        private readonly UserManager<Admin> _userManager;

        public AdminController(UserService userService, ArticleService articleService, UserManager<Admin> userManager)
        {
            _userService = userService;
            _articleService = articleService;
            _userManager = userManager;
        }

        // User Management
        [HttpGet("users/{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("users/{id}")]
        public async Task<IActionResult> UpdateUser(int id, AppUser user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            await _userService.UpdateUser(user);
            return NoContent();
        }

        [HttpPost("users/profile-images")]
        public async Task<ActionResult<ProfileImage>> AddProfileImage([FromForm] ProfileImage profileImage, [FromForm] IFormFile file)
        {
            using var stream = file.OpenReadStream();
            await _userService.AddUserProfileImage(profileImage.AppUserId, profileImage, stream, file.FileName, file.ContentType);
            return CreatedAtAction(nameof(GetUser), new { id = profileImage.AppUserId }, profileImage);
        }

        [HttpDelete("users/profile-images/{id}")]
        public async Task<IActionResult> DeleteProfileImage(int id)
        {
            await _userService.RemoveUserProfileImage(id);
            return NoContent();
        }

        [HttpPost("users/background-images")]
        public async Task<ActionResult<BackgroundImage>> AddBackgroundImage([FromForm] BackgroundImage backgroundImage, [FromForm] IFormFile file)
        {
            using var stream = file.OpenReadStream();
            await _userService.AddUserBackgroundImage(backgroundImage.AppUserId, backgroundImage, stream, file.FileName, file.ContentType);
            return CreatedAtAction(nameof(GetUser), new { id = backgroundImage.AppUserId }, backgroundImage);
        }

        [HttpDelete("users/background-images/{id}")]
        public async Task<IActionResult> DeleteBackgroundImage(int id)
        {
            await _userService.RemoveUserBackgroundImage(id);
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
