using Sumiquim.Logistics.Domain.Exceptions;

namespace Sumiquim.Logistics.Domain.Enum;


public class CarrierCompanies
{
public static readonly CarrierCompanies ALDIA_PAQUETEO = new(nameof(ALDIA_PAQUETEO), "ALDIA PAQUETEO");
public static readonly CarrierCompanies ICOLTRANS = new(nameof(ICOLTRANS), "ICOLTRANS");

public string Id { get; private set; }
public string Name { get; private set; }

private CarrierCompanies(string id, string name)
{
    Id = id;
    Name = name;
}

public static IReadOnlyCollection<CarrierCompanies> Get()
{
    return new[] { ALDIA_PAQUETEO, ICOLTRANS };
}

public static CarrierCompanies FindByName(string name)
{
    var state = Get().SingleOrDefault(s => s.Name.Trim() == name.Trim());
    if (state == null)
    {
        var values = Get().Select(x => x.Name);
        throw new BusinessException($"Invalid value {nameof(CarrierCompanies)} {name}. {string.Join(",", values)}");
    }

    return state;
}
}