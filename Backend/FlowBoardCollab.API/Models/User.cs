using System.ComponentModel.DataAnnotations;

namespace FlowBoardCollab.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? AvatarUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }

        public bool IsActive { get; set; } = true;

        // <====[CAMPOS PARA RECUPERACIÓN DE CONTRASEÑA]=====>
        public string? RecoveryCode { get; set; }
        public DateTime? RecoveryCodeExpiresAt { get; set; }

        // Relaciones
        public virtual ICollection<TeamMember> TeamMemberships { get; set; } = new List<TeamMember>();
        public virtual ICollection<PasswordResetToken>? PasswordResetTokens { get; set; }
    }
}