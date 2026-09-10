using FlowBoardCollab.API.DTOs;
using FlowBoardCollab.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FlowBoardCollab.API.Controllers
{
    [ApiController]
    [Route("api/columns")]
    [Authorize]
    public class ColumnsController : ControllerBase
    {
        private readonly IBoardService _boardService;
        private readonly ICardService _cardService;

        public ColumnsController(IBoardService boardService, ICardService cardService)
        {
            _boardService = boardService;
            _cardService = cardService;
        }

        private int GetUserId() => 
            int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        // <====[ACTUALIZAR COLUMNA]=====>
        [HttpPut("{id}")]
        public async Task<ActionResult<ColumnResponseDTO>> UpdateColumn(int id, [FromBody] UpdateColumnDTO dto)
        {
            try
            {
                var result = await _boardService.UpdateColumnAsync(id, dto, GetUserId());
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

        // <====[ELIMINAR COLUMNA]=====>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColumn(int id)
        {
            try
            {
                var result = await _boardService.DeleteColumnAsync(id, GetUserId());
                if (!result)
                    return NotFound(new { message = "Columna no encontrada" });

                return Ok(new { message = "Columna eliminada exitosamente" });
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

        // <====[OBTENER TARJETAS DE COLUMNA]=====>
        [HttpGet("{id}/cards")]
        public async Task<ActionResult<List<CardResponseDTO>>> GetCards(int id)
        {
            try
            {
                var result = await _cardService.GetCardsByColumnAsync(id, GetUserId());
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
    }
}