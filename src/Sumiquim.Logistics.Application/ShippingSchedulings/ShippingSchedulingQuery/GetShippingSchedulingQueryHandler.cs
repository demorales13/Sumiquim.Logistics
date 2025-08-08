using MediatR;

using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Infrastructure.Repositories;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingQuery;

public sealed class GetShippingSchedulingQueryHandler(IShippingSchedulingQueryRepository shippingSchedulingQueryRepository)
    : IRequestHandler<GetShippingSchedulingQuery, List<ShippingScheduling>>
{

    public async Task<List<ShippingScheduling>> Handle(GetShippingSchedulingQuery request, CancellationToken cancellationToken)
    {
        var (sql, parameters) = ShippingSchedulingSqlBuilder.Build(request);

        var response = await shippingSchedulingQueryRepository.GetAsync(sql, parameters, cancellationToken);

        return response?.ToList() ?? new List<ShippingScheduling>();
    }
}
