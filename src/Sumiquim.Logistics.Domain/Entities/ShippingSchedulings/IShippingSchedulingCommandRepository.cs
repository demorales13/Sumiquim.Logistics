using Sumiquim.Logistics.Domain.Abstractions;

namespace Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;

public interface IShippingSchedulingCommandRepository : IRepository<ShippingScheduling>
{
    Task MarkSchedulingNotificationAsSentAsync(IEnumerable<Guid> shippingIds, CancellationToken cancellationToken);
    Task MarkShipmentNotificationAsSentAsync(IEnumerable<Guid> shippingIds, CancellationToken cancellationToken);
}
