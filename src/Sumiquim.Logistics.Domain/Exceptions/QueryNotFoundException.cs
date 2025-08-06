namespace Sumiquim.Logistics.Domain.Exceptions;

public class QueryNotFoundException : Exception
{
    public IEnumerable<string> Errors { get; }

    public QueryNotFoundException(IEnumerable<string> errors)
    {
        Errors = errors;
    }

    public QueryNotFoundException(string message) => Errors = [message];
}

