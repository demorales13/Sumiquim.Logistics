using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Domain.Entities.ShippingSchedulings;
using Sumiquim.Logistics.Domain.Entities.Users;

namespace Sumiquim.Logistics.Infrastructure.DbContext;

public class SumiquimContext: IdentityDbContext<SumiquimUser, SumiquimRole, Int64>, IUnitOfWork
{
    private readonly IShippingSchedulingNotifier _notifier;

    public SumiquimContext(DbContextOptions options,
                           IShippingSchedulingNotifier notifier) 
        : base(options)
    {
        _notifier = notifier;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SumiquimContext).Assembly);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Detectar si hay cambios en ShippingScheduling
        var hasChanges = ChangeTracker.Entries<ShippingScheduling>()
            .Any(e => e.State == EntityState.Added ||
                      e.State == EntityState.Modified ||
                      e.State == EntityState.Deleted);

        var result = await base.SaveChangesAsync(cancellationToken);

        if (hasChanges)
        {
            await _notifier.NotifyUpdatedAsync();
        }

        return result;
    }
}
