using FluentValidation;

using MediatR;

using Sumiquim.Logistics.Domain.Exceptions;

namespace Sumiquim.Logistics.Application.Behaviors;

public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
    where TResponse : notnull
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators) => 
        _validators = validators;
    

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (!_validators.Any())
            return await next();

        var context = new ValidationContext<TRequest>(request);

        var validationErrors = _validators
            .Select(x => x.Validate(context))
            .SelectMany(x => x.Errors)
            .Where(x => x != null)
            .GroupBy(
                x => x.PropertyName,
                x => x.ErrorMessage, 
                (propertyName, errorMessages) => new ValidationError
                (
                    propertyName,
                    [..errorMessages.Distinct()]
                )
            );

        if (validationErrors.Any())
            throw new Domain.Exceptions.ValidationException(validationErrors);

        return await next();
    }
}

