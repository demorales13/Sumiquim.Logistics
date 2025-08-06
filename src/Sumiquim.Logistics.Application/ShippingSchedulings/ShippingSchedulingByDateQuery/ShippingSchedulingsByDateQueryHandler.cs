using Sumiquim.Logistics.Application.Abstractions.Messaging;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Exceptions;
using Sumiquim.Logistics.Infrastructure.Repositories;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingByDateQuery;

public class ShippingSchedulingsByDateQueryHandler(IShippingSchedulingQueryRepository shippingSchedulingQueryRepository)
    : IQueryHandler<ShippingSchedulingsByDateQuery, IReadOnlyList<ShippingScheduling?>>
{
    public async Task<IReadOnlyList<ShippingScheduling?>> Handle(ShippingSchedulingsByDateQuery request, CancellationToken cancellationToken)
    {
        var shippingSchedulings = await shippingSchedulingQueryRepository
            .GetByDateAsync(request.date, cancellationToken);

        return shippingSchedulings is null
            ? throw new QueryNotFoundException($"No se encontraron programaciones de envíos para la fecha {request.date}.")
            : shippingSchedulings.ToList();
    }
}
