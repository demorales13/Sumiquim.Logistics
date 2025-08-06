using Sumiquim.Logistics.Domain.Models;

namespace Sumiquim.EMail.Sender.Infrastructure.Email;

public interface IEmailService
{
    void SendInvoiceEmail(ShippingEmailFormat format);
}