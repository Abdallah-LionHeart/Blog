using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IEmailService _emailService;

        public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IEmailService emailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailService = emailService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized("Email does not exsist.");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized("Wrong Password");

            user.EmailConfirmationCode = GenerateConfirmationCode();
            user.EmailConfirmationExpiry = DateTime.UtcNow.AddMinutes(15);

            await _userManager.UpdateAsync(user);

            var message = $"Your login confirmation code is {user.EmailConfirmationCode}";
            await _emailService.SendEmailAsync(user.Email, "Login Confirmation Code", message);

            return Ok("Confirmation code sent to email.");
        }

        [HttpPost("confirm-login")]
        public async Task<IActionResult> ConfirmLogin([FromBody] ConfirmLoginDto confirmDto)
        {
            var user = await _userManager.FindByEmailAsync(confirmDto.Email);
            if (user == null) return NotFound("User not found.");

            if (user.EmailConfirmationCode != confirmDto.Code || user.EmailConfirmationExpiry < DateTime.UtcNow)
            {
                return BadRequest("Invalid or expired code.");
            }

            user.EmailConfirmationCode = null;
            user.EmailConfirmationExpiry = null;
            await _userManager.UpdateAsync(user);

            var result = await _signInManager.PasswordSignInAsync(user.UserName, confirmDto.Password, false, false);
            if (result.Succeeded)
            {
                return Ok("Login successful");
            }

            return Unauthorized("Invalid login attempt.");
        }

        [HttpPost("reset-password-request")]
        public async Task<IActionResult> ResetPasswordRequest([FromBody] ResetPasswordRequestDto request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null) return NotFound("Email not found.");

            user.EmailConfirmationCode = GenerateConfirmationCode();
            user.EmailConfirmationExpiry = DateTime.UtcNow.AddMinutes(10);

            await _userManager.UpdateAsync(user);

            var message = $"Your password reset code is {user.EmailConfirmationCode}";
            await _emailService.SendEmailAsync(user.Email, "Reset Password Code", message);

            return Ok("Reset password code sent to email.");
        }

        [HttpPost("reset-password-confirm")]
        public async Task<IActionResult> ResetPasswordConfirm([FromBody] ResetPasswordConfirmDto confirmDto)
        {
            var user = await _userManager.FindByEmailAsync(confirmDto.Email);
            if (user == null) return NotFound("User not found.");

            if (user.EmailConfirmationCode != confirmDto.Code || user.EmailConfirmationExpiry < DateTime.UtcNow)
            {
                return BadRequest("Invalid or expired code.");
            }

            var result = await _userManager.ResetPasswordAsync(user, await _userManager.GeneratePasswordResetTokenAsync(user), confirmDto.NewPassword);
            if (result.Succeeded)
            {
                user.EmailConfirmationCode = null;
                user.EmailConfirmationExpiry = null;
                await _userManager.UpdateAsync(user);
                return Ok("Password has been reset.");
            }

            return BadRequest("Failed to reset password.");
        }

        [HttpPost("send-confirmation-code")]
        public async Task<IActionResult> SendConfirmationCode([FromBody] EmailDto emailDto)
        {
            var user = await _userManager.FindByEmailAsync(emailDto.Email);
            if (user == null) return NotFound("Email not found.");

            user.EmailConfirmationCode = GenerateConfirmationCode();
            user.EmailConfirmationExpiry = DateTime.UtcNow.AddMinutes(10);

            await _userManager.UpdateAsync(user);

            var message = $"Your confirmation code is {user.EmailConfirmationCode}";
            await _emailService.SendEmailAsync(user.Email, "Email Confirmation Code", message);

            return Ok("Confirmation code sent to email.");
        }

        private string GenerateConfirmationCode()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }
    }



}
