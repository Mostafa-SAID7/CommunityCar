using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.Services;

[ApiController]
[Route("api/v1/services/orders")]
[Authorize]
public class OrdersController : ControllerBase
{
    /// <summary>
    /// Get user's orders
    /// </summary>
    [HttpGet]
    public IActionResult GetOrders()
    {
        return Ok(new[] { new { Id = 1, Status = "Shipped", Total = 149.99 } });
    }

    /// <summary>
    /// Get order by ID
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetOrder(int id)
    {
        return Ok(new { Id = id, Status = "Processing", Items = new[] { new { Name = "Brake Pads", Quantity = 2 } } });
    }

    /// <summary>
    /// Create new order
    /// </summary>
    [HttpPost]
    public IActionResult CreateOrder([FromBody] object order)
    {
        return Created("", new { Id = 1, Message = "Order created" });
    }

    /// <summary>
    /// Cancel order
    /// </summary>
    [HttpDelete("{id}")]
    public IActionResult CancelOrder(int id)
    {
        return Ok(new { Message = "Order cancelled" });
    }
}