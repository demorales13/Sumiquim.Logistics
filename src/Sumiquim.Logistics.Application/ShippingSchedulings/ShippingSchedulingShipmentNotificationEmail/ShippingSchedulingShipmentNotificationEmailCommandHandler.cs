using Microsoft.Extensions.Logging;

using Sumiquim.EMail.Sender.Infrastructure.Email;
using Sumiquim.Logistics.Application.Abstractions.Messaging;
using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Models;
using Sumiquim.Logistics.Infrastructure.Repositories;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingShipmentNotificationEmail;

public class ShippingSchedulingShipmentNotificationEmailCommandHandler(
    IShippingSchedulingQueryRepository shippingSchedulingQueryRepository,
    IShippingSchedulingCommandRepository shippingSchedulingCommandRepository,
    IUnitOfWork unitOfWork,
    IEmailService emailService,
    ILogger<ShippingSchedulingShipmentNotificationEmailCommandHandler> logger
    )
    : ICommandHandler<ShippingSchedulingShipmentNotificationEmailCommand, ShippingSchedulingShipmentNotificationEmailResponse>
{
    public async Task<ShippingSchedulingShipmentNotificationEmailResponse> Handle(
        ShippingSchedulingShipmentNotificationEmailCommand command,
        CancellationToken cancellationToken)
    {
        var shippings = await shippingSchedulingQueryRepository.GetPendingShipmentNotificationAsync(cancellationToken);

        var groupsByAdvisors = shippings
            .Where(x => !string.IsNullOrWhiteSpace(x.Guide))
            .GroupBy(x => x.SalesAdvisor);

        foreach (var group in groupsByAdvisors)
        {
            try
            {
                await SendShipmentNotificationEmailAsync(group.Key!, group.ToList());

                var shippingIds = group.Select(s => s.ShippingSchedulingId).ToList();
                await shippingSchedulingCommandRepository.MarkShipmentNotificationAsSentAsync(shippingIds, cancellationToken);
                await unitOfWork.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error sending email to {group.Key}");
            }
        }

        return new ShippingSchedulingShipmentNotificationEmailResponse(true);
    }

    private Task SendShipmentNotificationEmailAsync(string salesAdvisor, List<ShippingScheduling> shippings)
    {
        var emailFormat = new ShippingEmailFormat(
            "Confirmación de envío de despachos",
            "template_shipment.html"
        );

        emailFormat.Set(salesAdvisor, shippings);
        emailService.SendInvoiceEmail(emailFormat);

        return Task.CompletedTask;
    }
}