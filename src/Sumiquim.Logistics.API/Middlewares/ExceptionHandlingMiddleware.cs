using Microsoft.AspNetCore.Mvc;

using Sumiquim.Logistics.Domain.Exceptions;

namespace Sumiquim.Logistics.API.Middlewares;


public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (BusinessException ex)
        {
            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Type = "BusinessValidation",
                Title = "BusinessValidation error",
                Detail = "Uno o más errores en las reglas de negocio han ocurrido",
            };

            if (ex.Errors is not null)
            {
                problemDetails.Extensions["errors"] = ex.Errors;
            }

            context.Response.StatusCode = StatusCodes.Status400BadRequest;

            await context.Response.WriteAsJsonAsync(problemDetails);
        }
        catch (ValidationException ex)
        {
            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Type = "ValidationFailure",
                Title = "Validation error",
                Detail = "Uno o más errores de validación han ocurrido",
            };

            if (ex.Errors is not null)
            {
                problemDetails.Extensions["errors"] = ex.Errors;
            }

            context.Response.StatusCode = StatusCodes.Status400BadRequest;

            await context.Response.WriteAsJsonAsync(problemDetails);
        }
        catch (QueryNotFoundException ex)
        {
            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Type = "NotFound",
                Title = "Not Found",
                Detail = "El elemento buscado no fue encontrado",
            };

            if (ex.Errors is not null)
            {
                problemDetails.Extensions["errors"] = ex.Errors;
            }

            context.Response.StatusCode = StatusCodes.Status404NotFound;

            await context.Response.WriteAsJsonAsync(problemDetails);
        }
        catch (ExcelValidationException ex)
        {
            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Type = "ExcelValidationFailure",
                Title = "Excel Validation error",
                Detail = "Uno o más errores de validación han ocurrido leyendo el archivo de excel",
            };

            if (ex.Errors is not null)
            {
                problemDetails.Extensions["errors"] = ex.Errors;
            }

            context.Response.StatusCode = StatusCodes.Status400BadRequest;

            await context.Response.WriteAsJsonAsync(problemDetails);
        }
        catch (Exception exception)
        {
            _logger.LogError(exception, "Exception occurred: {Message}", exception.Message);

            var problemDetails = new ProblemDetails
            {
                Status = StatusCodes.Status500InternalServerError,
                Type = "ServerError",
                Title = "Server error",
                Detail = "An unexpected error has occurred",
            };

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            await context.Response.WriteAsJsonAsync(problemDetails);
        }
    }
}