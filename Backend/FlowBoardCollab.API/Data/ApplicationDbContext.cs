using FlowBoardCollab.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FlowBoardCollab.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Team> Teams => Set<Team>();
        public DbSet<TeamMember> TeamMembers => Set<TeamMember>();
        public DbSet<BoardColumn> BoardColumns => Set<BoardColumn>();
        public DbSet<Card> Cards => Set<Card>();
        public DbSet<PasswordResetToken> PasswordResetTokens => Set<PasswordResetToken>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // <====[CONFIGURACIÓN DE USUARIOS]=====>
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // <====[CONFIGURACIÓN DE TEAM MEMBERS]=====>
            modelBuilder.Entity<TeamMember>()
                .HasIndex(tm => new { tm.TeamId, tm.UserId })
                .IsUnique();

            // <====[CONFIGURACIÓN DE TEAM]=====>
            modelBuilder.Entity<Team>()
                .HasOne(t => t.CreatedBy)
                .WithMany()
                .HasForeignKey(t => t.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TeamMember>()
                .HasOne(tm => tm.Team)
                .WithMany(t => t.Members)
                .HasForeignKey(tm => tm.TeamId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TeamMember>()
                .HasOne(tm => tm.User)
                .WithMany(u => u.TeamMemberships)
                .HasForeignKey(tm => tm.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // <====[CONFIGURACIÓN DE BOARD COLUMNS]=====>
            modelBuilder.Entity<BoardColumn>()
                .HasOne(bc => bc.Team)
                .WithMany(t => t.Columns)
                .HasForeignKey(bc => bc.TeamId)
                .OnDelete(DeleteBehavior.Cascade);

            // <====[CONFIGURACIÓN DE CARDS]=====>
            modelBuilder.Entity<Card>()
                .HasOne(c => c.BoardColumn)
                .WithMany(bc => bc.Cards)
                .HasForeignKey(c => c.BoardColumnId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Card>()
                .HasOne(c => c.CreatedBy)
                .WithMany(u => u.CreatedCards)
                .HasForeignKey(c => c.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Card>()
                .HasOne(c => c.AssignedUser)
                .WithMany(u => u.AssignedCards)
                .HasForeignKey(c => c.AssignedUserId)
                .OnDelete(DeleteBehavior.SetNull);

            // <====[CONFIGURACIÓN DE PASSWORD RESET TOKENS]=====>
            modelBuilder.Entity<PasswordResetToken>()
                .HasOne(prt => prt.User)
                .WithMany(u => u.PasswordResetTokens)
                .HasForeignKey(prt => prt.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}