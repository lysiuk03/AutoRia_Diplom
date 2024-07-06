using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class Addpizzaentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_pizzas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Rating = table.Column<double>(type: "double precision", nullable: false),
                    IsAvailable = table.Column<bool>(type: "boolean", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_pizzas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_pizzas_tbl_categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "tbl_categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_pizza_ingredients",
                columns: table => new
                {
                    PizzaId = table.Column<int>(type: "integer", nullable: false),
                    IngredientId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_pizza_ingredients", x => new { x.PizzaId, x.IngredientId });
                    table.ForeignKey(
                        name: "FK_tbl_pizza_ingredients_tbl_ingredients_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "tbl_ingredients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_pizza_ingredients_tbl_pizzas_PizzaId",
                        column: x => x.PizzaId,
                        principalTable: "tbl_pizzas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_pizza_ingredients_IngredientId",
                table: "tbl_pizza_ingredients",
                column: "IngredientId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_pizzas_CategoryId",
                table: "tbl_pizzas",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_pizza_ingredients");

            migrationBuilder.DropTable(
                name: "tbl_pizzas");
        }
    }
}
