using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class etities_upd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_Regions_RegionId",
                table: "Cities");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_Cities_CityId",
                table: "tbl_cars");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Regions",
                table: "Regions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cities",
                table: "Cities");

            migrationBuilder.RenameTable(
                name: "Regions",
                newName: "tbl_regions");

            migrationBuilder.RenameTable(
                name: "Cities",
                newName: "tbl_cities");

            migrationBuilder.RenameIndex(
                name: "IX_Cities_RegionId",
                table: "tbl_cities",
                newName: "IX_tbl_cities_RegionId");

            migrationBuilder.AlterColumn<string>(
                name: "Photo",
                table: "AspNetUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_regions",
                table: "tbl_regions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tbl_cities",
                table: "tbl_cities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_cities_CityId",
                table: "tbl_cars",
                column: "CityId",
                principalTable: "tbl_cities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cities_tbl_regions_RegionId",
                table: "tbl_cities",
                column: "RegionId",
                principalTable: "tbl_regions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_tbl_cities_CityId",
                table: "tbl_cars");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cities_tbl_regions_RegionId",
                table: "tbl_cities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_regions",
                table: "tbl_regions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tbl_cities",
                table: "tbl_cities");

            migrationBuilder.RenameTable(
                name: "tbl_regions",
                newName: "Regions");

            migrationBuilder.RenameTable(
                name: "tbl_cities",
                newName: "Cities");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_cities_RegionId",
                table: "Cities",
                newName: "IX_Cities_RegionId");

            migrationBuilder.AlterColumn<string>(
                name: "Photo",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Regions",
                table: "Regions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cities",
                table: "Cities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_Regions_RegionId",
                table: "Cities",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_Cities_CityId",
                table: "tbl_cars",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id");
        }
    }
}
