using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proyect1.Data;
using Proyect1.Models;
using BCrypt.Net;

namespace Proyect1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public UsersController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return await _db.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> Post(UserInput input)
        {
            var user = new User
            {
                Name = input.Name ?? string.Empty,
                Email = input.Email ?? string.Empty,
                Role = input.Role ?? "user"
            };
            if (!string.IsNullOrWhiteSpace(input.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(input.Password);
            }

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UserInput input)
        {
            var existing = await _db.Users.FindAsync(id);
            if (existing == null) return NotFound();

            if (!string.IsNullOrWhiteSpace(input.Name)) existing.Name = input.Name;
            if (!string.IsNullOrWhiteSpace(input.Email)) existing.Email = input.Email;
            if (!string.IsNullOrWhiteSpace(input.Role)) existing.Role = input.Role;
            if (!string.IsNullOrWhiteSpace(input.Password))
            {
                existing.PasswordHash = BCrypt.Net.BCrypt.HashPassword(input.Password);
            }

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!UserExists(id))
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        private bool UserExists(int id) => _db.Users.Any(u => u.Id == id);
    }
}