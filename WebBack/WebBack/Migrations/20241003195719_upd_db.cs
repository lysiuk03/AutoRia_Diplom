using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class upd_db : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserEntityId",
                table: "tbl_cars");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_UserEntityId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_UserId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "UserEntityId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "tbl_cars");

            migrationBuilder.CreateTable(
                name: "UserCars",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    CarId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCars", x => new { x.UserId, x.CarId });
                    table.ForeignKey(
                        name: "FK_UserCars_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCars_tbl_cars_CarId",
                        column: x => x.CarId,
                        principalTable: "tbl_cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserCars_CarId",
                table: "UserCars",
                column: "CarId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserCars");

            migrationBuilder.AddColumn<int>(
                name: "UserEntityId",
                table: "tbl_cars",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "tbl_cars",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_UserEntityId",
                table: "tbl_cars",
                column: "UserEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_UserId",
                table: "tbl_cars",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserEntityId",
                table: "tbl_cars",
                column: "UserEntityId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserId",
                table: "tbl_cars",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
