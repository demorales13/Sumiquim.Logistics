using Microsoft.AspNetCore.Identity;

using Sumiquim.Logistics.Application.Abstractions;
using Sumiquim.Logistics.Application.Abstractions.Messaging;
using Sumiquim.Logistics.Domain.Entities.Users;
using Sumiquim.Logistics.Domain.Exceptions;


namespace Sumiquim.Logistics.Application.Authentication.Login;

public class LoginCommandHandler(
    UserManager<SumiquimUser> userManager, 
    IJwtTokenGenerator tokenGenerator)
    : ICommandHandler<LoginCommand, LoginResponse>
{
    public async Task<LoginResponse> Handle(LoginCommand command, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null || !await userManager.CheckPasswordAsync(user, command.Password))
        {
            throw new AuthenticationException("Las credenciales no son válidas.");
        }

        var roles = await userManager.GetRolesAsync(user);
        var token = tokenGenerator.GenerateToken(user, roles);

        return new LoginResponse(
            user.Name,
            user.LastName,
            roles.FirstOrDefault() ?? "",
            token
        );
    }
}


