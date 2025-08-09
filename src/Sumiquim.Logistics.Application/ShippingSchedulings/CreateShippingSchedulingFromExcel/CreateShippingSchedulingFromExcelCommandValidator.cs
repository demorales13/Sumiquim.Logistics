using FluentValidation;

using System.Globalization;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.CreateShippingSchedulingFromExcel;

public class CreateShippingSchedulingFromExcelCommandValidator : AbstractValidator<CreateShippingSchedulingFromExcelCommand>
{
    public CreateShippingSchedulingFromExcelCommandValidator()
    {
        RuleFor(x => x.Date)
            .NotEmpty().WithMessage("La fecha es requerida")
            .Must(date => date.ToString().Length == 8)
                .WithMessage("La fecha debe tener el formato yyyyMMdd")
            .Must(BeAValidDate)
                .WithMessage("La fecha no es válida");

        RuleFor(x => x.File)
            .NotNull().WithMessage("El archivo es requerido")
            .Must(file => file.Length > 0).WithMessage("El archivo no puede estar vacío")
            .Must(file =>
            {
                var extension = Path.GetExtension(file.FileName).ToLower();
                return extension == ".xlsx" || extension == ".xls";
            }).WithMessage("Solo se permiten archivos .xlsx, .xls")
            .Must(file =>
                file.ContentType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
                file.ContentType == "application/vnd.ms-excel" || // .xls
                file.ContentType == "text/csv"
            ).WithMessage("El archivo debe ser un Excel (.xlsx, .xls)");
    }

    private bool BeAValidDate(int date)
    {
        return DateTime.TryParseExact(
            date.ToString(),
            "yyyyMMdd",
            CultureInfo.InvariantCulture,
            DateTimeStyles.None,
            out _
        );
    }
}
