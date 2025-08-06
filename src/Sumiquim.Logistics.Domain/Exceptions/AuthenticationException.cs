namespace Sumiquim.Logistics.Domain.Exceptions;

public class AuthenticationException : Exception
{
    public IEnumerable<string> Errors { get; }

    public AuthenticationException(IEnumerable<string> errors)
    {
        Errors = errors;
    }

    public AuthenticationException(string message) => Errors = [message];
}


