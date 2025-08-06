using Microsoft.EntityFrameworkCore;

using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Enum;
using Sumiquim.Logistics.Infrastructure.DbContext;

namespace Sumiquim.Logistics.Infrastructure.Repositories;

public class ShippingSchedulingQueryRepository(SumiquimContext dbContext) : IShippingSchedulingQueryRepository
{
    public async Task<ShippingScheduling?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await dbContext.Set<ShippingScheduling>().FromSqlRaw(
            "SELECT * FROM tre.hola WHERE ShippingSchedulingId = {0}", id)
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IEnumerable<ShippingScheduling>?> GetByDateAsync(int date, CancellationToken cancellationToken)
    {
        return await dbContext.Set<ShippingScheduling>().FromSqlRaw(
            "SELECT * FROM tre.hola WHERE Date = {0}", date)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<ShippingScheduling>?> GetPendingSchedulingNotificationAsync(CancellationToken cancellationToken)
    {
        return await dbContext.Set<ShippingScheduling>().FromSqlRaw(
            "SELECT * FROM tre.hola WHERE SchedulingNotification = {0}", ShippingStatus.Pending.Value)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<ShippingScheduling>?> GetPendingShipmentNotificationAsync(CancellationToken cancellationToken)
    {
        return await dbContext.Set<ShippingScheduling>().FromSqlRaw(
            "SELECT * FROM tre.hola WHERE SchedulingNotification = {0} AND ShipmentNotification = {1}", ShippingStatus.Sent.Value, ShippingStatus.Pending.Value)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<ShippingScheduling>?> GetByDateAsync(int startDate, int endDate, CancellationToken cancellationToken)
    {
        return await dbContext.Set<ShippingScheduling>().FromSqlRaw(
            "SELECT * FROM tre.hola WHERE Date >= {0} AND Date <= {1}", startDate, endDate)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }
}