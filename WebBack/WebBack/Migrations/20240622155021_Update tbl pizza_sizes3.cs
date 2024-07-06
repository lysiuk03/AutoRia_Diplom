using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class Updatetblpizza_sizes3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "tbl_pizza_sizes",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "tbl_pizza_sizes",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "tbl_pizza_sizes");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "tbl_pizza_sizes");
        }
    }
}
