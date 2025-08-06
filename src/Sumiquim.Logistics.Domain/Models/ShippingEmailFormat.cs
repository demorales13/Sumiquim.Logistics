using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Enum;

using System.Globalization;

namespace Sumiquim.Logistics.Domain.Models;

public class ShippingEmailFormat
{
    public ShippingEmailFormat(string subject, string template)
    {
        Subject = subject;
        Template = template;
    }

    public ShippingEmailFormat(string subject, string template, DateTime startDate, DateTime endDate)
    {
        Subject = subject;
        Template = template;

        var culture = new CultureInfo("es-ES");
        StartDate = startDate.ToString("dd 'de' MMMM", culture);
        EndDate = endDate.ToString("dd 'de' MMMM", culture);
    }

    public void Set(string advisorSalesName, List<ShippingScheduling> shippingSchedulings)
    {
        var salesAdvisor = SalesAdvisors.FindClosestMatchByName(advisorSalesName);
        Name = salesAdvisor.ShortName;
        Email = salesAdvisor.Email;

        foreach (var shippingScheduling in shippingSchedulings)
        {
            Shippings.Add(new ShippingSchedulingEmailFormat(shippingScheduling));
        }
    }

    public string? Subject { get; private set; }
    public string? Template { get; private set; }
    public string? Name { get; private set; }
    public string? Email { get; private set; }
    public string? StartDate { get; private set; } = null;
    public string? EndDate { get; private set; } = null;
    public List<ShippingSchedulingEmailFormat> Shippings { get; private set; } = new List<ShippingSchedulingEmailFormat>();
}

public class ShippingSchedulingEmailFormat
{
    public ShippingSchedulingEmailFormat(ShippingScheduling shippingScheduling)
    {
        Address = shippingScheduling.Address;
        Batch = shippingScheduling.Batch;
        CarrierCompany = shippingScheduling.CarrierCompany;
        City = shippingScheduling.City;
        Client = shippingScheduling.Client;
        Code = shippingScheduling.Code;
        Date = shippingScheduling.Date;
        Guide = shippingScheduling.Guide;
        Item = shippingScheduling.Item;
        Notes = shippingScheduling.Notes;
        PurchaseOrder = shippingScheduling.PurchaseOrder;
        Quantity = shippingScheduling.Quantity;
        SalesAdvisor = shippingScheduling.SalesAdvisor;
        SchedulingNotification = shippingScheduling.SchedulingNotification;
        ShipmentNotification = shippingScheduling.ShipmentNotification;
        Warehouse = shippingScheduling.Warehouse;

        IsAlDiaPaqueteo = CarrierCompany == CarrierCompanies.ALDIA_PAQUETEO.Name;
        IsIcoltrans = CarrierCompany == CarrierCompanies.ICOLTRANS.Name;
    }

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
    public bool IsAlDiaPaqueteo { get; private set; }
    public bool IsIcoltrans { get; private set; }
}
