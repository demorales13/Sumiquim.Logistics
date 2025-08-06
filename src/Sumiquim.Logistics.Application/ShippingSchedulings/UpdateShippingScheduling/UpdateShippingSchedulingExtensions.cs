using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.UpdateShippingScheduling;


public static class UpdateShippingSchedulingExtensions
{
    public static ShippingScheduling ToShippingScheduling(this UpdateShippingScheduling value)
    {
        if (value is null) throw new ArgumentNullException(nameof(value));

        return new ShippingScheduling
        {
            ShippingSchedulingId = Guid.NewGuid(),
            Address = value.Address,
            Batch = value.Batch,
            CarrierCompany = value.CarrierCompany,
            City = value.City,
            Client = value.Client,
            Code = value.Code,
            Date = value.Date,
            Guide = value.Guide,
            Item = value.Item,
            Notes = value.Notes,
            PurchaseOrder = value.PurchaseOrder,
            Quantity = value.Quantity,
            SalesAdvisor = value.SalesAdvisor,
            SchedulingNotification = value.SchedulingNotification,
            ShipmentNotification = value.ShipmentNotification,
            Warehouse = value.Warehouse,
            Location = value.Location,
            Incident = value.Incident
        };
    }
}