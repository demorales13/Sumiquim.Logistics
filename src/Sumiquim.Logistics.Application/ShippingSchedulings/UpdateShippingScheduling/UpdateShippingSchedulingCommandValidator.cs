using FluentValidation;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.UpdateShippingScheduling;

public class UpdateShippingSchedulingCommandValidator : AbstractValidator<UpdateShippingSchedulingCommand>
{
    public UpdateShippingSchedulingCommandValidator()
    {
        RuleFor(x => x.ShippingSchedulingId).NotEmpty().WithMessage("El Id es requerido");
        RuleFor(x => x.ShippingScheduling.Address).NotEmpty().WithMessage("La dirección es requerida");
        RuleFor(x => x.ShippingScheduling.Batch).NotEmpty().WithMessage("El lote es requerido");
        RuleFor(x => x.ShippingScheduling.Code).NotEmpty().WithMessage("El código es requerido");
        RuleFor(x => x.ShippingScheduling.City).NotEmpty().WithMessage("La ciudad es requerida");
        RuleFor(x => x.ShippingScheduling.Client).NotEmpty().WithMessage("El cliente es requerido");
        RuleFor(x => x.ShippingScheduling.Item).NotEmpty().WithMessage("El item es requerido");
        RuleFor(x => x.ShippingScheduling.PurchaseOrder).NotEmpty().WithMessage("La orden de compra es requerida");
        RuleFor(x => x.ShippingScheduling.Quantity).NotEmpty().WithMessage("La cantidad es requerida");
        RuleFor(x => x.ShippingScheduling.SalesAdvisor).NotEmpty().WithMessage("El vendedor es requerido");
        RuleFor(x => x.ShippingScheduling.Warehouse).NotEmpty().WithMessage("La bodega es requerida");
        RuleFor(x => x.ShippingScheduling.Location).NotEmpty().WithMessage("La ubicación es requerida");
        RuleFor(x => x.ShippingScheduling.Date).GreaterThan(0).WithMessage("La fecha es requerida");
    }
}
