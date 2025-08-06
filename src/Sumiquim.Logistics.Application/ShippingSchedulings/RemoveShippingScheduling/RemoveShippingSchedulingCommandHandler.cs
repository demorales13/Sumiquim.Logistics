using Sumiquim.Logistics.Application.Abstractions.Messaging;
using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Exceptions;
using Sumiquim.Logistics.Infrastructure.Repositories;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.RemoveShippingScheduling;

public class RemoveShippingSchedulingCommandHandler(
    IShippingSchedulingQueryRepository shippingSchedulingQueryRepository,
    IShippingSchedulingCommandRepository shippingSchedulingCommandRepository,
    IUnitOfWork unitOfWork)
    : ICommandHandler<RemoveShippingSchedulingCommand, RemoveShippingSchedulingResponse>
{
    public async Task<RemoveShippingSchedulingResponse> Handle(RemoveShippingSchedulingCommand command, CancellationToken cancellationToken)
    {
        var entity = await shippingSchedulingQueryRepository.GetByIdAsync(command.Id, cancellationToken);

        if (entity is null)
        {
            throw new QueryNotFoundException($"El despacho solicitado no fue encontrado");
        }

        shippingSchedulingCommandRepository.Remove(entity, cancellationToken);

        await unitOfWork.SaveChangesAsync(cancellationToken);

        return new RemoveShippingSchedulingResponse(true);
    }
}
