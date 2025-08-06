namespace Sumiquim.Logistics.Domain.Exceptions;

public sealed class ExcelValidationException : Exception
{
    public IEnumerable<ExcelValidationError> Errors { get; }

    public ExcelValidationException(string fileName, IEnumerable<ExcelValidationError> errors)
        : base($"One or more validation errors have occurred reading {fileName}")
    {
        Errors = errors;
    }
}

public class ExcelValidationError
{
    public int RowIndex { get; set; }
    public string ColumnName { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}