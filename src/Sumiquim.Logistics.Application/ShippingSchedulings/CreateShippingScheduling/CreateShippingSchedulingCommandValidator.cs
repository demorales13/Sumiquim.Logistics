using FluentValidation;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.CreateShippingScheduling;

public class CreateShippingSchedulingCommandValidator : AbstractValidator<CreateShippingSchedulingCommand>
{
    public CreateShippingSchedulingCommandValidator()
    {
        RuleFor(x => x.Address).NotEmpty().WithMessage("La dirección es requerida");
        RuleFor(x => x.Batch).NotEmpty().WithMessage("El lote es requerido");
        RuleFor(x => x.Code).NotEmpty().WithMessage("El código es requerido");
        RuleFor(x => x.City).NotEmpty().WithMessage("La ciudad es requerida");
        RuleFor(x => x.Client).NotEmpty().WithMessage("El cliente es requerido");
        RuleFor(x => x.Item).NotEmpty().WithMessage("El item es requerido");
        RuleFor(x => x.PurchaseOrder).NotEmpty().WithMessage("La orden de compra es requerida");
        RuleFor(x => x.Quantity).NotEmpty().WithMessage("La cantidad es requerida");
        RuleFor(x => x.SalesAdvisor).NotEmpty().WithMessage("El vendedor es requerido");
        RuleFor(x => x.Warehouse).NotEmpty().WithMessage("La bodega es requerida");
        RuleFor(x => x.Location).NotEmpty().WithMessage("La ubicación es requerida");
        RuleFor(x => x.Date).GreaterThan(0).WithMessage("La fecha es requerida");
    }
}
