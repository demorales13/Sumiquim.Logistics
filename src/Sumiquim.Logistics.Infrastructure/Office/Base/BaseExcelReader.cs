using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

using Sumiquim.Logistics.Domain.Exceptions;

using System.Reflection;

namespace Sumiquim.Logistics.Infrastructure.Office.Base;

public abstract class BaseExcelReader<T> where T : class, new()
{
    private readonly List<ExcelValidationError> _errors = new();
    public IReadOnlyList<ExcelValidationError> Errors => _errors;

    protected abstract Dictionary<string, string> GetColumnMappings();
    protected abstract List<string> GetRequiredProperties();

    public List<T> Read(Stream excelStream)
    {
        _errors.Clear();
        var result = new List<T>();

        IWorkbook workbook = new XSSFWorkbook(excelStream);
        ISheet sheet = workbook.GetSheetAt(0)
            ?? throw new InvalidOperationException("El archivo Excel no contiene hojas.");

        var headerIndexMap = ReadHeaders(sheet.GetRow(0));
        ValidateHeaders(headerIndexMap);

        for (int rowIndex = 1; rowIndex <= sheet.LastRowNum; rowIndex++)
        {
            var row = sheet.GetRow(rowIndex);
            if (row == null) continue;

            var entity = ReadRow(row, headerIndexMap, rowIndex + 1);
            ValidateRequiredFields(entity, rowIndex + 1);

            result.Add(entity);
        }

        return result;
    }

    private Dictionary<int, string> ReadHeaders(IRow? headerRow)
    {
        if (headerRow == null)
            throw new InvalidOperationException("El archivo Excel no contiene encabezados.");

        var mappings = GetColumnMappings();
        var headerIndexMap = new Dictionary<int, string>();

        for (int col = 0; col < headerRow.LastCellNum; col++)
        {
            var header = headerRow.GetCell(col)?.ToString()?.Trim() ?? "";
            if (string.IsNullOrWhiteSpace(header)) continue;

            if (mappings.TryGetValue(header, out var propertyName))
                headerIndexMap[col] = propertyName;
            else
                AddError(0, header, $"El encabezado '{header}' no es reconocido.");
        }

        return headerIndexMap;
    }

    private void ValidateHeaders(Dictionary<int, string> headerIndexMap)
    {
        foreach (var expectedHeader in GetColumnMappings().Keys)
        {
            if (!headerIndexMap.Values.Contains(GetColumnMappings()[expectedHeader]))
                AddError(0, expectedHeader, $"Falta el encabezado requerido '{expectedHeader}'.");
        }
    }

    private T ReadRow(IRow row, Dictionary<int, string> headerIndexMap, int displayRowIndex)
    {
        var entity = new T();

        foreach (var mapping in headerIndexMap)
        {
            var cellValue = row.GetCell(mapping.Key)?.ToString()?.Trim();
            var property = typeof(T).GetProperty(mapping.Value, BindingFlags.Public | BindingFlags.Instance);

            if (property != null)
                MapCellValue(entity, property, cellValue, displayRowIndex, mapping.Value);
        }

        return entity;
    }

    private void MapCellValue(T entity, PropertyInfo prop, string? rawValue, int rowIndex, string columnName)
    {
        if (string.IsNullOrWhiteSpace(rawValue))
        {
            prop.SetValue(entity, null);
            return;
        }

        try
        {
            var targetType = Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType;
            object? convertedValue = ConvertValue(rawValue, targetType, rowIndex, columnName);
            prop.SetValue(entity, convertedValue);
        }
        catch (Exception ex)
        {
            AddError(rowIndex, columnName, $"Error al asignar valor: {ex.Message}");
        }
    }

    private object? ConvertValue(string rawValue, Type targetType, int rowIndex, string columnName)
    {
        if (targetType == typeof(string)) return rawValue;

        if (targetType == typeof(int))
            return int.TryParse(rawValue, out var i) ? i : AddConversionError(rowIndex, columnName, rawValue, "entero");

        if (targetType == typeof(decimal))
            return decimal.TryParse(rawValue, out var d) ? d : AddConversionError(rowIndex, columnName, rawValue, "decimal");

        if (targetType == typeof(double))
            return double.TryParse(rawValue, out var dbl) ? dbl : AddConversionError(rowIndex, columnName, rawValue, "número");

        if (targetType == typeof(DateTime))
            return DateTime.TryParse(rawValue, out var dt) ? dt : AddConversionError(rowIndex, columnName, rawValue, "fecha");

        if (targetType == typeof(bool))
            return bool.TryParse(rawValue, out var b) ? b : AddConversionError(rowIndex, columnName, rawValue, "booleano");

        return rawValue;
    }

    private object? AddConversionError(int rowIndex, string columnName, string rawValue, string typeName)
    {
        AddError(rowIndex, columnName, $"No se pudo convertir '{rawValue}' a {typeName}.");
        return null;
    }

    private void ValidateRequiredFields(T entity, int rowIndex)
    {
        foreach (var requiredProp in GetRequiredProperties())
        {
            var prop = typeof(T).GetProperty(requiredProp);
            var value = prop?.GetValue(entity);

            if (value == null || (value is string s && string.IsNullOrWhiteSpace(s)))
                AddError(rowIndex, requiredProp, $"El campo '{requiredProp}' es obligatorio.");
        }
    }

    internal void AddError(int rowIndex, string columnName, string message)
    {
        _errors.Add(new ExcelValidationError
        {
            RowIndex = rowIndex,
            ColumnName = columnName,
            Message = message
        });
    }
}