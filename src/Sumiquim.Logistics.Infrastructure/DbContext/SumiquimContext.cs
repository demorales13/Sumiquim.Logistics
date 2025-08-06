using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Domain.Entities.Users;

namespace Sumiquim.Logistics.Infrastructure.DbContext;

public class SumiquimContext: IdentityDbContext<SumiquimUser, SumiquimRole, Int64>, IUnitOfWork
{
    public SumiquimContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SumiquimContext).Assembly);
    }
}
