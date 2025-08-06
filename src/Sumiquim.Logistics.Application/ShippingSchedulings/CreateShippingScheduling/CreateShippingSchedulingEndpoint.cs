using Carter;

using MediatR;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.CreateShippingScheduling;


public class CreateShippingSchedulingEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/shipping-scheduling/create", async (CreateShippingSchedulingCommand command, ISender sender) =>
        {
            var result = await sender.Send(command);

            return Results.Created();
        })
        .WithName("CreateShippingScheduling")
        .RequireAuthorization("RequireWriteAccess")
        .Produces(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Create a new shipping scheduling")
        .WithDescription("Creates a new shipping scheduling record and returns the created resource");
    }
}
