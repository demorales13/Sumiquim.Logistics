using MediatR;

using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingQuery;

public class GetShippingSchedulingQuery : IRequest<List<ShippingScheduling>>
{
    public string? Client { get; set; }
    public string? City { get; set; }
    public string? CarrierCompany { get; set; }
    public DateTime? Date { get; set; }
    public string? Code { get; set; }
    public string? PurchaseOrder { get; set; }
    public string? SchedulingNotification { get; set; }
    public string? ShipmentNotification { get; set; }
}
