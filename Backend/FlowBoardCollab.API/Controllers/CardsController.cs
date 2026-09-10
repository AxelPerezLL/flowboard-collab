using FlowBoardCollab.API.DTOs;
using FlowBoardCollab.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FlowBoardCollab.API.Controllers
{
    [ApiController]
    [Route("api/cards")]
    [Authorize]
    public class CardsController : ControllerBase
    {
        private readonly ICardService _cardService;

        public CardsController(ICardService cardService)
        {
            _cardService = cardService;
        }

        private int GetUserId() => 
            int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        // <====[CREAR TARJETA]=====>
        [HttpPost("board/{boardId}")]
        public async Task<ActionResult<CardResponseDTO>> CreateCard(int boardId, [FromBody] CreateCardDTO dto)
        {
            try
            {
                var result = await _cardService.CreateCardAsync(boardId, dto, GetUserId());
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

        // <====[OBTENER TARJETA POR ID]=====>
        [HttpGet("{id}")]
        public async Task<ActionResult<CardResponseDTO>> GetCard(int id)
        {
            try
            {
                var result = await _cardService.GetCardByIdAsync(id, GetUserId());
                if (result == null)
                    return NotFound(new { message = "Tarjeta no encontrada" });

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

        // <====[ACTUALIZAR TARJETA]=====>
        [HttpPut("{id}")]
        public async Task<ActionResult<CardResponseDTO>> UpdateCard(int id, [FromBody] UpdateCardDTO dto)
        {
            try
            {
                var result = await _cardService.UpdateCardAsync(id, dto, GetUserId());
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

        // <====[ELIMINAR TARJETA]=====>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(int id)
        {
            try
            {
                var result = await _cardService.DeleteCardAsync(id, GetUserId());
                if (!result)
                    return NotFound(new { message = "Tarjeta no encontrada" });

                return Ok(new { message = "Tarjeta eliminada exitosamente" });
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

        // <====[MOVER TARJETA]=====>
        [HttpPut("{id}/move")]
        public async Task<ActionResult<CardResponseDTO>> MoveCard(int id, [FromBody] MoveCardDTO dto)
        {
            try
            {
                var result = await _cardService.MoveCardAsync(id, dto, GetUserId());
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

        // <====[ASIGNAR TARJETA]=====>
        [HttpPut("{id}/assign")]
        public async Task<ActionResult<CardResponseDTO>> AssignCard(int id, [FromBody] AssignCardDTO dto)
        {
            try
            {
                var result = await _cardService.AssignCardAsync(id, dto, GetUserId());
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