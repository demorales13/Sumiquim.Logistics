using Carter;

using MediatR;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

using Sumiquim.Logistics.Application.Helpers;

namespace Sumiquim.Logistics.Application.Authentication.Login;

public class LoginEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/login", 
            async (LoginCommand command, ISender sender) =>
        {
            var result = await sender.Send(command);

            return ResponseHelper.Ok(result);
        })
        .WithSummary("Login user")
        .WithDescription("Logs in a user and returns a JWT token.");
    }
}
