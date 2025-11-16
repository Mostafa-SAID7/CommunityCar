using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.Services;

[ApiController]
[Route("api/v1/services/vendors")]
public class VendorsController : ControllerBase
{
    /// <summary>
    /// Get all vendors
    /// </summary>
    [HttpGet]
    public IActionResult GetVendors()
    {
        return Ok(new[] { new { Id = 1, Name = "Auto Parts Inc", Rating = 4.5 } });
    }

    /// <summary>
    /// Get vendor by ID
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetVendor(int id)
    {
        return Ok(new { Id = id, Name = "Vendor Details", Location = "City, Country" });
    }

    /// <summary>
    /// Get vendor's parts
    /// </summary>
    [HttpGet("{id}/parts")]
    public IActionResult GetVendorParts(int id)
    {
        return Ok(new[] { new { Id = 1, Name = "Part from vendor", Price = 39.99 } });
    }
}