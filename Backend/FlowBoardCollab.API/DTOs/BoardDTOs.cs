using System.ComponentModel.DataAnnotations;

namespace FlowBoardCollab.API.DTOs
{
    // <====[CREAR TABLERO]=====>
    public class CreateBoardDTO
    {
        [Required(ErrorMessage = "El nombre del tablero es requerido")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }
    }

    // <====[ACTUALIZAR TABLERO]=====>
    public class UpdateBoardDTO
    {
        [Required(ErrorMessage = "El nombre del tablero es requerido")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }
    }

    // <====[RESPUESTA DE TABLERO]=====>
    public class BoardResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int CreatedById { get; set; }
        public string CreatedByName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int MemberCount { get; set; }
        public int CardCount { get; set; }
        public List<BoardMemberDTO> Members { get; set; } = new List<BoardMemberDTO>();
        public List<ColumnResponseDTO> Columns { get; set; } = new List<ColumnResponseDTO>();
    }

    // <====[MIEMBRO DEL TABLERO]=====>
    public class BoardMemberDTO
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? AvatarUrl { get; set; }
        public string Role { get; set; } = string.Empty;
        public DateTime JoinedAt { get; set; }
    }

    // <====[AGREGAR COLABORADOR]=====>
    public class AddBoardMemberDTO
    {
        [Required(ErrorMessage = "El email del colaborador es requerido")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string Email { get; set; } = string.Empty;
    }

    // <====[RESPUESTA DE COLUMNA]=====>
    public class ColumnResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Position { get; set; }
        public int CardCount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<CardResponseDTO> Cards { get; set; } = new List<CardResponseDTO>();
    }
}