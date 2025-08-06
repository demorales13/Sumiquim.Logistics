using Carter;

using MediatR;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingShipmentNotificationEmail;

public class ShippingSchedulingShipmentNotificationEmailEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/shipping-scheduling/email/shipment", async (ShippingSchedulingShipmentNotificationEmailCommand command, ISender sender) =>
        {
            var result = await sender.Send(command);
            return Results.Ok();
        })
        .WithName("ShippingSchedulingShipmentNotificationEmail")
        .RequireAuthorization("RequireWriteAccess")
        .Produces<ShippingSchedulingShipmentNotificationEmailResponse>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Creates a new email for a shipment")
        .WithDescription("Creates a new email for a shipment");
    }
}