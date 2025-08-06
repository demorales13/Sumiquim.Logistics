using Carter;
using MediatR;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingsNotificationEmail;

public class ShippingSchedulingsScheduledNotificationEmailEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/shipping-scheduling/email/scheduled", async (ShippingSchedulingsScheduledNotificationEmailCommand command, ISender sender) =>
        {
            var result = await sender.Send(command);
            return Results.Ok();
        })
        .WithName("ShippingSchedulingsScheduledNotificationEmail")
        .RequireAuthorization("RequireWriteAccess")
        .Produces<ShippingSchedulingsScheduledNotificationEmailResponse>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Creates a new email for a scheduled shipping")
        .WithDescription("Creates a new email for a scheduled shipping");
    }
}