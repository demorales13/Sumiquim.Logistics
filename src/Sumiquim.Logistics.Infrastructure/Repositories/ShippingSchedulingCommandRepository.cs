using HandlebarsDotNet;

using Microsoft.EntityFrameworkCore;

using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Enum;
using Sumiquim.Logistics.Infrastructure.DbContext;

namespace Sumiquim.Logistics.Infrastructure.Repositories;

public class ShippingSchedulingCommandRepository : Repository<ShippingScheduling>, IShippingSchedulingCommandRepository
{
    public ShippingSchedulingCommandRepository(SumiquimContext dbContext) : base(dbContext)
    {
    }

    public async Task MarkSchedulingNotificationAsSentAsync(IEnumerable<Guid> shippingIds, CancellationToken cancellationToken)
    {
        if (shippingIds == null || !shippingIds.Any())
            return;

        await DbContext.Set<ShippingScheduling>()
            .Where(s => shippingIds.Contains(s.ShippingSchedulingId))
            .ExecuteUpdateAsync(
                set => set.SetProperty(
                    s => s.SchedulingNotification,
                    ShippingStatus.Sent.Value
                ),
                cancellationToken
            );
    }

    public async Task MarkShipmentNotificationAsSentAsync(IEnumerable<Guid> shippingIds, CancellationToken cancellationToken)
    {
        if (shippingIds == null || !shippingIds.Any())
            return;

        await DbContext.Set<ShippingScheduling>()
            .Where(s => shippingIds.Contains(s.ShippingSchedulingId))
            .ExecuteUpdateAsync(
                set => set.SetProperty(
                    s => s.ShipmentNotification,
                    ShippingStatus.Sent.Value
                ),
                cancellationToken
            );
    }
}