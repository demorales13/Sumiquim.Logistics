using Microsoft.AspNetCore.Http;

using Sumiquim.Logistics.Application.Abstractions.Messaging;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.CreateShippingSchedulingFromExcel;

public record CreateShippingSchedulingFromExcelCommand(int Date, IFormFile File) : ICommand<CreateShippingSchedulingResponse>;

