using System.ComponentModel.DataAnnotations;

namespace FlowBoardCollab.API.DTOs
{
    // <====[CREAR COLUMNA]=====>
    public class CreateColumnDTO
    {
        [Required(ErrorMessage = "El nombre de la columna es requerido")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        public int Position { get; set; } = 0;
    }

    // <====[ACTUALIZAR COLUMNA]=====>
    public class UpdateColumnDTO
    {
        [Required(ErrorMessage = "El nombre de la columna es requerido")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }
    }

    // <====[REORDENAR COLUMNAS]=====>
    public class ReorderColumnsDTO
    {
        [Required]
        public List<ColumnOrderDTO> Columns { get; set; } = new List<ColumnOrderDTO>();
    }

    public class ColumnOrderDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int Position { get; set; }
    }
}
