using Carter;
using MediatR;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingReportEmail;

public class ShippingSchedulingReportEmailEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/shipping-scheduling/email/report", async (ShippingSchedulingReportEmailCommand command, ISender sender) =>
        {
            var result = await sender.Send(command);
            return Results.Ok();
        })
        .WithName("ShippingSchedulingReportEmail")
        .RequireAuthorization("RequireWriteAccess")
        .Produces<ShippingSchedulingReportEmailResponse>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Creates a new report email")
        .WithDescription("Creates a new report email");
    }
}