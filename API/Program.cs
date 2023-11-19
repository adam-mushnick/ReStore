//Program.cs is the entry point of an ASP.NET Core app

using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//order not important

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//order matters
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
//logs errors regarding Program class
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    //creates database if it doesn't exist, adds any pending migrations to existing db
    context.Database.Migrate();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{
    
    logger.LogError(ex, "A problem occurred during migration");
}

app.Run();
