using HotelBooking.Api.Data;
using HotelBooking.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]          // => /api/rooms
public class RoomsController(AppDbContext db) : ControllerBase
{
    // GET /api/rooms
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Room>>> GetAll()
        => await db.Rooms.ToListAsync();

    // GET /api/rooms/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Room>> GetById(int id)
    {
        var room = await db.Rooms.FindAsync(id);
        return room is null ? NotFound() : room;
    }

    // POST /api/rooms
    [HttpPost]
    public async Task<ActionResult<Room>> Create(Room room)
    {
        db.Rooms.Add(room);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = room.Id }, room);
    }

    // PUT /api/rooms/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Room input)
    {
        var room = await db.Rooms.FindAsync(id);
        if (room is null) return NotFound();

        room.Name = input.Name;
        room.Type = input.Type;
        room.Price = input.Price;
        room.Capacity = input.Capacity;
        room.ImageUrl = input.ImageUrl;
        room.Description = input.Description;

        await db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE /api/rooms/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var room = await db.Rooms.FindAsync(id);
        if (room is null) return NotFound();

        db.Rooms.Remove(room);
        await db.SaveChangesAsync();
        return NoContent();
    }
}