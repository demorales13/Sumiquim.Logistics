using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;

namespace Sumiquim.Logistics.Infrastructure.DbContext.Configuration;

internal sealed class ShippingSchedulingConfiguration : IEntityTypeConfiguration<ShippingScheduling>
{
    public void Configure(EntityTypeBuilder<ShippingScheduling> builder)
    {
        builder.HasKey(x => x.ShippingSchedulingId);

        builder.Property(x => x.Address)
            .HasMaxLength(200);

        builder.Property(x => x.Batch)
            .HasMaxLength(100);

        builder.Property(x => x.CarrierCompany)
            .HasMaxLength(150);

        builder.Property(x => x.City)
            .HasMaxLength(150);

        builder.Property(x => x.Client)
            .HasMaxLength(200);

        builder.Property(x => x.Code)
            .HasMaxLength(200);

        builder.Property(x => x.Date)
            .HasMaxLength(10);

        builder.Property(x => x.Guide)
            .HasMaxLength(100);

        builder.Property(x => x.Item)
            .HasMaxLength(100);

        builder.Property(x => x.Notes)
            .HasMaxLength(2000);

        builder.Property(x => x.PurchaseOrder)
            .HasMaxLength(100);

        builder.Property(x => x.Quantity)
            .HasMaxLength(50);

        builder.Property(x => x.SchedulingNotification)
            .HasMaxLength(10);

        builder.Property(x => x.ShipmentNotification)
            .HasMaxLength(10);

        builder.Property(x => x.Warehouse)
            .HasMaxLength(10);

        builder.Property(x => x.Location)
            .HasMaxLength(10);
    }
}
