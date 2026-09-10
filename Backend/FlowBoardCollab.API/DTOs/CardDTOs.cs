using System.ComponentModel.DataAnnotations;
using FlowBoardCollab.API.Models;

namespace FlowBoardCollab.API.DTOs
{
    // <====[CREAR TARJETA]=====>
    public class CreateCardDTO
    {
        [Required(ErrorMessage = "El título de la tarjeta es requerido")]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string? Description { get; set; }

        [Required(ErrorMessage = "La columna es requerida")]
        public int BoardColumnId { get; set; }

        public DateTime? DueDate { get; set; }

        // <====[OPCIONAL: SOLO EL DUEÑO PUEDE ASIGNAR]=====>
        public int? AssignedUserId { get; set; }
    }

    // <====[ACTUALIZAR TARJETA]=====>
    // Solo el usuario asignado puede modificar
    public class UpdateCardDTO
    {
        [Required(ErrorMessage = "El título de la tarjeta es requerido")]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string? Description { get; set; }

        public DateTime? DueDate { get; set; }

        public CardStatus? Status { get; set; }
    }

    // <====[MOVER TARJETA ENTRE COLUMNAS]=====>
    public class MoveCardDTO
    {
        [Required(ErrorMessage = "La columna destino es requerida")]
        public int BoardColumnId { get; set; }

        public int Position { get; set; } = 0;
    }

    // <====[ASIGNAR TARJETA]=====>
    // Solo el dueño del tablero puede asignar
    public class AssignCardDTO
    {
        [Required(ErrorMessage = "El usuario asignado es requerido")]
        public int AssignedUserId { get; set; }
    }

    // <====[RESPUESTA DE TARJETA]=====>
    public class CardResponseDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Status { get; set; } = string.Empty;
        public int StatusValue { get; set; }
        public int Position { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        
        public int BoardColumnId { get; set; }
        public string BoardColumnName { get; set; } = string.Empty;
        
        public int CreatedById { get; set; }
        public string CreatedByName { get; set; } = string.Empty;
        
        public int? AssignedUserId { get; set; }
        public string? AssignedUserName { get; set; }
        public string? AssignedUserAvatarUrl { get; set; }
    }
}