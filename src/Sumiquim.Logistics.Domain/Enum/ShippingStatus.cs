using Sumiquim.Logistics.Domain.Exceptions;

namespace Sumiquim.Logistics.Domain.Enum;

public class ShippingStatus
{
    public static readonly ShippingStatus Pending = new(nameof(Pending), nameof(Pending).ToLower());
    public static readonly ShippingStatus Sent = new(nameof(Sent), nameof(Sent).ToLower());
    public static readonly ShippingStatus Incident = new(nameof(Incident), nameof(Incident).ToLower());
    public static readonly ShippingStatus IncidentSent = new(nameof(IncidentSent), nameof(IncidentSent).ToLower());

    public string Id { get; private set; }
    public string Value { get; private set; }

    private ShippingStatus(string id, string value)
    {
        Id = id;
        Value = value;
    }

    public static IReadOnlyCollection<ShippingStatus> Get()
    {
        return new[] { Pending, Sent, Incident, IncidentSent };
    }

    public static ShippingStatus FindByName(string name)
    {
        var state = Get().SingleOrDefault(s => s.Value.Trim() == name.Trim());
        if (state == null)
        {
            var values = Get().Select(x => x.Value);
            throw new BusinessException($"Invalid value {nameof(SalesAdvisors)} {name}. {string.Join(",", values)}");
        }

        return state;
    }
}
