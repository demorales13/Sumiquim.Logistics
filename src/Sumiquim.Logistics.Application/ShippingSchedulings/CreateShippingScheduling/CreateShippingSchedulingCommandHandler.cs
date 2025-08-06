using Sumiquim.Logistics.Application.Abstractions.Messaging;
using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.CreateShippingScheduling;

public class CreateShippingSchedulingCommandHandler(
    IShippingSchedulingCommandRepository shippingSchedulingRepository,
    IUnitOfWork unitOfWork)
    : ICommandHandler<CreateShippingSchedulingCommand, CreateShippingSchedulingResponse>
{
    private readonly IShippingSchedulingCommandRepository _shippingSchedulingRepository = shippingSchedulingRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<CreateShippingSchedulingResponse> Handle(CreateShippingSchedulingCommand command, CancellationToken cancellationToken)
        
    {
        var shippingScheduling = command.ToShippingScheduling();

        _shippingSchedulingRepository.Add(shippingScheduling, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        var response = new CreateShippingSchedulingResponse(shippingScheduling.ShippingSchedulingId);   

        return response;
    }
}
