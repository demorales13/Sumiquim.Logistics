using Microsoft.Extensions.Logging;

using Sumiquim.EMail.Sender.Infrastructure.Email;
using Sumiquim.Logistics.Application.Abstractions.Messaging;
using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Infrastructure.Repositories;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingsNotificationEmail;

public class ShippingSchedulingsScheduledNotificationEmailCommandHandler(
    IShippingSchedulingQueryRepository shippingSchedulingQueryRepository,
    IShippingSchedulingCommandRepository shippingSchedulingCommandRepository,
    IUnitOfWork unitOfWork,
    IEmailService emailService,
    ILogger<ShippingSchedulingsScheduledNotificationEmailCommandHandler> logger
    )
    : ICommandHandler<ShippingSchedulingsScheduledNotificationEmailCommand, ShippingSchedulingsScheduledNotificationEmailResponse>
{
    public async Task<ShippingSchedulingsScheduledNotificationEmailResponse> Handle(
        ShippingSchedulingsScheduledNotificationEmailCommand command,
        CancellationToken cancellationToken)
    {
        var shippings = await shippingSchedulingQueryRepository.GetPendingSchedulingNotificationAsync(cancellationToken);
        var groupsByAdvisors = shippings.GroupBy(x => x.SalesAdvisor);

        foreach (var group in groupsByAdvisors)
        {
            try
            {
                //var emailFormat = new ShippingEmailFormat("Confirmación de programación de despachos", "template_scheduled.html");
                //emailFormat.Set(group.Key!, group.ToList());

                //emailService.SendInvoiceEmail(emailFormat);

                var shippingIds = shippings.Select(s => s.ShippingSchedulingId).ToList();

                await shippingSchedulingCommandRepository.MarkSchedulingNotificationAsSentAsync(shippingIds, cancellationToken);
                await unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Error sending email to {group.Key}");
            }
        }

        return new ShippingSchedulingsScheduledNotificationEmailResponse(true);
    }
}
