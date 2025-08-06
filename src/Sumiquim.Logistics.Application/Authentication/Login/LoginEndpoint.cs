using Carter;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;

using Sumiquim.Logistics.Application.Abstractions;
using Sumiquim.Logistics.Domain.Entities.Users;

namespace Sumiquim.Logistics.Application.Authentication.Login;

public class LoginEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/login", async (UserManager<SumiquimUser> userManager, IJwtTokenGenerator tokenGenerator, LoginRequest request) =>
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user == null || !await userManager.CheckPasswordAsync(user, request.Password))
            {
                return Results.Unauthorized();
            }

            var roles = await userManager.GetRolesAsync(user);
            var token = tokenGenerator.GenerateToken(user, roles);

            return Results.Ok(new { Token = token });
        })
        .WithSummary("Login user")
        .WithDescription("Logs in a user and returns a JWT token.");
    }
}

