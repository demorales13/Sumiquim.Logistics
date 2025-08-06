using Sumiquim.Logistics.Application.Abstractions.Messaging;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.CreateShippingScheduling;

public record CreateShippingSchedulingCommand(
    string? Address,
    string? Batch,
    string? CarrierCompany,
    string? City,
    string? Client,
    string? Code,
    int? Date,
    string? Guide,
    string? Item,
    string? Notes,
    string? PurchaseOrder,
    string? Quantity,
    string? SalesAdvisor,
    string? SchedulingNotification,
    string? ShipmentNotification,
    string? Warehouse,
    string? Location,
    string? Incident
) : ICommand<CreateShippingSchedulingResponse>;
