using Sumiquim.Logistics.Application.Abstractions.Messaging;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingReportEmail;

public record ShippingSchedulingReportEmailCommand(
    DateTime StartDate,
    DateTime EndDate
) : ICommand<ShippingSchedulingReportEmailResponse>;
