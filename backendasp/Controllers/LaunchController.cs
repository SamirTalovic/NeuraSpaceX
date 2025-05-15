using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Neura.Context;
using Neura.Models;

namespace Neura.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LaunchController : ControllerBase
    {
        private readonly DbAppContext _context;

        public LaunchController(DbAppContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Launch launch)
        {
            try
            {
                _context.Launches.Add(launch);
                await _context.SaveChangesAsync();
                return Ok(launch);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var launches = await _context.Launches.ToListAsync();
            return Ok(launches);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var launch = await _context.Launches.FindAsync(id);
            if (launch == null) return NotFound();

            _context.Launches.Remove(launch);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
