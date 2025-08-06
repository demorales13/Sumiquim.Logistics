using Microsoft.Extensions.Logging;

using Sumiquim.EMail.Sender.Infrastructure.Email;
using Sumiquim.Logistics.Application.Abstractions.Messaging;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Enum;
using Sumiquim.Logistics.Domain.Models;
using Sumiquim.Logistics.Infrastructure.Repositories;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingReportEmail;

public class ShippingSchedulingReportEmailCommandHandler(
    IShippingSchedulingQueryRepository shippingSchedulingRepository,
    IEmailService emailService,
    ILogger<ShippingSchedulingReportEmailCommandHandler> logger
    )
    : ICommandHandler<ShippingSchedulingReportEmailCommand, ShippingSchedulingReportEmailResponse>
{
    public async Task<ShippingSchedulingReportEmailResponse> Handle(
        ShippingSchedulingReportEmailCommand command,
        CancellationToken cancellationToken)
    {
        var (startDateInt, endDateInt) = ConvertDatesToInt(command.StartDate, command.EndDate);

        var shippings = await GetFilteredShippingsAsync(startDateInt, endDateInt, cancellationToken);

        var emailFormat = BuildEmailFormat(command.StartDate, command.EndDate, shippings);

        emailService.SendInvoiceEmail(emailFormat);

        return new ShippingSchedulingReportEmailResponse(true);
    }

    private static (int Start, int End) ConvertDatesToInt(DateTime startDate, DateTime endDate)
    {
        return (
            int.Parse(startDate.ToString("yyyyMMdd")),
            int.Parse(endDate.ToString("yyyyMMdd"))
        );
    }

    private async Task<List<ShippingScheduling>> GetFilteredShippingsAsync(
        int startDate,
        int endDate,
        CancellationToken cancellationToken)
    {
        var shippings = await shippingSchedulingRepository.GetByDateAsync(startDate, endDate, cancellationToken);
        return shippings
            .Where(x => x.SalesAdvisor != SalesAdvisors.JESSICA.Name).ToList();
    }

    private static ShippingEmailFormat BuildEmailFormat(
        DateTime startDate,
        DateTime endDate,
        List<ShippingScheduling> shippings)
    {
        var emailFormat = new ShippingEmailFormat(
            "Reporte de despachos",
            "template_report.html",
            startDate,
            endDate
        );

        emailFormat.Set(SalesAdvisors.JESSICA.Name, shippings);

        return emailFormat;
    }
}
