using Carter;

using MediatR;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.RemoveShippingScheduling;

public class RemoveShippingSchedulingEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("/shipping-scheduling/{id:guid}",
            async (Guid id, ISender sender) =>
            {
                var result = await sender.Send(new RemoveShippingSchedulingCommand(id));

                return Results.Ok(result);
            })
            .WithName("RemoveShippingScheduling")
            .RequireAuthorization("RequireWriteAccess")
            .Produces<RemoveShippingSchedulingResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .WithSummary("Remove a shipping scheduling")
            .WithDescription("Deletes a shipping scheduling by its unique identifier.");
    }
}