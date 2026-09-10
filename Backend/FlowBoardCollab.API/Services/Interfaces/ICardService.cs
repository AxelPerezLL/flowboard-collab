using FlowBoardCollab.API.DTOs;

namespace FlowBoardCollab.API.Services.Interfaces
{
    public interface ICardService
    {
        // <====[CRUD TARJETAS]=====>
        Task<CardResponseDTO> CreateCardAsync(int boardId, CreateCardDTO dto, int userId);
        Task<CardResponseDTO?> GetCardByIdAsync(int cardId, int userId);
        Task<CardResponseDTO> UpdateCardAsync(int cardId, UpdateCardDTO dto, int userId);
        Task<bool> DeleteCardAsync(int cardId, int userId);
        Task<CardResponseDTO> MoveCardAsync(int cardId, MoveCardDTO dto, int userId);
        Task<CardResponseDTO> AssignCardAsync(int cardId, AssignCardDTO dto, int userId);
        Task<List<CardResponseDTO>> GetCardsByColumnAsync(int columnId, int userId);
    }
}