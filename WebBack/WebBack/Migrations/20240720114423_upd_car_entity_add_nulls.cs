using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebBack.Migrations
{
    /// <inheritdoc />
    public partial class upd_car_entity_add_nulls : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<int>(
                name: "TransportTypeId",
                table: "tbl_cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "TransmissionTypeId",
                table: "tbl_cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "NumberOfSeatsId",
                table: "tbl_cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "FuelTypesId",
                table: "tbl_cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "EngineVolumeId",
                table: "tbl_cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ColorId",
                table: "tbl_cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "CityId",
                table: "tbl_cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "CarModelId",
                table: "tbl_cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "BodyTypeId",
                table: "tbl_cars",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_Cities_CityId",
                table: "tbl_cars",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_body_types_BodyTypeId",
                table: "tbl_cars",
                column: "BodyTypeId",
                principalTable: "tbl_body_types",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_car_models_CarModelId",
                table: "tbl_cars",
                column: "CarModelId",
                principalTable: "tbl_car_models",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_colors_ColorId",
                table: "tbl_cars",
                column: "ColorId",
                principalTable: "tbl_colors",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_engine_volumes_EngineVolumeId",
                table: "tbl_cars",
                column: "EngineVolumeId",
                principalTable: "tbl_engine_volumes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_fuel_types_FuelTypesId",
                table: "tbl_cars",
                column: "FuelTypesId",
                principalTable: "tbl_fuel_types",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_numbers_of_seats_NumberOfSeatsId",
                table: "tbl_cars",
                column: "NumberOfSeatsId",
                principalTable: "tbl_numbers_of_seats",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_transmisions_types_TransmissionTypeId",
                table: "tbl_cars",
                column: "TransmissionTypeId",
                principalTable: "tbl_transmisions_types",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_cars_tbl_transport_types_TransportTypeId",
                table: "tbl_cars",
                column: "TransportTypeId",
                principalTable: "tbl_transport_types",
                principalColumn: "Id");
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

            migrationBuilder.AlterColumn<int>(
                name: "TransportTypeId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TransmissionTypeId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NumberOfSeatsId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FuelTypesId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EngineVolumeId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ColorId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CityId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CarModelId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BodyTypeId",
                table: "tbl_cars",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

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
    }
}
