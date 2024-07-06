using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class Updatetblnames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PizzaPhotos_tbl_pizzas_PizzaId",
                table: "PizzaPhotos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PizzaPhotos",
                table: "PizzaPhotos");

            migrationBuilder.RenameTable(
                name: "PizzaPhotos",
                newName: "tbl_pizza_photos");

            migrationBuilder.RenameIndex(
                name: "IX_PizzaPhotos_PizzaId",
                table: "tbl_pizza_photos",
                newName: "IX_tbl_pizza_photos_PizzaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_pizza_photos",
                table: "tbl_pizza_photos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_pizza_photos_tbl_pizzas_PizzaId",
                table: "tbl_pizza_photos",
                column: "PizzaId",
                principalTable: "tbl_pizzas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_pizza_photos_tbl_pizzas_PizzaId",
                table: "tbl_pizza_photos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_pizza_photos",
                table: "tbl_pizza_photos");

            migrationBuilder.RenameTable(
                name: "tbl_pizza_photos",
                newName: "PizzaPhotos");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_pizza_photos_PizzaId",
                table: "PizzaPhotos",
                newName: "IX_PizzaPhotos_PizzaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PizzaPhotos",
                table: "PizzaPhotos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PizzaPhotos_tbl_pizzas_PizzaId",
                table: "PizzaPhotos",
                column: "PizzaId",
                principalTable: "tbl_pizzas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
