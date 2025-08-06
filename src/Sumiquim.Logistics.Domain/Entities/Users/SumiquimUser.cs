using Microsoft.AspNetCore.Identity;

namespace Sumiquim.Logistics.Domain.Entities.Users;

public class SumiquimUser : IdentityUser<Int64>
{
    public string Name { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;   
}
