using Carter;

using MediatR;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.UpdateShippingScheduling;


public class UpdateShippingSchedulingEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/shipping-scheduling/{id}", async (UpdateShippingScheduling request, Guid id, ISender sender) =>
        {
            var command = new UpdateShippingSchedulingCommand(id, request);
            var result = await sender.Send(command);

            return Results.Ok();
        })
        .WithName("UpdateShippingScheduling")
        .RequireAuthorization("RequireWriteAccess")
        .Produces(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Create a new shipping scheduling")
        .WithDescription("Creates a new shipping scheduling record and returns the created resource");
    }
}
