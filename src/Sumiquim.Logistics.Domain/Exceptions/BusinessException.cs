namespace Sumiquim.Logistics.Domain.Exceptions;

public class BusinessException : Exception
{
    public IEnumerable<string> Errors { get; }

    public BusinessException(IEnumerable<string> errors)
    {
        Errors = errors;
    }

    public BusinessException(string message) => Errors = [message];
}


