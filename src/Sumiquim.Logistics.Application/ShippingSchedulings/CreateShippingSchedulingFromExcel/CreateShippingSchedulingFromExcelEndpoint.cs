using Carter;

using MediatR;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

using Sumiquim.Logistics.Application.ShippingSchedulings.CreateShippingSchedulingFromExcel;
using Sumiquim.Logistics.Domain.Exceptions;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.CreateShippingScheduling;


public class CreateShippingSchedulingFromExcelEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/shipping-scheduling/excel/create",
        async ([FromForm] CreateShippingSchedulingFromExcelCommand command, ISender sender) =>
        {
            if (command?.File == null || command?.File?.Length == 0)
                throw new BusinessException("Debe seleccionar un archivo válido");

            var result = await sender.Send(command);

            return Results.Created();
        })
        .DisableAntiforgery()
        .RequireAuthorization("RequireWriteAccess")
        .Accepts<IFormFile>("multipart/form-data")
        .WithName("CreateShippingSchedulingFromExcel")
        .Produces(StatusCodes.Status201Created)
        .ProducesProblem(StatusCodes.Status400BadRequest)
        .WithSummary("Import shipping schedulings from an Excel file")
        .WithDescription("Uploads an Excel file and creates new shipping schedulings from its data");
    }
}
