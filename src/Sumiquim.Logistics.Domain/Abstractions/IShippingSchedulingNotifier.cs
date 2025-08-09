namespace Sumiquim.Logistics.Domain.Abstractions;

public interface IShippingSchedulingNotifier
{
    Task NotifyUpdatedAsync();
}
