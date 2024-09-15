using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class car_entity_done : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Manufacturer",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "Model",
                table: "tbl_cars");

            migrationBuilder.AddColumn<int>(
                name: "CarBrandId",
                table: "tbl_cars",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_CarBrandId",
                table: "tbl_cars",
                column: "CarBrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_car_brands_CarBrandId",
                table: "tbl_cars",
                column: "CarBrandId",
                principalTable: "tbl_car_brands",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_tbl_car_brands_CarBrandId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_CarBrandId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "CarBrandId",
                table: "tbl_cars");

            migrationBuilder.AddColumn<string>(
                name: "Manufacturer",
                table: "tbl_cars",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Model",
                table: "tbl_cars",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
        }
    }
}
