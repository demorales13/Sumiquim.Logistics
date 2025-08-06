using Sumiquim.Logistics.API.Middlewares;

namespace Sumiquim.Logistics.API;

public static class DependencyInjection
{
    public static void UseCustomExceptionHandler(this IApplicationBuilder app)
        => app.UseMiddleware<ExceptionHandlingMiddleware>();
}
