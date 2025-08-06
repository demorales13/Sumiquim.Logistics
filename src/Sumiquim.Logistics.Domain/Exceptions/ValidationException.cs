namespace Sumiquim.Logistics.Domain.Exceptions;

public sealed class ValidationException : Exception
{
    public IEnumerable<ValidationError> Errors { get; }

    public ValidationException(IEnumerable<ValidationError> errors)
        : base("One or more validation errors have occurred.")
    {
        Errors = errors;
    }
}

public sealed record ValidationError(string PropertyName, List<string> ErrorMessage);

