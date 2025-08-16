
using Microsoft.EntityFrameworkCore;

using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;

namespace Sumiquim.Logistics.Utilities.Migration;

public class SumiquimContext : DbContext
{
    public DbSet<ShippingScheduling> ShippingSchedulings => Set<ShippingScheduling>();

    protected override void OnConfiguring(DbContextOptionsBuilder b)
        => b.UseSqlServer("Server=localhost;Database=Logistics;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<ShippingScheduling>(e =>
        {
            e.HasKey(x => x.ShippingSchedulingId);
            e.Property(x => x.CreatedAt)
             .HasDefaultValueSql("GETUTCDATE()")
             .ValueGeneratedOnAdd();
        });
    }
}