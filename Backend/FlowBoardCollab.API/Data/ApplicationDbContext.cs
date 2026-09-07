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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración de índices únicos
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Configuración de TeamMember
            modelBuilder.Entity<TeamMember>()
                .HasIndex(tm => new { tm.TeamId, tm.UserId })
                .IsUnique();

            // Configuración de eliminación en cascada
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
        }
    }
}