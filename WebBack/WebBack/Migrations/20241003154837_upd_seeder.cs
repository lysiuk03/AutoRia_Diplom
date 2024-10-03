using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class upd_seeder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserEntityId1",
                table: "tbl_cars");

            migrationBuilder.RenameColumn(
                name: "UserEntityId1",
                table: "tbl_cars",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_cars_UserEntityId1",
                table: "tbl_cars",
                newName: "IX_tbl_cars_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Rating",
                table: "AspNetUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserId",
                table: "tbl_cars",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserId",
                table: "tbl_cars");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "tbl_cars",
                newName: "UserEntityId1");

            migrationBuilder.RenameIndex(
                name: "IX_tbl_cars_UserId",
                table: "tbl_cars",
                newName: "IX_tbl_cars_UserEntityId1");

            migrationBuilder.AlterColumn<string>(
                name: "Rating",
                table: "AspNetUsers",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_AspNetUsers_UserEntityId1",
                table: "tbl_cars",
                column: "UserEntityId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
