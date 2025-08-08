using Carter;

using MediatR;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

using Sumiquim.Logistics.Application.Helpers;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingQuery;

public class GetShippingSchedulingQueryEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/shipping-scheduling", async (
            [AsParameters] GetShippingSchedulingQuery query, ISender sender) =>
        {
            var result = await sender.Send(query);
            return ResponseHelper.Ok(result);
        })
        .WithName("GetShippingSchedulingQuery")
        .RequireAuthorization("RequireReadAccess")
        .Produces<List<ShippingScheduling>>(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Retrieve shipping schedulings")
        .WithDescription("Retrieve shipping schedulings");
    }
}
