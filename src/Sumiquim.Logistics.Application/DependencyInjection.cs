﻿using FluentValidation;

using MediatR;

using Microsoft.Extensions.DependencyInjection;

using Sumiquim.Logistics.Application.Behaviors;
using Sumiquim.Logistics.Application.ShippingSchedulings.ShippingSchedulingReportEmail;

namespace Sumiquim.Logistics.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(configuration =>
        {
            configuration.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly);
        });

        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        services.AddHostedService<ShippingSchedulingReportEmailBackgroundService>();

        return services;
    }
}
