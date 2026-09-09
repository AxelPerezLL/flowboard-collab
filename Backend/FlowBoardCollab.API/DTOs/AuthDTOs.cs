using System.ComponentModel.DataAnnotations;

namespace FlowBoardCollab.API.DTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "El email es requerido")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "La contraseña es requerida")]
        [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres")]
        [MaxLength(100)]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginDTO
    {
        [Required(ErrorMessage = "El email es requerido")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string Password { get; set; } = string.Empty;
    }

    public class AuthResponseDTO
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
    }

    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? AvatarUrl { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    // <====[DTOs PARA RECUPERACIÓN DE CONTRASEÑA]=====>

    public class ForgotPasswordRequestDTO
    {
        [Required(ErrorMessage = "El email es requerido")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;
    }

    public class ResetPasswordRequestDTO
    {
        [Required(ErrorMessage = "El email es requerido")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "El código de recuperación es requerido")]
        [MinLength(6, ErrorMessage = "El código debe tener 6 dígitos")]
        [MaxLength(6, ErrorMessage = "El código debe tener 6 dígitos")]
        public string RecoveryCode { get; set; } = string.Empty;

        [Required(ErrorMessage = "La nueva contraseña es requerida")]
        [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres")]
        [MaxLength(100)]
        public string NewPassword { get; set; } = string.Empty;

        [Required(ErrorMessage = "La confirmación de contraseña es requerida")]
        [Compare("NewPassword", ErrorMessage = "Las contraseñas no coinciden")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }

    public class ForgotPasswordResponseDTO
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}