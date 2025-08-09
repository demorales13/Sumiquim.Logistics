using Microsoft.AspNetCore.SignalR;

using Sumiquim.Logistics.Domain.Abstractions;

namespace Sumiquim.Logistics.Infrastructure.Notifiers.ShippingScheduling;

public class ShippingSchedulingNotifier : IShippingSchedulingNotifier
{
    private readonly IHubContext<ShippingSchedulingHub> _hubContext;

    public ShippingSchedulingNotifier(IHubContext<ShippingSchedulingHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task NotifyUpdatedAsync()
    {
        await _hubContext.Clients.All.SendAsync("ShippingSchedulingUpdated");
    }
}
