namespace Sumiquim.Logistics.Domain.Exceptions;

public class EMailException : Exception
{
    public EMailException()
    {
    }

    public EMailException(string message)
      : base(message)
    {
    }

    public EMailException(string message, Exception innerException)
      : base(message, innerException)
    {
    }
}
