using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FlowBoardCollab.API.Data;
using FlowBoardCollab.API.DTOs;
using FlowBoardCollab.API.Models;
using FlowBoardCollab.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace FlowBoardCollab.API.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> RegisterAsync(RegisterDTO registerDto);
        Task<AuthResponseDTO> LoginAsync(LoginDTO loginDto);
        Task<UserDTO?> GetUserByIdAsync(int userId);
        
        // <====[MÉTODOS PARA RECUPERACIÓN DE CONTRASEÑA]=====>
        Task<ForgotPasswordResponseDTO> ForgotPasswordAsync(ForgotPasswordRequestDTO request);
        Task<bool> ResetPasswordAsync(ResetPasswordRequestDTO request);
    }

    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService; // <====[AGREGADO]=====>

        public AuthService(ApplicationDbContext context, IConfiguration configuration, IEmailService emailService) // <====[MODIFICADO]=====>
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
        }

        public async Task<AuthResponseDTO> RegisterAsync(RegisterDTO registerDto)
        {
            // Normalizar email
            var email = registerDto.Email.ToLower().Trim();

            // Verificar si el usuario ya existe
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            if (existingUser != null)
            {
                throw new Exception("El email ya está registrado");
            }

            // Crear nuevo usuario
            var user = new User
            {
                Name = registerDto.Name.Trim(),
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Generar token
            return await GenerateAuthResponseAsync(user);
        }

        public async Task<AuthResponseDTO> LoginAsync(LoginDTO loginDto)
        {
            var email = loginDto.Email.ToLower().Trim();

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email && u.IsActive);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                throw new Exception("Email o contraseña incorrectos");
            }

            // Actualizar último login
            user.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return await GenerateAuthResponseAsync(user);
        }

        public async Task<UserDTO?> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return null;

            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                AvatarUrl = user.AvatarUrl,
                CreatedAt = user.CreatedAt
            };
        }

        // <====[MÉTODO: GENERAR CÓDIGO DE RECUPERACIÓN]=====>
        private string GenerateRecoveryCode()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        // <====[MÉTODO: FORGOT PASSWORD]=====>
        public async Task<ForgotPasswordResponseDTO> ForgotPasswordAsync(ForgotPasswordRequestDTO request)
        {
            var email = request.Email.ToLower().Trim();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            // Por seguridad, no revelamos si el email existe o no
            if (user == null)
            {
                return new ForgotPasswordResponseDTO
                {
                    Success = true,
                    Message = "Si el email existe, recibirás un código de recuperación."
                };
            }

            // Generar código de recuperación
            var recoveryCode = GenerateRecoveryCode();
            user.RecoveryCode = BCrypt.Net.BCrypt.HashPassword(recoveryCode);
            user.RecoveryCodeExpiresAt = DateTime.UtcNow.AddMinutes(10); // Expira en 10 minutos
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // <====[ENVIAR EMAIL CON EL CÓDIGO]=====>
            var emailSent = await _emailService.SendPasswordResetEmailAsync(
                user.Email,
                user.Name,
                recoveryCode
            );

            return new ForgotPasswordResponseDTO
            {
                Success = emailSent,
                Message = emailSent 
                    ? "Código de recuperación enviado a tu correo." 
                    : "Error al enviar el código de recuperación. Intenta de nuevo."
            };
        }

        // <====[MÉTODO: RESET PASSWORD]=====>
        public async Task<bool> ResetPasswordAsync(ResetPasswordRequestDTO request)
        {
            var email = request.Email.ToLower().Trim();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return false;

            // Verificar que el código exista y no haya expirado
            if (string.IsNullOrEmpty(user.RecoveryCode) ||
                user.RecoveryCodeExpiresAt == null ||
                user.RecoveryCodeExpiresAt < DateTime.UtcNow)
            {
                return false;
            }

            // Verificar el código
            var isValid = BCrypt.Net.BCrypt.Verify(request.RecoveryCode, user.RecoveryCode);
            if (!isValid)
                return false;

            // Actualizar contraseña
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            user.RecoveryCode = null;
            user.RecoveryCodeExpiresAt = null;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        private Task<AuthResponseDTO> GenerateAuthResponseAsync(User user)
        {
            var token = GenerateJwtToken(user);

            var response = new AuthResponseDTO
            {
                UserId = user.Id,
                Name = user.Name,
                Email = user.Email,
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddMinutes(
                    Convert.ToDouble(_configuration["Jwt:ExpireMinutes"] ?? "60"))
            };

            return Task.FromResult(response);
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? 
                throw new InvalidOperationException("JWT Key not configured")));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    Convert.ToDouble(_configuration["Jwt:ExpireMinutes"] ?? "60")),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}