using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HR_Review.Models
{
    public partial class HR_ReviewDBContext : DbContext
    {
        public HR_ReviewDBContext()
        {
        }

        public HR_ReviewDBContext(DbContextOptions<HR_ReviewDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<PerformanceReview> PerformanceReview { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<VPerformance> VPerformance { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=HR_ReviewDB;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PerformanceReview>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AssignDate).HasColumnType("datetime");

                entity.Property(e => e.Performance)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.ReviewDate).HasColumnType("datetime");

                entity.HasOne(d => d.Reviewer)
                    .WithMany(p => p.PerformanceReviewReviewer)
                    .HasForeignKey(d => d.ReviewerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PerformanceReview_ReviewerId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.PerformanceReviewUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PerformanceReview_UserId");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DepartmentName).HasMaxLength(50);

                entity.Property(e => e.EmailAddress).HasMaxLength(50);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<VPerformance>(entity =>
            {
                entity.HasNoKey();
                entity.Property(e => e.id).HasColumnName("id");
                entity.Property(e => e.ReviewerId).HasColumnName("ReviewerId");
                entity.Property(e => e.ReviewerName).HasColumnName("ReviewerName");
                entity.Property(e => e.UserName).HasColumnName("UserName");
                entity.Property(e => e.Performance).HasColumnName("Performance");
                entity.Property(e => e.AssignDate).HasColumnName("AssignDate");
                entity.Property(e => e.ReviewDate).HasColumnName("ReviewDate");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
