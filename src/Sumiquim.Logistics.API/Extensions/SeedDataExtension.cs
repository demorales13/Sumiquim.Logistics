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
        var roles = new[] { "Planner", "Operator" };

        foreach (var role in roles)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new SumiquimRole { Name = role });
            }
        }

        // Planner user
        var plannerEmail = "planner@sumiquim.com";
        var plannerUser = await _userManager.FindByEmailAsync(plannerEmail);

        if (plannerUser == null)
        {
            plannerUser = new SumiquimUser
            {
                UserName = "planner@sumiquim.com",
                Email = plannerEmail,
                EmailConfirmed = true
            };

            await _userManager.CreateAsync(plannerUser, "Planner123*");
            await _userManager.AddToRoleAsync(plannerUser, "Planner");
        }

        // Operator user
        var operatorEmail = "operator@sumiquim.com";
        var operatorUser = await _userManager.FindByEmailAsync(operatorEmail);

        if (operatorUser == null)
        {
            operatorUser = new SumiquimUser
            {
                UserName = "operator@sumiquim.com",
                Email = operatorEmail,
                EmailConfirmed = true
            };

            await _userManager.CreateAsync(operatorUser, "Operator123*");
            await _userManager.AddToRoleAsync(operatorUser, "Operator");
        }
    }
}
