namespace Sumiquim.Logistics.Domain.Abstractions;

public interface IRepository<TEntity> where TEntity : class
{
    void AddRange(IEnumerable<TEntity> entities, CancellationToken cancellationToken);
    void Add(TEntity entity, CancellationToken cancellationToken);
    void Remove(TEntity entity, CancellationToken cancellationToken);
    void Update(TEntity entity, TEntity edited, CancellationToken cancellationToken);
}