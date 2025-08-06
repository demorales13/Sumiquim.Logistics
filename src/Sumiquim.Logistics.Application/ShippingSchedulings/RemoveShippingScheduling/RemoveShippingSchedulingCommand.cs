using Sumiquim.Logistics.Application.Abstractions.Messaging;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.RemoveShippingScheduling;

public record RemoveShippingSchedulingCommand(Guid Id) : ICommand<RemoveShippingSchedulingResponse>;
