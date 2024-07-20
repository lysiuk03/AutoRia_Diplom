using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebBack.Controllers;
using WebBack.Data;
using WebBack.Data.Entities;
using WebBack.Data.Entities.Identity;
using WebBack.Mapper;
//using WebBack.Migrations;
using WebBack.Services;
using WebBack.Services.ControllerServices;
using WebBack.Services.ControllerServices.Interfaces;
using WebBack.Services.Interfaces;
using WebBack.Services.PaginationServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<CarDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("Npgsql")));

builder.Services
    .AddIdentity<UserEntity, RoleEntity>(options =>
    {
        options.Stores.MaxLengthForKeys = 128;

        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireLowercase = false;
    })
    .AddEntityFrameworkStores<CarDbContext>()
    .AddDefaultTokenProviders();

var singinKey = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes(
        builder.Configuration["Authentication:Jwt:SecretKey"]
            ?? throw new NullReferenceException("Authentication:Jwt:SecretKey")
    )
);

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = singinKey,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ClockSkew = TimeSpan.Zero
        };
    });


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddValidatorsFromAssemblyContaining<Program>();

builder.Services.AddAutoMapper(typeof(AppMapProfile));
builder.Services.AddTransient<IImageService, ImageService>();

//may be use
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddTransient<IImageValidator, ImageValidator>();
//builder.Services.AddTransient<IExistingEntityCheckerService, ExistingEntityCheckerService>();

builder.Services.AddTransient<IAccountsControllerService, AccountsControllerService>();


//delete
//builder.Services.AddTransient<ICategoryControllerService, CategoryControllerService>();
//builder.Services.AddTransient<IPaginationService<CategoryVm, CategoryFilterVm>, CategoryPaginationService>();
//builder.Services.AddTransient<IIngredientControllerService, IngredientControllerService>();
//builder.Services.AddTransient<IPizzaControllerService, PizzaControllerService>();
//builder.Services.AddTransient<IPaginationService<PizzaVm, PizzaFilterVm>, PizzaPaginationService>();


var app = builder.Build();

string imagesDirPath = Path.Combine(Directory.GetCurrentDirectory(), builder.Configuration["ImagesDir"]);

if (!Directory.Exists(imagesDirPath))
{
    Directory.CreateDirectory(imagesDirPath);
}


// Для редагування фото
app.UseCors(
    configuration => configuration
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(imagesDirPath),
    RequestPath = "/images"
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.SeedData();

app.Run();
