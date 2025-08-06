using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.CreateShippingScheduling;


public static class CreateShippingSchedulingExtensions
{
    public static ShippingScheduling ToShippingScheduling(this CreateShippingSchedulingCommand command)
    {
        if (command is null) throw new ArgumentNullException(nameof(command));

        return new ShippingScheduling
        {
            ShippingSchedulingId = Guid.NewGuid(),
            Address = command.Address,
            Batch = command.Batch,
            CarrierCompany = command.CarrierCompany,
            City = command.City,
            Client = command.Client,
            Code = command.Code,
            Date = command.Date,
            Guide = command.Guide,
            Item = command.Item,
            Notes = command.Notes,
            PurchaseOrder = command.PurchaseOrder,
            Quantity = command.Quantity,
            SalesAdvisor = command.SalesAdvisor,
            SchedulingNotification = command.SchedulingNotification,
            ShipmentNotification = command.ShipmentNotification,
            Warehouse = command.Warehouse,
            Location = command.Location,
            Incident = command.Incident
        };
    }
}