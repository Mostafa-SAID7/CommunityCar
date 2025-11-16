using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.Services;

[ApiController]
[Route("api/v1/services/cart")]
[Authorize]
public class CartController : ControllerBase
{
    /// <summary>
    /// Get current user's cart
    /// </summary>
    [HttpGet]
    public IActionResult GetCart()
    {
        return Ok(new { Items = new[] { new { PartId = 1, Quantity = 2, Price = 49.99 } }, Total = 99.98 });
    }

    /// <summary>
    /// Add item to cart
    /// </summary>
    [HttpPost("items")]
    public IActionResult AddToCart([FromBody] object item)
    {
        return Ok(new { Message = "Item added to cart" });
    }

    /// <summary>
    /// Remove item from cart
    /// </summary>
    [HttpDelete("items/{itemId}")]
    public IActionResult RemoveFromCart(int itemId)
    {
        return Ok(new { Message = "Item removed from cart" });
    }

    /// <summary>
    /// Clear cart
    /// </summary>
    [HttpDelete]
    public IActionResult ClearCart()
    {
        return Ok(new { Message = "Cart cleared" });
    }
}