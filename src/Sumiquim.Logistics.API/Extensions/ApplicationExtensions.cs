using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

using Serilog;

using Sumiquim.Logistics.Domain.Entities.Users;
using Sumiquim.Logistics.Infrastructure.Authentication;
using Sumiquim.Logistics.Infrastructure.DbContext;

using System.Text;

namespace Sumiquim.Logistics.API.Extensions;

public static class SerilogConfiguration
{
    public static void ConfigureSerilog(this IHostBuilder host)
    {
        host.ConfigureLogging(logging =>
        {
            logging.ClearProviders();
        }); 

        host.UseSerilog((context, services, loggerConfiguration) =>
        {
            loggerConfiguration
                .ReadFrom.Configuration(context.Configuration)
                .Enrich.FromLogContext();
        });
    }

    public static void AddIdentity(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddIdentity<SumiquimUser, SumiquimRole>(options =>
        {
            options.Password.RequiredLength = 6;
            options.User.RequireUniqueEmail = true;
        })
        .AddEntityFrameworkStores<SumiquimContext>()
        .AddDefaultTokenProviders();

        // JWT Configuration
        var jwtSettings = configuration.GetSection("JwtSettings");
        services.Configure<JwtSettings>(jwtSettings);

        var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = "Bearer";
            options.DefaultChallengeScheme = "Bearer";
        })
        .AddJwtBearer("Bearer", options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings["Issuer"],
                ValidAudience = jwtSettings["Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };
        });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("RequireWriteAccess", policy => policy.RequireRole("Planner"));
            options.AddPolicy("RequireReadAccess", policy => policy.RequireRole("Operator", "Planner"));
        });

        services.AddScoped<IdentityDataSeeder>();
    }
}
