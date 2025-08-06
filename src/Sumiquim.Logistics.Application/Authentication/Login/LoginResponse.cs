namespace Sumiquim.Logistics.Application.Authentication.Login;

public record LoginResponse (
    string Name,
    string LastName,
    string Role,
    string Token
);


