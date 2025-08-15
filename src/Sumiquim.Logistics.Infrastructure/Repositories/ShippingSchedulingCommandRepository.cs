using HandlebarsDotNet;

using Microsoft.EntityFrameworkCore;

using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Enum;
using Sumiquim.Logistics.Infrastructure.DbContext;

namespace Sumiquim.Logistics.Infrastructure.Repositories;

public class ShippingSchedulingCommandRepository : Repository<ShippingScheduling>, IShippingSchedulingCommandRepository
{
    private readonly IShippingSchedulingNotifier _notifier;

    public ShippingSchedulingCommandRepository(SumiquimContext dbContext, IShippingSchedulingNotifier notifier) : base(dbContext)
    {
        _notifier = notifier;
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
        await _notifier.NotifyUpdatedAsync();
    }
}