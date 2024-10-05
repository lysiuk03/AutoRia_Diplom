using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class upd_user_and_car : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasAirConditioning",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasHeadlights",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasHeatedSeats",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasHeightAdjustableSeats",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasLeatherInterior",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasPowerSteering",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasPowerWindows",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasPremiumInteriorColor",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasSeatMemory",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasSeatVentilation",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasSpareWheel",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsBargainAvailable",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsExchangeAvailable",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsInstallmentAvailable",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsNotCustomsCleared",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Likes",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "tbl_cars",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "UserEntityId",
                table: "tbl_cars",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserEntityId1",
                table: "tbl_cars",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Views",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MiddleName",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Rating",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Region",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_UserEntityId",
                table: "tbl_cars",
                column: "UserEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_UserEntityId1",
                table: "tbl_cars",
                column: "UserEntityId1");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserEntityId",
                table: "tbl_cars",
                column: "UserEntityId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserEntityId1",
                table: "tbl_cars",
                column: "UserEntityId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserEntityId",
                table: "tbl_cars");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserEntityId1",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_UserEntityId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_UserEntityId1",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "HasAirConditioning",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "HasHeadlights",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "HasHeatedSeats",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "HasHeightAdjustableSeats",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "HasLeatherInterior",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "HasPowerSteering",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "HasPowerWindows",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "HasPremiumInteriorColor",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "HasSeatMemory",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "HasSeatVentilation",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "HasSpareWheel",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "IsBargainAvailable",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "IsExchangeAvailable",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "IsInstallmentAvailable",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "IsNotCustomsCleared",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "Likes",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "UserEntityId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "UserEntityId1",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "Views",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "City",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "MiddleName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Region",
                table: "AspNetUsers");
        }
    }
}
