using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly ArticleService _service;

        public ArticlesController(ArticleService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            return Ok(await _service.GetAllArticles());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var article = await _service.GetArticleById(id);
            if (article == null)
            {
                return NotFound();
            }
            return Ok(article);
        }

        [HttpPost]
        public async Task<ActionResult<Article>> CreateArticle(Article article)
        {
            await _service.AddArticle(article);
            return CreatedAtAction(nameof(GetArticle), new { id = article.Id }, article);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateArticle(int id, Article article)
        {
            if (id != article.Id)
            {
                return BadRequest();
            }
            await _service.UpdateArticle(article);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            await _service.DeleteArticle(id);
            return NoContent();
        }

        [HttpPost("{id}/images")]
        public async Task<ActionResult> AddImage(int id, [FromForm] IFormFile file)
        {
            await _service.AddImage(file, id);
            return Ok();
        }

        [HttpDelete("images/{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            await _service.RemoveImage(id);
            return NoContent();
        }
        [HttpPost("{id}/videos")]
        public async Task<ActionResult> AddVideo(int id, [FromForm] IFormFile file)
        {
            await _service.AddVideo(file, id);
            return Ok();
        }


        [HttpDelete("videos/{id}")]
        public async Task<IActionResult> DeleteVideo(int id)
        {
            await _service.RemoveVideo(id);
            return NoContent();
        }

        [HttpGet("videos/{id}")]
        public async Task<ActionResult<Video>> GetVideo(int id)
        {
            var video = await _service.GetVideoById(id);
            if (video == null)
            {
                return NotFound();
            }
            return Ok(video);
        }

        [HttpGet("images/{id}")]
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            var image = await _service.GetImageById(id);
            if (image == null)
            {
                return NotFound();
            }
            return Ok(image);
        }

    }
}
