using Microsoft.AspNetCore.Mvc;

namespace CommunityCar.Api.Controllers.System;

[ApiController]
[Route("api/v1/system/localization")]
public class LocalizationController : ControllerBase
{
    /// <summary>
    /// Get available languages
    /// </summary>
    [HttpGet("languages")]
    public IActionResult GetLanguages()
    {
        return Ok(new[]
        {
            new { Code = "en", Name = "English" },
            new { Code = "ar", Name = "العربية" }        });
    }

    /// <summary>
    /// Get translations for a language
    /// </summary>
    [HttpGet("translations/{languageCode}")]
    public IActionResult GetTranslations(string languageCode)
    {
        // Implementation would return translations
        return Ok(new { Language = languageCode, Translations = new { Welcome = "Welcome" } });
    }

    /// <summary>
    /// Set current language
    /// </summary>
    [HttpPost("language")]
    public IActionResult SetLanguage([FromBody] string languageCode)
    {
        // Implementation would set user language
        return Ok(new { Message = $"Language set to {languageCode}" });
    }
}