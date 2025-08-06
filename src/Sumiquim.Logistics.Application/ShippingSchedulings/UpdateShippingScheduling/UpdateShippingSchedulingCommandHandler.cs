using Sumiquim.Logistics.Application.Abstractions.Messaging;
using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Exceptions;
using Sumiquim.Logistics.Infrastructure.Repositories;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.UpdateShippingScheduling;

public class UpdateShippingSchedulingCommandHandler(
    IShippingSchedulingCommandRepository shippingSchedulingCommandRepository,
    IShippingSchedulingQueryRepository shippingSchedulingQueryRepository,
    IUnitOfWork unitOfWork)
    : ICommandHandler<UpdateShippingSchedulingCommand, UpdateShippingSchedulingResponse>
{

    public async Task<UpdateShippingSchedulingResponse> Handle(UpdateShippingSchedulingCommand command, CancellationToken cancellationToken)
    {
        var entity = await shippingSchedulingQueryRepository.GetByIdAsync(command.ShippingSchedulingId, cancellationToken);
        if (entity is null)
        {
            throw new QueryNotFoundException($"El despacho solicitado no fue encontrado");
        }

        var edited = command.ShippingScheduling.ToShippingScheduling();
        edited.ShippingSchedulingId = entity.ShippingSchedulingId;

        shippingSchedulingCommandRepository.Update(entity, edited, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        var response = new UpdateShippingSchedulingResponse(entity.ShippingSchedulingId);

        return response;
    }
}

