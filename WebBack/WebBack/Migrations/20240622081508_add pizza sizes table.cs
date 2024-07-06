using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class addpizzasizestable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_sizes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_sizes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_pizza_sizes",
                columns: table => new
                {
                    PizzaId = table.Column<int>(type: "integer", nullable: false),
                    SizeId = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_pizza_sizes", x => new { x.PizzaId, x.SizeId });
                    table.ForeignKey(
                        name: "FK_tbl_pizza_sizes_tbl_pizzas_PizzaId",
                        column: x => x.PizzaId,
                        principalTable: "tbl_pizzas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_pizza_sizes_tbl_sizes_SizeId",
                        column: x => x.SizeId,
                        principalTable: "tbl_sizes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_pizza_sizes_SizeId",
                table: "tbl_pizza_sizes",
                column: "SizeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_pizza_sizes");

            migrationBuilder.DropTable(
                name: "tbl_sizes");
        }
    }
}
