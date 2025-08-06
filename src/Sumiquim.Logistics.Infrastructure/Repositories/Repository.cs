using Microsoft.EntityFrameworkCore;

using Sumiquim.Logistics.Domain.Abstractions;
using Sumiquim.Logistics.Infrastructure.DbContext;

namespace Sumiquim.Logistics.Infrastructure.Repositories;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
{
    protected readonly SumiquimContext DbContext;

    protected Repository(SumiquimContext dbContext) => DbContext = dbContext;

    public void Add(TEntity entity, CancellationToken cancellationToken)
    {
        if (entity is null) throw new ArgumentNullException(nameof(entity));

        DbContext.Add(entity);
    }

    public void Add(IEnumerable<TEntity> entities, CancellationToken cancellationToken)
    {
        if (entities is null) throw new ArgumentNullException(nameof(entities));
        if (!entities.Any()) throw new ArgumentException("Collection cannot be empty", nameof(entities));

        DbContext.AddRange(entities);
    }

    public void Update(TEntity entity, TEntity edited, CancellationToken cancellationToken)
    {
        if (entity is null) throw new ArgumentNullException(nameof(entity));
        if (edited is null) throw new ArgumentNullException(nameof(edited));

        DbContext.Entry(entity).CurrentValues.SetValues(edited);
        DbContext.Entry(entity).State = EntityState.Modified;
    }

    public void Remove(TEntity entity, CancellationToken cancellationToken)
    {
        if (entity is null) throw new ArgumentNullException(nameof(entity));

        if (DbContext.Entry(entity).State == EntityState.Detached)
        {
            DbContext.Attach(entity);
        }

        DbContext.Remove(entity);
    }
}
