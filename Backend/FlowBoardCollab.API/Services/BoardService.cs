using FlowBoardCollab.API.Data;
using FlowBoardCollab.API.DTOs;
using FlowBoardCollab.API.Models;
using FlowBoardCollab.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FlowBoardCollab.API.Services
{
    public class BoardService : IBoardService
    {
        private readonly ApplicationDbContext _context;

        public BoardService(ApplicationDbContext context)
        {
            _context = context;
        }

        // <====[CREAR TABLERO]=====>
        public async Task<BoardResponseDTO> CreateBoardAsync(CreateBoardDTO dto, int userId)
        {
            var team = new Team
            {
                Name = dto.Name.Trim(),
                Description = dto.Description?.Trim(),
                CreatedById = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Teams.Add(team);
            await _context.SaveChangesAsync();

            // <====[AGREGAR AL CREADOR COMO ADMIN]=====>
            var teamMember = new TeamMember
            {
                TeamId = team.Id,
                UserId = userId,
                Role = TeamRole.Admin,
                JoinedAt = DateTime.UtcNow
            };

            _context.TeamMembers.Add(teamMember);

            // <====[CREAR COLUMNAS POR DEFECTO]=====>
            var defaultColumns = new List<BoardColumn>
            {
                new BoardColumn { Name = "En espera", Position = 1, TeamId = team.Id },
                new BoardColumn { Name = "En proceso", Position = 2, TeamId = team.Id },
                new BoardColumn { Name = "Terminada", Position = 3, TeamId = team.Id }
            };

            _context.BoardColumns.AddRange(defaultColumns);
            await _context.SaveChangesAsync();

            return await GetBoardByIdAsync(team.Id, userId) ?? throw new Exception("Error al crear el tablero");
        }

        // <====[OBTENER TABLEROS DEL USUARIO]=====>
        public async Task<List<BoardResponseDTO>> GetUserBoardsAsync(int userId)
        {
            var boards = await _context.Teams
                .Where(t => t.Members.Any(m => m.UserId == userId))
                .Include(t => t.CreatedBy)
                .Include(t => t.Members).ThenInclude(m => m.User)
                .Include(t => t.Columns).ThenInclude(c => c.Cards)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return boards.Select(MapToBoardResponse).ToList();
        }

        // <====[OBTENER TABLERO POR ID]=====>
        public async Task<BoardResponseDTO?> GetBoardByIdAsync(int boardId, int userId)
        {
            var team = await _context.Teams
                .Where(t => t.Id == boardId && t.Members.Any(m => m.UserId == userId))
                .Include(t => t.CreatedBy)
                .Include(t => t.Members).ThenInclude(m => m.User)
                .Include(t => t.Columns).ThenInclude(c => c.Cards)
                    .ThenInclude(c => c.AssignedUser)
                .Include(t => t.Columns).ThenInclude(c => c.Cards)
                    .ThenInclude(c => c.CreatedBy)
                .FirstOrDefaultAsync();

            if (team == null)
                return null;

            return MapToBoardResponse(team);
        }

        // <====[ACTUALIZAR TABLERO]=====>
        public async Task<BoardResponseDTO> UpdateBoardAsync(int boardId, UpdateBoardDTO dto, int userId)
        {
            var team = await _context.Teams
                .FirstOrDefaultAsync(t => t.Id == boardId && t.CreatedById == userId);

            if (team == null)
                throw new UnauthorizedAccessException("No tienes permiso para actualizar este tablero");

            team.Name = dto.Name.Trim();
            team.Description = dto.Description?.Trim();
            team.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetBoardByIdAsync(boardId, userId) ?? throw new Exception("Error al actualizar el tablero");
        }

        // <====[ELIMINAR TABLERO]=====>
        public async Task<bool> DeleteBoardAsync(int boardId, int userId)
        {
            var team = await _context.Teams
                .FirstOrDefaultAsync(t => t.Id == boardId && t.CreatedById == userId);

            if (team == null)
                return false;

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
            return true;
        }

        // <====[AGREGAR COLABORADOR]=====>
        public async Task<BoardMemberDTO> AddMemberAsync(int boardId, AddBoardMemberDTO dto, int userId)
        {
            // Verificar que el usuario sea el dueño del tablero
            var team = await _context.Teams
                .FirstOrDefaultAsync(t => t.Id == boardId && t.CreatedById == userId);

            if (team == null)
                throw new UnauthorizedAccessException("Solo el dueño puede agregar colaboradores");

            // Buscar al usuario por email
            var email = dto.Email.ToLower().Trim();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.IsActive);

            if (user == null)
                throw new Exception("Usuario no encontrado");

            // Verificar que no sea ya miembro
            var existingMember = await _context.TeamMembers
                .FirstOrDefaultAsync(tm => tm.TeamId == boardId && tm.UserId == user.Id);

            if (existingMember != null)
                throw new Exception("El usuario ya es miembro de este tablero");

            // Agregar como miembro
            var member = new TeamMember
            {
                TeamId = boardId,
                UserId = user.Id,
                Role = TeamRole.Member,
                JoinedAt = DateTime.UtcNow
            };

            _context.TeamMembers.Add(member);
            await _context.SaveChangesAsync();

            return new BoardMemberDTO
            {
                UserId = user.Id,
                Name = user.Name,
                Email = user.Email,
                AvatarUrl = user.AvatarUrl,
                Role = member.Role.ToString(),
                JoinedAt = member.JoinedAt
            };
        }

        // <====[ELIMINAR COLABORADOR]=====>
        public async Task<bool> RemoveMemberAsync(int boardId, int memberUserId, int userId)
        {
            var team = await _context.Teams
                .FirstOrDefaultAsync(t => t.Id == boardId && t.CreatedById == userId);

            if (team == null)
                return false;

            // No permitir eliminar al dueño
            if (memberUserId == userId)
                throw new Exception("No puedes eliminarte a ti mismo del tablero");

            var member = await _context.TeamMembers
                .FirstOrDefaultAsync(tm => tm.TeamId == boardId && tm.UserId == memberUserId);

            if (member == null)
                return false;

            _context.TeamMembers.Remove(member);
            await _context.SaveChangesAsync();
            return true;
        }

        // <====[OBTENER MIEMBROS]=====>
        public async Task<List<BoardMemberDTO>> GetMembersAsync(int boardId, int userId)
        {
            var isMember = await _context.TeamMembers
                .AnyAsync(tm => tm.TeamId == boardId && tm.UserId == userId);

            if (!isMember)
                throw new UnauthorizedAccessException("No tienes acceso a este tablero");

            var members = await _context.TeamMembers
                .Where(tm => tm.TeamId == boardId)
                .Include(tm => tm.User)
                .Select(tm => new BoardMemberDTO
                {
                    UserId = tm.UserId,
                    Name = tm.User.Name,
                    Email = tm.User.Email,
                    AvatarUrl = tm.User.AvatarUrl,
                    Role = tm.Role.ToString(),
                    JoinedAt = tm.JoinedAt
                })
                .ToListAsync();

            return members;
        }

        // <====[CREAR COLUMNA]=====>
        public async Task<ColumnResponseDTO> CreateColumnAsync(int boardId, CreateColumnDTO dto, int userId)
        {
            // Verificar que el usuario sea miembro del tablero
            var isMember = await _context.TeamMembers
                .AnyAsync(tm => tm.TeamId == boardId && tm.UserId == userId);

            if (!isMember)
                throw new UnauthorizedAccessException("No tienes acceso a este tablero");

            var maxPosition = await _context.BoardColumns
                .Where(c => c.TeamId == boardId)
                .MaxAsync(c => (int?)c.Position) ?? 0;

            var column = new BoardColumn
            {
                Name = dto.Name.Trim(),
                Description = dto.Description?.Trim(),
                Position = maxPosition + 1,
                TeamId = boardId,
                CreatedAt = DateTime.UtcNow
            };

            _context.BoardColumns.Add(column);
            await _context.SaveChangesAsync();

            return MapToColumnResponse(column);
        }

        // <====[ACTUALIZAR COLUMNA]=====>
        public async Task<ColumnResponseDTO> UpdateColumnAsync(int columnId, UpdateColumnDTO dto, int userId)
        {
            var column = await _context.BoardColumns
                .Include(c => c.Team)
                .FirstOrDefaultAsync(c => c.Id == columnId);

            if (column == null)
                throw new Exception("Columna no encontrada");

            // Verificar que sea miembro
            var isMember = await _context.TeamMembers
                .AnyAsync(tm => tm.TeamId == column.TeamId && tm.UserId == userId);

            if (!isMember)
                throw new UnauthorizedAccessException("No tienes acceso a esta columna");

            column.Name = dto.Name.Trim();
            column.Description = dto.Description?.Trim();
            column.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return MapToColumnResponse(column);
        }

        // <====[ELIMINAR COLUMNA]=====>
        public async Task<bool> DeleteColumnAsync(int columnId, int userId)
        {
            var column = await _context.BoardColumns
                .Include(c => c.Team)
                .FirstOrDefaultAsync(c => c.Id == columnId);

            if (column == null)
                return false;

            // Solo el dueño puede eliminar columnas
            if (column.Team.CreatedById != userId)
                throw new UnauthorizedAccessException("Solo el dueño puede eliminar columnas");

            _context.BoardColumns.Remove(column);
            await _context.SaveChangesAsync();
            return true;
        }

        // <====[REORDENAR COLUMNAS]=====>
        public async Task<bool> ReorderColumnsAsync(int boardId, ReorderColumnsDTO dto, int userId)
        {
            // Verificar que sea miembro
            var isMember = await _context.TeamMembers
                .AnyAsync(tm => tm.TeamId == boardId && tm.UserId == userId);

            if (!isMember)
                throw new UnauthorizedAccessException("No tienes acceso a este tablero");

            var columns = await _context.BoardColumns
                .Where(c => c.TeamId == boardId)
                .ToListAsync();

            foreach (var orderItem in dto.Columns)
            {
                var column = columns.FirstOrDefault(c => c.Id == orderItem.Id);
                if (column != null)
                {
                    column.Position = orderItem.Position;
                    column.UpdatedAt = DateTime.UtcNow;
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }

        // <====[MAPEOS]=====>
        private BoardResponseDTO MapToBoardResponse(Team team)
        {
            return new BoardResponseDTO
            {
                Id = team.Id,
                Name = team.Name,
                Description = team.Description,
                CreatedById = team.CreatedById,
                CreatedByName = team.CreatedBy?.Name ?? string.Empty,
                CreatedAt = team.CreatedAt,
                UpdatedAt = team.UpdatedAt,
                MemberCount = team.Members?.Count ?? 0,
                CardCount = team.Columns?.Sum(c => c.Cards?.Count ?? 0) ?? 0,
                Members = team.Members?.Select(m => new BoardMemberDTO
                {
                    UserId = m.UserId,
                    Name = m.User?.Name ?? string.Empty,
                    Email = m.User?.Email ?? string.Empty,
                    AvatarUrl = m.User?.AvatarUrl,
                    Role = m.Role.ToString(),
                    JoinedAt = m.JoinedAt
                }).ToList() ?? new List<BoardMemberDTO>(),
                Columns = team.Columns?.OrderBy(c => c.Position).Select(MapToColumnResponse).ToList() 
                    ?? new List<ColumnResponseDTO>()
            };
        }

        private ColumnResponseDTO MapToColumnResponse(BoardColumn column)
        {
            return new ColumnResponseDTO
            {
                Id = column.Id,
                Name = column.Name,
                Description = column.Description,
                Position = column.Position,
                CardCount = column.Cards?.Count ?? 0,
                CreatedAt = column.CreatedAt,
                UpdatedAt = column.UpdatedAt,
                Cards = column.Cards?.OrderBy(c => c.Position).Select(MapToCardResponse).ToList() 
                    ?? new List<CardResponseDTO>()
            };
        }

        private CardResponseDTO MapToCardResponse(Card card)
        {
            return new CardResponseDTO
            {
                Id = card.Id,
                Title = card.Title,
                Description = card.Description,
                Status = card.Status.ToString(),
                StatusValue = (int)card.Status,
                Position = card.Position,
                DueDate = card.DueDate,
                CreatedAt = card.CreatedAt,
                UpdatedAt = card.UpdatedAt,
                BoardColumnId = card.BoardColumnId,
                BoardColumnName = card.BoardColumn?.Name ?? string.Empty,
                CreatedById = card.CreatedById,
                CreatedByName = card.CreatedBy?.Name ?? string.Empty,
                AssignedUserId = card.AssignedUserId,
                AssignedUserName = card.AssignedUser?.Name,
                AssignedUserAvatarUrl = card.AssignedUser?.AvatarUrl
            };
        }
    }
}