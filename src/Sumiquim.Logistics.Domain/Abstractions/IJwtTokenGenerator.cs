using Sumiquim.Logistics.Domain.Entities.Users;

namespace Sumiquim.Logistics.Application.Abstractions;

public interface IJwtTokenGenerator
{
    string GenerateToken(SumiquimUser user, IList<string> roles);
}
