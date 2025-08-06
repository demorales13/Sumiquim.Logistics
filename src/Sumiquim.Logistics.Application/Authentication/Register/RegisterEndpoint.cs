using Carter;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;

using Sumiquim.Logistics.Domain.Entities.Users;

namespace Sumiquim.Logistics.Application.Authentication.Register;

public class RegisterEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/register", async (UserManager<SumiquimUser> userManager, RoleManager<SumiquimRole> roleManager, RegisterRequest request) =>
        {
            var user = new SumiquimUser
            {
                UserName = request.Username,
                Email = request.Email
            };

            var result = await userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                return Results.BadRequest(result.Errors);
            }

            // Ensure role exists
            if (!await roleManager.RoleExistsAsync(request.Role))
            {
                await roleManager.CreateAsync(new SumiquimRole { Name = request.Role });
            }

            await userManager.AddToRoleAsync(user, request.Role);

            return Results.Ok();
        })
        .WithSummary("Register a new user")
        .WithDescription("Registers a new user and assigns a role: Planner or Operator");
    }
}

