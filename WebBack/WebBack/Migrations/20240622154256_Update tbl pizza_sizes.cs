using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class Updatetblpizza_sizes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "tbl_pizza_sizes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "tbl_pizza_sizes");
        }
    }
}
