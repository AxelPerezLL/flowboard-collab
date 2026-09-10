using FlowBoardCollab.API.Data;
using FlowBoardCollab.API.DTOs;
using FlowBoardCollab.API.Models;
using FlowBoardCollab.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FlowBoardCollab.API.Services
{
    public class CardService : ICardService
    {
        private readonly ApplicationDbContext _context;

        public CardService(ApplicationDbContext context)
        {
            _context = context;
        }

        // <====[CREAR TARJETA]=====>
        // Cualquier miembro del tablero puede crear tarjetas
        public async Task<CardResponseDTO> CreateCardAsync(int boardId, CreateCardDTO dto, int userId)
        {
            // Verificar que sea miembro del tablero
            var isMember = await _context.TeamMembers
                .AnyAsync(tm => tm.TeamId == boardId && tm.UserId == userId);

            if (!isMember)
                throw new UnauthorizedAccessException("No tienes acceso a este tablero");

            // Verificar que la columna pertenezca al tablero
            var column = await _context.BoardColumns
                .FirstOrDefaultAsync(c => c.Id == dto.BoardColumnId && c.TeamId == boardId);

            if (column == null)
                throw new Exception("La columna no pertenece a este tablero");

            // <====[SOLO EL DUEÑO PUEDE ASIGNAR]=====>
            var team = await _context.Teams.FindAsync(boardId);
            if (dto.AssignedUserId.HasValue && team?.CreatedById != userId)
                throw new UnauthorizedAccessException("Solo el dueño del tablero puede asignar tarjetas");

            // Verificar que el usuario asignado sea miembro
            if (dto.AssignedUserId.HasValue)
            {
                var isAssigneeMember = await _context.TeamMembers
                    .AnyAsync(tm => tm.TeamId == boardId && tm.UserId == dto.AssignedUserId.Value);

                if (!isAssigneeMember)
                    throw new Exception("El usuario asignado no es miembro del tablero");
            }

            var maxPosition = await _context.Cards
                .Where(c => c.BoardColumnId == dto.BoardColumnId)
                .MaxAsync(c => (int?)c.Position) ?? 0;

            var card = new Card
            {
                Title = dto.Title.Trim(),
                Description = dto.Description?.Trim(),
                BoardColumnId = dto.BoardColumnId,
                CreatedById = userId,
                AssignedUserId = dto.AssignedUserId,
                DueDate = dto.DueDate,
                Status = CardStatus.Pending,
                Position = maxPosition + 1,
                CreatedAt = DateTime.UtcNow
            };

            _context.Cards.Add(card);
            await _context.SaveChangesAsync();

            return await GetCardByIdAsync(card.Id, userId) 
                ?? throw new Exception("Error al crear la tarjeta");
        }

        // <====[OBTENER TARJETA POR ID]=====>
        public async Task<CardResponseDTO?> GetCardByIdAsync(int cardId, int userId)
        {
            var card = await _context.Cards
                .Include(c => c.BoardColumn).ThenInclude(bc => bc.Team)
                .Include(c => c.CreatedBy)
                .Include(c => c.AssignedUser)
                .FirstOrDefaultAsync(c => c.Id == cardId);

            if (card == null)
                return null;

            // Verificar que sea miembro del tablero
            var isMember = await _context.TeamMembers
                .AnyAsync(tm => tm.TeamId == card.BoardColumn.TeamId && tm.UserId == userId);

            if (!isMember)
                throw new UnauthorizedAccessException("No tienes acceso a esta tarjeta");

            return MapToCardResponse(card);
        }

        // <====[ACTUALIZAR TARJETA]=====>
        // Solo el usuario ASIGNADO puede modificar la tarjeta
        public async Task<CardResponseDTO> UpdateCardAsync(int cardId, UpdateCardDTO dto, int userId)
        {
            var card = await _context.Cards
                .Include(c => c.BoardColumn).ThenInclude(bc => bc.Team)
                .FirstOrDefaultAsync(c => c.Id == cardId);

            if (card == null)
                throw new Exception("Tarjeta no encontrada");

            // <====[SOLO EL ASIGNADO PUEDE MODIFICAR]=====>
            if (card.AssignedUserId != userId)
                throw new UnauthorizedAccessException("Solo el usuario asignado puede modificar esta tarjeta");

            card.Title = dto.Title.Trim();
            card.Description = dto.Description?.Trim();
            card.DueDate = dto.DueDate;
            
            if (dto.Status.HasValue)
                card.Status = dto.Status.Value;

            card.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetCardByIdAsync(cardId, userId) 
                ?? throw new Exception("Error al actualizar la tarjeta");
        }

        // <====[ELIMINAR TARJETA]=====>
        // Solo el dueño del tablero o el creador de la tarjeta puede eliminarla
        public async Task<bool> DeleteCardAsync(int cardId, int userId)
        {
            var card = await _context.Cards
                .Include(c => c.BoardColumn).ThenInclude(bc => bc.Team)
                .FirstOrDefaultAsync(c => c.Id == cardId);

            if (card == null)
                return false;

            var isOwner = card.BoardColumn.Team.CreatedById == userId;
            var isCreator = card.CreatedById == userId;

            if (!isOwner && !isCreator)
                throw new UnauthorizedAccessException("No tienes permiso para eliminar esta tarjeta");

            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();
            return true;
        }

        // <====[MOVER TARJETA ENTRE COLUMNAS]=====>
        // Solo el usuario asignado puede mover la tarjeta
        public async Task<CardResponseDTO> MoveCardAsync(int cardId, MoveCardDTO dto, int userId)
        {
            var card = await _context.Cards
                .Include(c => c.BoardColumn).ThenInclude(bc => bc.Team)
                .FirstOrDefaultAsync(c => c.Id == cardId);

            if (card == null)
                throw new Exception("Tarjeta no encontrada");

            // <====[SOLO EL ASIGNADO PUEDE MOVER]=====>
            if (card.AssignedUserId != userId)
                throw new UnauthorizedAccessException("Solo el usuario asignado puede mover esta tarjeta");

            // Verificar que la columna destino pertenezca al mismo tablero
            var targetColumn = await _context.BoardColumns
                .FirstOrDefaultAsync(c => c.Id == dto.BoardColumnId 
                    && c.TeamId == card.BoardColumn.TeamId);

            if (targetColumn == null)
                throw new Exception("La columna destino no pertenece a este tablero");

            card.BoardColumnId = dto.BoardColumnId;
            card.Position = dto.Position;
            card.UpdatedAt = DateTime.UtcNow;

            // <====[ACTUALIZAR ESTADO SEGÚN LA COLUMNA]=====>
            card.Status = targetColumn.Name.ToLower() switch
            {
                var name when name.Contains("espera") => CardStatus.Pending,
                var name when name.Contains("proceso") => CardStatus.InProgress,
                var name when name.Contains("terminada") => CardStatus.Done,
                _ => card.Status
            };

            await _context.SaveChangesAsync();

            return await GetCardByIdAsync(cardId, userId) 
                ?? throw new Exception("Error al mover la tarjeta");
        }

        // <====[ASIGNAR TARJETA]=====>
        // Solo el dueño del tablero puede asignar
        public async Task<CardResponseDTO> AssignCardAsync(int cardId, AssignCardDTO dto, int userId)
        {
            var card = await _context.Cards
                .Include(c => c.BoardColumn).ThenInclude(bc => bc.Team)
                .FirstOrDefaultAsync(c => c.Id == cardId);

            if (card == null)
                throw new Exception("Tarjeta no encontrada");

            // <====[SOLO EL DUEÑO PUEDE ASIGNAR]=====>
            if (card.BoardColumn.Team.CreatedById != userId)
                throw new UnauthorizedAccessException("Solo el dueño del tablero puede asignar tarjetas");

            // Verificar que el usuario asignado sea miembro
            var isMember = await _context.TeamMembers
                .AnyAsync(tm => tm.TeamId == card.BoardColumn.TeamId 
                    && tm.UserId == dto.AssignedUserId);

            if (!isMember)
                throw new Exception("El usuario no es miembro de este tablero");

            card.AssignedUserId = dto.AssignedUserId;
            card.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetCardByIdAsync(cardId, userId) 
                ?? throw new Exception("Error al asignar la tarjeta");
        }

        // <====[OBTENER TARJETAS POR COLUMNA]=====>
        public async Task<List<CardResponseDTO>> GetCardsByColumnAsync(int columnId, int userId)
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

            var cards = await _context.Cards
                .Where(c => c.BoardColumnId == columnId)
                .Include(c => c.BoardColumn)
                .Include(c => c.CreatedBy)
                .Include(c => c.AssignedUser)
                .OrderBy(c => c.Position)
                .ToListAsync();

            return cards.Select(MapToCardResponse).ToList();
        }

        // <====[MAPEO]=====>
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