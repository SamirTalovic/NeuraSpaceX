using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Neura.Migrations
{
    /// <inheritdoc />
    public partial class afaafa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Links_Patch_PatchId",
                table: "Links");

            migrationBuilder.AlterColumn<int>(
                name: "PatchId",
                table: "Links",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Links_Patch_PatchId",
                table: "Links",
                column: "PatchId",
                principalTable: "Patch",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Links_Patch_PatchId",
                table: "Links");

            migrationBuilder.AlterColumn<int>(
                name: "PatchId",
                table: "Links",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Links_Patch_PatchId",
                table: "Links",
                column: "PatchId",
                principalTable: "Patch",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
