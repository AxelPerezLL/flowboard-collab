using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlowBoardCollab.API.Models
{
    public enum TeamRole
    {
        Admin = 1,
        Member = 2,
        Viewer = 3
    }

    public class TeamMember
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Team")]
        public int TeamId { get; set; }
        public virtual Team Team { get; set; } = null!;

        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;

        public TeamRole Role { get; set; } = TeamRole.Member;

        public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    }
}