var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
// 1. Definir la política
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// 2. Habilitar política 
app.UseCors("AllowAngularDev");

app.UseHttpsRedirection();
app.MapControllers();
app.Run();