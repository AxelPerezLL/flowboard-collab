using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlowBoardCollab.API.Models
{
    public class BoardColumn
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        public int Position { get; set; } // Orden de la columna

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Relación con Team (el tablero/grupo)
        [ForeignKey("Team")]
        public int TeamId { get; set; }
        public virtual Team Team { get; set; } = null!;

        // Relación con Cards
        public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
    }
}