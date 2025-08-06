using Sumiquim.Logistics.Domain.Exceptions;

namespace Sumiquim.Logistics.Domain.Enum;

public class SalesAdvisors
{
    public static readonly SalesAdvisors DIGNA = new(nameof(DIGNA), "ANDRADE OROZCO DIGNA MARIA", "Digna", "dmandrade@sumiquim.com");
    public static readonly SalesAdvisors INGRID = new(nameof(INGRID), "REAL ORJUELA INGRID JOHANNA", "Ingrid", "ijreal@sumiquim.com");
    public static readonly SalesAdvisors JULIAN = new(nameof(JULIAN), "LEAL ACOSTA JULIAN DAVID", "Julian", "jdleal@sumiquim.com");
    public static readonly SalesAdvisors ALBERTO = new(nameof(ALBERTO), "RAMIREZ NASSI ALBERTO JOSE", "Alberto", "ajramirez@sumiquim.com");
    public static readonly SalesAdvisors CESAR = new(nameof(CESAR), "PEÑA RODRIGUEZ CESAR FERNANDO TUPAC", "Cesar", "cfpena@sumiquim.com");
    public static readonly SalesAdvisors ALEJANDRO = new(nameof(ALEJANDRO), "CANTILLO LOPEZ ALEJANDRO", "Don Alejandro", "acantillo@sumiquim.com;hvtamayo@sumiquim.com");
    public static readonly SalesAdvisors SANTIAGO = new(nameof(SANTIAGO), "RUIZ MARTINEZ SANTIAGO", "Santiago", "sruiz@sumiquim.com");
    public static readonly SalesAdvisors AIDA = new(nameof(AIDA), "GRAJALES BENITEZ AIDA LUZ", "Aida", "algrajales@sumiquim.com");
    public static readonly SalesAdvisors DAVID = new(nameof(DAVID), "MORALES MARTINEZ DAVID EDUARDO", "David", "demorales13@outlook.com");
    public static readonly SalesAdvisors JESSICA = new(nameof(JESSICA), "ROMAN VALENCIA JESSICA LICETH", "Jessica", "jlromanvalencia@gmail.com");

    public string Id { get; private set; }
    public string Name { get; private set; }
    public string ShortName { get; private set; }
    public string Email { get; private set; }

    private SalesAdvisors(string id, string name, string shortName, string email)
    {
        Id = id;
        Name = name;
        ShortName = shortName;
        Email = email;
    }

    public static IReadOnlyCollection<SalesAdvisors> Get()
    {
        return new[] { DIGNA, INGRID, JULIAN, ALBERTO, CESAR, ALEJANDRO, SANTIAGO, AIDA, DAVID, JESSICA };
    }

    public static SalesAdvisors FindByName(string name)
    {
        var state = Get().SingleOrDefault(s => s.Name.Trim() == name.Trim());
        if (state == null)
        {
            var values = Get().Select(x => x.Name);
            throw new BusinessException($"Invalid value {nameof(SalesAdvisors)} {name}. {string.Join(",", values)}");
        }

        return state;
    }

    public static SalesAdvisors FindClosestMatchByName(string name)
    {
        var parts = name.Replace("\u00A0", " ")
            .ToUpper()
            .Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

        var advisor = Get().FirstOrDefault(x =>
            parts.All(part => x.Name.ToUpper().Contains(part)));

        if (advisor == null)
        {
            var values = Get().Select(x => x.Name);
            throw new BusinessException($"Invalid value {nameof(SalesAdvisors)} {name}. {string.Join(",", values)}");
        }

        return advisor;
    }
}
