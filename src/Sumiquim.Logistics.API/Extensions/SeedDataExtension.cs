using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using Sumiquim.Logistics.Domain.Entities.Users;

namespace Sumiquim.Logistics.API.Extensions;

public static class SeedDataExtension
{
    public static async Task SeedDataAsync(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var seeder = scope.ServiceProvider.GetRequiredService<IdentityDataSeeder>();
        await seeder.SeedAsync();
    }
}

public class IdentityDataSeeder
{
    private readonly UserManager<SumiquimUser> _userManager;
    private readonly RoleManager<SumiquimRole> _roleManager;

    public IdentityDataSeeder(UserManager<SumiquimUser> userManager, RoleManager<SumiquimRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task SeedAsync()
    {
        if (await _userManager.Users.AnyAsync())
            return;

        // Roles
        var roles = new[] { "Planeador", "Operador" };

        foreach (var role in roles)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new SumiquimRole { Name = role });
            }
        }

        // Planner user
        var plannerEmail = "planeador@sumiquim.com";
        var plannerUser = await _userManager.FindByEmailAsync(plannerEmail);

        if (plannerUser == null)
        {
            plannerUser = new SumiquimUser
            {
                Name = "Andres",
                LastName = "Iniesta",
                UserName = "planeador@sumiquim.com",
                Email = plannerEmail,
                EmailConfirmed = true
            };

            await _userManager.CreateAsync(plannerUser, "Planeador123*");
            await _userManager.AddToRoleAsync(plannerUser, "Planeador");
        }

        // Operator user
        var operatorEmail = "operador@sumiquim.com";
        var operatorUser = await _userManager.FindByEmailAsync(operatorEmail);

        if (operatorUser == null)
        {
            operatorUser = new SumiquimUser
            {
                Name = "Xabi",
                LastName = "Hernandez",
                UserName = "operador@sumiquim.com",
                Email = operatorEmail,
                EmailConfirmed = true
            };

            await _userManager.CreateAsync(operatorUser, "Operador123*");
            await _userManager.AddToRoleAsync(operatorUser, "Operador");
        }
    }
}
