using FlowBoardCollab.API.DTOs;
using FlowBoardCollab.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FlowBoardCollab.API.Controllers
{
    [ApiController]
    [Route("api/boards")]
    [Authorize]
    public class BoardsController : ControllerBase
    {
        private readonly IBoardService _boardService;

        public BoardsController(IBoardService boardService)
        {
            _boardService = boardService;
        }

        private int GetUserId() => 
            int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        // <====[CREAR TABLERO]=====>
        [HttpPost]
        public async Task<ActionResult<BoardResponseDTO>> CreateBoard([FromBody] CreateBoardDTO dto)
        {
            try
            {
                var result = await _boardService.CreateBoardAsync(dto, GetUserId());
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // <====[OBTENER MIS TABLEROS]=====>
        [HttpGet]
        public async Task<ActionResult<List<BoardResponseDTO>>> GetMyBoards()
        {
            try
            {
                var result = await _boardService.GetUserBoardsAsync(GetUserId());
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // <====[OBTENER TABLERO POR ID]=====>
        [HttpGet("{id}")]
        public async Task<ActionResult<BoardResponseDTO>> GetBoard(int id)
        {
            try
            {
                var result = await _boardService.GetBoardByIdAsync(id, GetUserId());
                if (result == null)
                    return NotFound(new { message = "Tablero no encontrado" });

                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // <====[ACTUALIZAR TABLERO]=====>
        [HttpPut("{id}")]
        public async Task<ActionResult<BoardResponseDTO>> UpdateBoard(int id, [FromBody] UpdateBoardDTO dto)
        {
            try
            {
                var result = await _boardService.UpdateBoardAsync(id, dto, GetUserId());
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // <====[ELIMINAR TABLERO]=====>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBoard(int id)
        {
            try
            {
                var result = await _boardService.DeleteBoardAsync(id, GetUserId());
                if (!result)
                    return NotFound(new { message = "Tablero no encontrado" });

                return Ok(new { message = "Tablero eliminado exitosamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // <====[AGREGAR COLABORADOR]=====>
        [HttpPost("{id}/members")]
        public async Task<ActionResult<BoardMemberDTO>> AddMember(int id, [FromBody] AddBoardMemberDTO dto)
        {
            try
            {
                var result = await _boardService.AddMemberAsync(id, dto, GetUserId());
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // <====[OBTENER MIEMBROS]=====>
        [HttpGet("{id}/members")]
        public async Task<ActionResult<List<BoardMemberDTO>>> GetMembers(int id)
        {
            try
            {
                var result = await _boardService.GetMembersAsync(id, GetUserId());
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // <====[ELIMINAR COLABORADOR]=====>
        [HttpDelete("{id}/members/{userId}")]
        public async Task<IActionResult> RemoveMember(int id, int userId)
        {
            try
            {
                var result = await _boardService.RemoveMemberAsync(id, userId, GetUserId());
                if (!result)
                    return NotFound(new { message = "Miembro no encontrado" });

                return Ok(new { message = "Colaborador eliminado exitosamente" });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // <====[CREAR COLUMNA]=====>
        [HttpPost("{id}/columns")]
        public async Task<ActionResult<ColumnResponseDTO>> CreateColumn(int id, [FromBody] CreateColumnDTO dto)
        {
            try
            {
                var result = await _boardService.CreateColumnAsync(id, dto, GetUserId());
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // <====[REORDENAR COLUMNAS]=====>
        [HttpPut("{id}/columns/reorder")]
        public async Task<IActionResult> ReorderColumns(int id, [FromBody] ReorderColumnsDTO dto)
        {
            try
            {
                await _boardService.ReorderColumnsAsync(id, dto, GetUserId());
                return Ok(new { message = "Columnas reordenadas exitosamente" });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}