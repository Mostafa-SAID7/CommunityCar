using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.Services;

[ApiController]
[Route("api/v1/services/experts")]
public class ExpertsController : ControllerBase
{
    /// <summary>
    /// Get all experts
    /// </summary>
    [HttpGet]
    public IActionResult GetExperts()
    {
        return Ok(new[] { new { Id = 1, Name = "John Mechanic", Specialty = "Engine Repair" } });
    }

    /// <summary>
    /// Get expert by ID
    /// </summary>
    [HttpGet("{id}")]
    public IActionResult GetExpert(int id)
    {
        return Ok(new { Id = id, Name = "Expert Details", Experience = "10 years", Rating = 4.8 });
    }

    /// <summary>
    /// Get experts by specialty
    /// </summary>
    [HttpGet("specialty/{specialty}")]
    public IActionResult GetExpertsBySpecialty(string specialty)
    {
        return Ok(new[] { new { Id = 1, Name = "Specialist", Specialty = specialty } });
    }
}