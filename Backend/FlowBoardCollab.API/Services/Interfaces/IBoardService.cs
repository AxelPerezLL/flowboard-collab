    using FlowBoardCollab.API.DTOs;

namespace FlowBoardCollab.API.Services.Interfaces
{
    public interface IBoardService
    {
        // <====[CRUD TABLEROS]=====>
        Task<BoardResponseDTO> CreateBoardAsync(CreateBoardDTO dto, int userId);
        Task<List<BoardResponseDTO>> GetUserBoardsAsync(int userId);
        Task<BoardResponseDTO?> GetBoardByIdAsync(int boardId, int userId);
        Task<BoardResponseDTO> UpdateBoardAsync(int boardId, UpdateBoardDTO dto, int userId);
        Task<bool> DeleteBoardAsync(int boardId, int userId);

        // <====[COLABORADORES]=====>
        Task<BoardMemberDTO> AddMemberAsync(int boardId, AddBoardMemberDTO dto, int userId);
        Task<bool> RemoveMemberAsync(int boardId, int memberUserId, int userId);
        Task<List<BoardMemberDTO>> GetMembersAsync(int boardId, int userId);

        // <====[COLUMNAS]=====>
        Task<ColumnResponseDTO> CreateColumnAsync(int boardId, CreateColumnDTO dto, int userId);
        Task<ColumnResponseDTO> UpdateColumnAsync(int columnId, UpdateColumnDTO dto, int userId);
        Task<bool> DeleteColumnAsync(int columnId, int userId);
        Task<bool> ReorderColumnsAsync(int boardId, ReorderColumnsDTO dto, int userId);
    }
}