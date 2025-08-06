namespace Sumiquim.Logistics.Application.Authentication.Register;

public record RegisterRequest(string Username, string Email, string Password, string Role);

