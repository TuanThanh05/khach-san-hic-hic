using System.ComponentModel.DataAnnotations.Schema;

namespace HotelBooking.Api.Models;

public class Room
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Type { get; set; } = "";    
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    public int Capacity { get; set; }
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
}