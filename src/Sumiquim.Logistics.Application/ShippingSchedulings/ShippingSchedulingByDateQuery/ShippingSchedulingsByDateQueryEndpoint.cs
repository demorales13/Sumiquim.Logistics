using Carter;

using MediatR;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

using Sumiquim.Logistics.Application.Helpers;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingByDateQuery;

public class ShippingSchedulingsByDateQueryEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/shipping-scheduling/date/{date}",
        async (int date, ISender sender) =>
        {
            var query = new ShippingSchedulingsByDateQuery(date);
            var result = await sender.Send(query);

            return ResponseHelper.Ok(result);
        })
        .WithName("ShippingSchedulingsByDateQuery")
        .RequireAuthorization("RequireReadAccess")
        .Produces(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Retrieve shipping schedulings by date")
        .WithDescription("Retrieves a list of shipping schedulings for the specified date");
    }
}