using Microsoft.EntityFrameworkCore;
using Proyect1.Data;

var builder = WebApplication.CreateBuilder(args);

// configurar Entity Framework Core con PostgreSQL
var connectionString = builder.Configuration["CONNECTION_STRING"]
    ?? builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Host=postgres;Port=5432;Database=proyect1_db;Username=admin;Password=admin123456";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();

// 1. Definir la política de CORS
builder.Services.AddCors(options =>
{
    // Obtener orígenes permitidos de variable de entorno o usar por defecto
    var corsOrigins = builder.Configuration["CORS_ORIGINS"]?.Split(",") ?? new[]
    {
        "http://localhost:4200",
        "http://localhost:80",
        "http://localhost"
    };

    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins(corsOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 2. Habilitar política de CORS
app.UseCors("AllowAngularApp");

app.UseHttpsRedirection();
app.MapControllers();

// Aplicar migraciones pendientes al iniciar (si las hay)
try
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}
catch (Exception ex)
{
    // no bloqueamos el arranque por un fallo de migración, pero lo registramos
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "Error aplicando migraciones a la base de datos");
}

app.Run();