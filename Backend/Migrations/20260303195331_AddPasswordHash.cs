using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Proyect1.Migrations
{
    /// <inheritdoc />
    public partial class AddPasswordHash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Users",
                type: "text",
                nullable: true);

            // set default hashes for existing users based on their role
            // admin users get "admin123", regular users get "user123"
            migrationBuilder.Sql(
                "UPDATE \"Users\" SET \"PasswordHash\" = '$2a$11$7Vsy3Ia4JoSNUqD6O/uFD.lpXXtSRFJjw/aBqkz/gXsIaitoWAuky' WHERE \"Role\" = 'admin';");
            migrationBuilder.Sql(
                "UPDATE \"Users\" SET \"PasswordHash\" = '$2a$11$n.Hf1CissoMJkfqRGYOyYuLs3edroFuWcOJnIpXKjop1CwT4EfPw2' WHERE \"Role\" = 'user';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Users");
        }
    }
}
