using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Sumiquim.EMail.Sender.Infrastructure.Email;
using Sumiquim.Logistics.Application.Abstractions;
using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Infrastructure.Authentication;
using Sumiquim.Logistics.Infrastructure.DbContext;
using Sumiquim.Logistics.Infrastructure.Office.ShippingSchedulingExcelReader;
using Sumiquim.Logistics.Infrastructure.Repositories;

namespace Sumiquim.Logistics.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddTransient<IEmailService, EmailService>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        AddPersistence(services, configuration);

        return services;
    }

    private static void AddPersistence(IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection") ??
            throw new ArgumentNullException(nameof(configuration));

        services.AddDbContext<SumiquimContext>(options =>
            options.UseSqlServer(connectionString));

        #region Repositories
        services.AddScoped<IShippingSchedulingCommandRepository, ShippingSchedulingCommandRepository>();
        services.AddScoped<IShippingSchedulingQueryRepository, ShippingSchedulingQueryRepository>();
        #endregion

        services.AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<SumiquimContext>());
        services.AddTransient<ShippingSchedulingExcelReader>();
    }
}
