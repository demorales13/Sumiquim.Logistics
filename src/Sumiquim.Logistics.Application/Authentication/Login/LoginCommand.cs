using Sumiquim.Logistics.Application.Abstractions.Messaging;

namespace Sumiquim.Logistics.Application.Authentication.Login;

public record LoginCommand(string Email, string Password)
    : ICommand<LoginResponse>;

