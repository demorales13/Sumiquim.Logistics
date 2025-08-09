using Carter;

using Sumiquim.Logistics.API;
using Sumiquim.Logistics.API.Extensions;
using Sumiquim.Logistics.Application;
using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Infrastructure;
using Sumiquim.Logistics.Infrastructure.Notifiers.ShippingScheduling;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureSerilog();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddIdentity(builder.Configuration);
builder.Services.AddApplication();

builder.Services.AddCors();
builder.Services.AddCarter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.MapType<IFormFile>(() => new Microsoft.OpenApi.Models.OpenApiSchema
    {
        Type = "string",
        Format = "binary"
    });

    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Ingrese 'Bearer' seguido de un espacio y luego su token JWT."
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});
builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors(builder =>
    builder.WithOrigins("http://localhost:4210")
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials()
);

app.UseAuthentication();
app.UseAuthorization();
app.MapCarter();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.Use(async (context, next) =>
    {
        if (context.Request.Path == "/")
        {
            context.Response.Redirect("/swagger");
            return;
        }
        await next();
    });

    await app.SeedDataAsync();
}

app.UseHttpsRedirection();
app.UseCustomExceptionHandler();
app.MapHub<ShippingSchedulingHub>("/hubs/shipping-scheduling");


app.Run();
