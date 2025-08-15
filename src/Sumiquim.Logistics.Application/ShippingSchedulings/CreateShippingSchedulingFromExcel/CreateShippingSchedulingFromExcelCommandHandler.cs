using Sumiquim.Logistics.Application.Abstractions.Messaging;
using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Enum;
using Sumiquim.Logistics.Domain.Exceptions;
using Sumiquim.Logistics.Infrastructure.Office.ShippingSchedulingExcelReader;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.CreateShippingSchedulingFromExcel;

public class CreateShippingSchedulingFromExcelCommandHandler(
    ShippingSchedulingExcelReader excelReader,
    IShippingSchedulingCommandRepository shippingSchedulingRepository,
    IUnitOfWork unitOfWork)
    : ICommandHandler<CreateShippingSchedulingFromExcelCommand, CreateShippingSchedulingResponse>
{

    public async Task<CreateShippingSchedulingResponse> Handle(CreateShippingSchedulingFromExcelCommand command, CancellationToken cancellationToken)
    {
        var shippings = excelReader.ReadExcel(command.File);

        var errors = excelReader.Errors;
        if(errors.Any())
        {
            throw new ExcelValidationException(command.File.FileName, errors);
        }

        if(!shippings.Any())
        {
            throw new BusinessException("El archivo no contiene datos");
        }

        foreach (var item in shippings)
        {
            item.Date = command.Date;
            item.SchedulingNotification = ShippingStatus.Sent.Value;
            item.ShipmentNotification = ShippingStatus.Pending.Value;
        }

        shippingSchedulingRepository.AddRange(shippings, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return new CreateShippingSchedulingResponse(true);
    }
}