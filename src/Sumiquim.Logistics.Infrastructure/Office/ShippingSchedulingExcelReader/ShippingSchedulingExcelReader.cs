using Microsoft.AspNetCore.Http;

using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Enum;
using Sumiquim.Logistics.Infrastructure.Office.Base;

namespace Sumiquim.Logistics.Infrastructure.Office.ShippingSchedulingExcelReader;

public class ShippingSchedulingExcelReader : BaseExcelReader<ShippingScheduling>
{
    // Encabezados esperados: clave = nombre en Excel, valor = propiedad de ShippingScheduling
    private static readonly Dictionary<string, string> ExpectedColumns = new()
    {
        { "RAZÓN SOCIAL", nameof(ShippingScheduling.Client) },
        { "DIRECCIÓN", nameof(ShippingScheduling.Address) },
        { "CIUDAD", nameof(ShippingScheduling.City) },
        { "ITEM", nameof(ShippingScheduling.Item) },
        { "ORDEN DE COMPRA", nameof(ShippingScheduling.PurchaseOrder) },
        { "CODIGO", nameof(ShippingScheduling.Code) },
        { "LOTE", nameof(ShippingScheduling.Batch) },
        { "PESO NETO", nameof(ShippingScheduling.Quantity) },
        { "UBICACIÓN", nameof(ShippingScheduling.Location) },
        { "BODEGA", nameof(ShippingScheduling.Warehouse) },
        { "TRANSPORTADORA", nameof(ShippingScheduling.CarrierCompany) },
        { "NOTAS", nameof(ShippingScheduling.Notes) },
        { "COMERCIAL", nameof(ShippingScheduling.SalesAdvisor) }
    };

    // Lista de campos obligatorios (debe coincidir con el header en Excel)
    private static readonly List<string> RequiredFields = new()
    {
        "RAZÓN SOCIAL",
        "DIRECCIÓN",
        "CIUDAD",
        "ITEM",
        "ORDEN DE COMPRA",
        "CODIGO",
        "LOTE",
        "PESO NETO",
        "BODEGA",
        "TRANSPORTADORA",
        "COMERCIAL"
    };

    protected override Dictionary<string, string> GetColumnMappings() => ExpectedColumns;

    protected override List<string> GetRequiredProperties() =>
        RequiredFields.Select(header => ExpectedColumns[header]).ToList();

    public List<ShippingScheduling> ReadExcel(IFormFile file)
    {
        using var stream = file.OpenReadStream();
        var results = Read(stream); // Usa el método de la clase base
        ValidateSalesAdvisor(results);
        return results;
    }

    private void ValidateSalesAdvisor(List<ShippingScheduling> list)
    {
        for (int i = 0; i < list.Count; i++)
        {
            var advisorName = list[i].SalesAdvisor?.Trim();
            if (!string.IsNullOrEmpty(advisorName))
            {
                var validNames = SalesAdvisors.Get().Select(s => s.Name.Trim()).ToList();

                if (!validNames.Contains(advisorName, StringComparer.OrdinalIgnoreCase))
                {
                    AddError(i + 2, "COMERCIAL",
                        $"El asesor '{advisorName}' no se reconoce como válido.");
                }
            }
        }
    }
}