// simple utility to generate password hashes using ASP.NET Core Identity
using BCrypt.Net;

var passwords = new[] { "admin123", "user123", "password" };

foreach (var pwd in passwords)
{
	var hash = BCrypt.Net.BCrypt.HashPassword(pwd);
	Console.WriteLine($"{pwd} => {hash}");
}

// note: the output can be copy-pasted into SQL seed or migration
