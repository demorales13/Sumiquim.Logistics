using Cronos;

using MediatR;

using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingReportEmail;

public class ShippingSchedulingReportEmailBackgroundService : BackgroundService
{
    private readonly ILogger<ShippingSchedulingReportEmailBackgroundService> _logger;
    private readonly ISender _sender;
    private CronExpression _cronExpression;
    private TimeZoneInfo _timeZoneInfo;

    public ShippingSchedulingReportEmailBackgroundService(ILogger<ShippingSchedulingReportEmailBackgroundService> logger, ISender sender)
    {
        _logger = logger;
        // Define the cron expression for every Saturday at 8:00 AM
        _cronExpression = CronExpression.Parse("0 17 * * 6");
        _timeZoneInfo = TimeZoneInfo.Local;
        _sender = sender;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Scheduled Task Service is starting.");

        while (!stoppingToken.IsCancellationRequested)
        {
            var next = _cronExpression.GetNextOccurrence(DateTimeOffset.Now, _timeZoneInfo);
            if (next.HasValue)
            {
                var delay = next.Value - DateTimeOffset.Now;
                if (delay > TimeSpan.Zero)
                {
                    _logger.LogInformation($"Next execution scheduled at {next.Value}");
                    await Task.Delay(delay, stoppingToken);
                }

                if (!stoppingToken.IsCancellationRequested)
                {
                    await DoWork();
                }
            }
        }

        _logger.LogInformation("Scheduled Task Service is stopping.");
    }

    private async Task DoWork()
    {
        _logger.LogInformation("Scheduled Task is working.");

        var endDate = DateTime.Now.Date;
        var startDate = endDate.AddDays(-6);

        var command = new ShippingSchedulingReportEmailCommand(startDate, endDate);
        var result = await _sender.Send(command);

        _logger.LogInformation($"Scheduled Task result: {result.result}");
    }
}
