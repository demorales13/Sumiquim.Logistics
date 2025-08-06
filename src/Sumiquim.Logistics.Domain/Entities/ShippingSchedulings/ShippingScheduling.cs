namespace Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;

public class ShippingScheduling
{
    public Guid ShippingSchedulingId { get; set; }

    public string? Address { get; set; }

    public string? Batch { get; set; }

    public string? CarrierCompany { get; set; }

    public string? City { get; set; }

    public string? Client { get; set; }

    public string? Code { get; set; }

    public int? Date { get; set; }

    public string? Guide { get; set; }

    public string? Item { get; set; }

    public string? Notes { get; set; }

    public string? PurchaseOrder { get; set; }

    public string? Quantity { get; set; }    
    
    public string? SalesAdvisor { get; set; }

    public string? SchedulingNotification { get; set; }

    public string? ShipmentNotification { get; set; }

    public string? Warehouse { get; set; }

    public string? Location { get; set; }

    public string? Incident { get; set; }
}
