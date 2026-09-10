using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlowBoardCollab.API.Models
{
    public enum CardStatus
    {
        Pending = 1,      // En espera
        InProgress = 2,   // En proceso
        Done = 3          // Terminada
    }

    public class Card
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string? Description { get; set; }

        public CardStatus Status { get; set; } = CardStatus.Pending;

        public int Position { get; set; } // Orden dentro de la columna

        public DateTime? DueDate { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // <====[USUARIO ASIGNADO]=====>
        // Solo el dueño del tablero puede asignar
        // Solo el asignado puede modificar la tarjeta
        [ForeignKey("AssignedUser")]
        public int? AssignedUserId { get; set; }
        public virtual User? AssignedUser { get; set; }

        // <====[USUARIO CREADOR]=====>
        [ForeignKey("CreatedBy")]
        public int CreatedById { get; set; }
        public virtual User CreatedBy { get; set; } = null!;

        // <====[COLUMNA A LA QUE PERTENECE]=====>
        [ForeignKey("BoardColumn")]
        public int BoardColumnId { get; set; }
        public virtual BoardColumn BoardColumn { get; set; } = null!;
    }
}