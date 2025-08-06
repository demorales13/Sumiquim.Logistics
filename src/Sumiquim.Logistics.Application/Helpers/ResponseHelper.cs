using Microsoft.AspNetCore.Http;

namespace Sumiquim.Logistics.Application.Helpers;

public static class ResponseHelper
{
    public static IResult Ok(object data)
    {
        return Results.Ok(new
        {
            Data = data,
            Success = true
        });
    }
}