using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;

namespace Sumiquim.Logistics.Infrastructure.Repositories
{
    public interface IShippingSchedulingQueryRepository
    {
        Task<IEnumerable<ShippingScheduling>?> GetByDateAsync(int date, CancellationToken cancellationToken);
        Task<IEnumerable<ShippingScheduling>?> GetByDateAsync(int startDate, int endDate, CancellationToken cancellationToken);
        Task<IEnumerable<ShippingScheduling>?> GetPendingSchedulingNotificationAsync(CancellationToken cancellationToken);
        Task<IEnumerable<ShippingScheduling>?> GetPendingShipmentNotificationAsync(CancellationToken cancellationToken);
        Task<ShippingScheduling?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    }
}