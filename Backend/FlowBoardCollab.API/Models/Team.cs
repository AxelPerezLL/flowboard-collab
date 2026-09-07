using System.ComponentModel.DataAnnotations;

namespace FlowBoardCollab.API.Models
{
    public class Team
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public int CreatedById { get; set; }
        public virtual User CreatedBy { get; set; } = null!;

        public virtual ICollection<TeamMember> Members { get; set; } = new List<TeamMember>();
    }
}