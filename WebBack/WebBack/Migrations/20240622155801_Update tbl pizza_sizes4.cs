using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class Updatetblpizza_sizes4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_pizza_sizes",
                table: "tbl_pizza_sizes");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "tbl_pizza_sizes",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_pizza_sizes",
                table: "tbl_pizza_sizes",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_pizza_sizes_PizzaId",
                table: "tbl_pizza_sizes",
                column: "PizzaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_pizza_sizes",
                table: "tbl_pizza_sizes");

            migrationBuilder.DropIndex(
                name: "IX_tbl_pizza_sizes_PizzaId",
                table: "tbl_pizza_sizes");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "tbl_pizza_sizes",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_pizza_sizes",
                table: "tbl_pizza_sizes",
                columns: new[] { "PizzaId", "SizeId" });
        }
    }
}
