using Sumiquim.Logistics.Application.Abstractions.Messaging;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingByDateQuery;

public record ShippingSchedulingsByDateQuery(int date) : IQuery<IReadOnlyList<ShippingScheduling?>>; 

