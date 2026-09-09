using FlowBoardCollab.API.DTOs;
using FlowBoardCollab.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FlowBoardCollab.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthResponseDTO>> Register([FromBody] RegisterDTO registerDto)
        {
            try
            {
                var result = await _authService.RegisterAsync(registerDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthResponseDTO>> Login([FromBody] LoginDTO loginDto)
        {
            try
            {
                var result = await _authService.LoginAsync(loginDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var user = await _authService.GetUserByIdAsync(userId);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // <====[ENDPOINT: FORGOT PASSWORD]=====>
        [HttpPost("forgot-password")]
        [AllowAnonymous]
        public async Task<ActionResult<ForgotPasswordResponseDTO>> ForgotPassword([FromBody] ForgotPasswordRequestDTO request)
        {
            try
            {
                var result = await _authService.ForgotPasswordAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor." });
            }
        }

        // <====[ENDPOINT: RESET PASSWORD]=====>
        [HttpPost("reset-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestDTO request)
        {
            try
            {
                var result = await _authService.ResetPasswordAsync(request);

                if (!result)
                    return BadRequest(new { message = "Código inválido o expirado." });

                return Ok(new { message = "Contraseña restablecida exitosamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor." });
            }
        }
    }
}