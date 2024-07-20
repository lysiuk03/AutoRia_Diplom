using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class upd_car_entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AccidentParticipation",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "BodyTypeId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CarModelId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ColorId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EngineVolumeId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FuelTypesId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Metallic",
                table: "tbl_cars",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfSeatsId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TransmissionTypeId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TransportTypeId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Regions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Regions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    RegionId = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cities_Regions_RegionId",
                        column: x => x.RegionId,
                        principalTable: "Regions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_BodyTypeId",
                table: "tbl_cars",
                column: "BodyTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_CarModelId",
                table: "tbl_cars",
                column: "CarModelId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_CityId",
                table: "tbl_cars",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_ColorId",
                table: "tbl_cars",
                column: "ColorId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_EngineVolumeId",
                table: "tbl_cars",
                column: "EngineVolumeId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_FuelTypesId",
                table: "tbl_cars",
                column: "FuelTypesId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_NumberOfSeatsId",
                table: "tbl_cars",
                column: "NumberOfSeatsId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_TransmissionTypeId",
                table: "tbl_cars",
                column: "TransmissionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_cars_TransportTypeId",
                table: "tbl_cars",
                column: "TransportTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_RegionId",
                table: "Cities",
                column: "RegionId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_Cities_CityId",
                table: "tbl_cars",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_body_types_BodyTypeId",
                table: "tbl_cars",
                column: "BodyTypeId",
                principalTable: "tbl_body_types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_car_models_CarModelId",
                table: "tbl_cars",
                column: "CarModelId",
                principalTable: "tbl_car_models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_colors_ColorId",
                table: "tbl_cars",
                column: "ColorId",
                principalTable: "tbl_colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_engine_volumes_EngineVolumeId",
                table: "tbl_cars",
                column: "EngineVolumeId",
                principalTable: "tbl_engine_volumes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_fuel_types_FuelTypesId",
                table: "tbl_cars",
                column: "FuelTypesId",
                principalTable: "tbl_fuel_types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_numbers_of_seats_NumberOfSeatsId",
                table: "tbl_cars",
                column: "NumberOfSeatsId",
                principalTable: "tbl_numbers_of_seats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_transmisions_types_TransmissionTypeId",
                table: "tbl_cars",
                column: "TransmissionTypeId",
                principalTable: "tbl_transmisions_types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_transport_types_TransportTypeId",
                table: "tbl_cars",
                column: "TransportTypeId",
                principalTable: "tbl_transport_types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_Cities_CityId",
                table: "tbl_cars");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_tbl_body_types_BodyTypeId",
                table: "tbl_cars");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_tbl_car_models_CarModelId",
                table: "tbl_cars");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_tbl_colors_ColorId",
                table: "tbl_cars");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_tbl_engine_volumes_EngineVolumeId",
                table: "tbl_cars");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_tbl_fuel_types_FuelTypesId",
                table: "tbl_cars");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_tbl_numbers_of_seats_NumberOfSeatsId",
                table: "tbl_cars");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_tbl_transmisions_types_TransmissionTypeId",
                table: "tbl_cars");

            migrationBuilder.DropForeignKey(
                name: "FK_tbl_cars_tbl_transport_types_TransportTypeId",
                table: "tbl_cars");

            migrationBuilder.DropTable(
                name: "Cities");

            migrationBuilder.DropTable(
                name: "Regions");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_BodyTypeId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_CarModelId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_CityId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_ColorId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_EngineVolumeId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_FuelTypesId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_NumberOfSeatsId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_TransmissionTypeId",
                table: "tbl_cars");

            migrationBuilder.DropIndex(
                name: "IX_tbl_cars_TransportTypeId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "AccidentParticipation",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "BodyTypeId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "CarModelId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "ColorId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "EngineVolumeId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "FuelTypesId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "Metallic",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "NumberOfSeatsId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "TransmissionTypeId",
                table: "tbl_cars");

            migrationBuilder.DropColumn(
                name: "TransportTypeId",
                table: "tbl_cars");
        }
    }
}
