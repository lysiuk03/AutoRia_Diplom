using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebBack.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//string connectionString = builder.Configuration.GetConnectionString("ConnectionSqlite");


//builder.Services.AddDbContext(connection);


//builder.Services.AddDbContext<DataContext>(options=>
//options.UseSqlite("postgresql://ep-yellow-dream-a26ddv09.eu-central-1.aws.neon.tech:5432/global"));


builder.Services.AddAuthorization();
//builder.Services.AddAuthorization().AddCookiePolicy(IdentityConstants.ApplicationScheme);




var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
