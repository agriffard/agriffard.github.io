---
title: "Good Practices in C# Web APIs: Avoiding Common Pitfalls"
slug: csharp-web-api-best-practices
author: agriffard
pubDatetime: 2025-03-22T12:00:00Z
categories: [Development]
tags: [AI, CSharp, WebAPI, BestPractices]
description: "Web APIs drive modern applications, but small mistakes can cause big problems. Learn about 20 common pitfalls in C# Web API development and how to avoid them for better performance, security, and maintainability."
---

Web APIs are the backbone of modern applications, connecting frontends to backends and enabling seamless data exchange. However, small mistakes in implementation can lead to significant problems including poor performance, security vulnerabilities, and maintenance nightmares.

Here are 20 common pitfalls in C# Web API development and how to avoid them:

## Table of Contents

## 1. Not Using HttpClientFactory

**The Problem:** Creating new `HttpClient` instances directly can lead to socket exhaustion and DNS resolution issues.

**The Solution:**
```csharp
// ❌ Bad
public class ApiService
{
    public async Task<string> GetDataAsync()
    {
        using var client = new HttpClient(); // Don't do this!
        return await client.GetStringAsync("https://api.example.com/data");
    }
}

// ✅ Good
public class ApiService
{
    private readonly HttpClient _httpClient;
    
    public ApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    
    public async Task<string> GetDataAsync()
    {
        return await _httpClient.GetStringAsync("https://api.example.com/data");
    }
}

// In Program.cs
builder.Services.AddHttpClient<ApiService>();
```

## 2. Not Using OpenTelemetry for Observability

**The Problem:** Without proper observability, debugging issues in production becomes nearly impossible.

**The Solution:**
```csharp
// In Program.cs
builder.Services.AddOpenTelemetry()
    .WithTracing(tracerProviderBuilder =>
        tracerProviderBuilder
            .AddAspNetCoreInstrumentation()
            .AddHttpClientInstrumentation()
            .AddEntityFrameworkCoreInstrumentation())
    .WithMetrics(meterProviderBuilder =>
        meterProviderBuilder
            .AddAspNetCoreInstrumentation()
            .AddHttpClientInstrumentation());
```

## 3. Not Implementing Rate Limiting

**The Problem:** APIs without rate limiting are vulnerable to abuse and can be overwhelmed by excessive requests.

**The Solution:**
```csharp
// In Program.cs (.NET 7+)
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("Api", configure =>
    {
        configure.PermitLimit = 100;
        configure.Window = TimeSpan.FromMinutes(1);
        configure.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        configure.QueueLimit = 50;
    });
});

var app = builder.Build();
app.UseRateLimiter();

// On controllers or actions
[EnableRateLimiting("Api")]
[ApiController]
public class WeatherController : ControllerBase
{
    // Controller actions
}
```

## 4. Ignoring CORS (Cross-Origin Resource Sharing)

**The Problem:** Without proper CORS configuration, your API won't be accessible from web applications running on different domains.

**The Solution:**
```csharp
// In Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("https://myapp.com", "https://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

var app = builder.Build();
app.UseCors("AllowSpecificOrigin");
```

## 5. Not Enabling Response Compression

**The Problem:** Large responses consume unnecessary bandwidth and slow down your API.

**The Solution:**
```csharp
// In Program.cs
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});

var app = builder.Build();
app.UseResponseCompression();
```

## 6. Ignoring API Versioning

**The Problem:** Without versioning, breaking changes will affect all existing clients.

**The Solution:**
```csharp
// In Program.cs
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ApiVersionReader = ApiVersionReader.Combine(
        new QueryStringApiVersionReader("version"),
        new HeaderApiVersionReader("X-Version"),
        new UrlSegmentApiVersionReader());
});

// In controllers
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class WeatherController : ControllerBase
{
    [HttpGet]
    public IActionResult GetWeather() => Ok("v1.0 response");
}

[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class WeatherV2Controller : ControllerBase
{
    [HttpGet]
    public IActionResult GetWeather() => Ok("v2.0 response");
}
```

## 7. Not Using Global Exception Handler

**The Problem:** Unhandled exceptions expose sensitive information and provide poor user experience.

**The Solution:**
```csharp
public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "An unhandled exception occurred");

        var response = new
        {
            Title = "An error occurred",
            Status = 500,
            Detail = "An internal server error occurred"
        };

        httpContext.Response.StatusCode = 500;
        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);
        
        return true;
    }
}

// In Program.cs
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
```

## 8. Forgetting to Cache Responses

**The Problem:** Repeated expensive operations without caching lead to poor performance.

**The Solution:**
```csharp
public class WeatherController : ControllerBase
{
    private readonly IMemoryCache _cache;
    private readonly IWeatherService _weatherService;

    public WeatherController(IMemoryCache cache, IWeatherService weatherService)
    {
        _cache = cache;
        _weatherService = weatherService;
    }

    [HttpGet]
    [ResponseCache(Duration = 300)] // Browser caching
    public async Task<IActionResult> GetWeather()
    {
        const string cacheKey = "weather_data";
        
        if (!_cache.TryGetValue(cacheKey, out var weather))
        {
            weather = await _weatherService.GetWeatherAsync();
            
            _cache.Set(cacheKey, weather, TimeSpan.FromMinutes(5));
        }

        return Ok(weather);
    }
}
```

## 9. Not Using Asynchronous Calls

**The Problem:** Synchronous calls block threads and reduce scalability.

**The Solution:**
```csharp
// ❌ Bad
[HttpGet]
public IActionResult GetData()
{
    var data = _dataService.GetData(); // Blocking call
    return Ok(data);
}

// ✅ Good
[HttpGet]
public async Task<IActionResult> GetDataAsync()
{
    var data = await _dataService.GetDataAsync();
    return Ok(data);
}
```

## 10. Not Supporting Pagination in Large Responses

**The Problem:** Large datasets can overwhelm clients and consume excessive memory.

**The Solution:**
```csharp
public class PaginationParameters
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class PagedResult<T>
{
    public List<T> Data { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
}

[HttpGet]
public async Task<IActionResult> GetProducts([FromQuery] PaginationParameters pagination)
{
    var totalCount = await _context.Products.CountAsync();
    var products = await _context.Products
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize)
        .ToListAsync();

    var result = new PagedResult<Product>
    {
        Data = products,
        Page = pagination.Page,
        PageSize = pagination.PageSize,
        TotalCount = totalCount,
        TotalPages = (int)Math.Ceiling(totalCount / (double)pagination.PageSize)
    };

    return Ok(result);
}
```

## 11. Exposing Sensitive Data in DTOs

**The Problem:** Including sensitive information in API responses can lead to data breaches.

**The Solution:**
```csharp
// ❌ Bad - Exposing sensitive data
public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; } // Never expose passwords!
    public string SocialSecurityNumber { get; set; } // Sensitive data
}

// ✅ Good - Safe DTO
public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    // Sensitive data excluded
}

// Use AutoMapper for safe mapping
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Password, opt => opt.Ignore())
            .ForMember(dest => dest.SocialSecurityNumber, opt => opt.Ignore());
    }
}
```

## 12. Not Using Dependency Injection

**The Problem:** Tight coupling makes code difficult to test and maintain.

**The Solution:**
```csharp
// ❌ Bad - Direct instantiation
public class OrderController : ControllerBase
{
    [HttpGet]
    public IActionResult GetOrders()
    {
        var repository = new OrderRepository(); // Tightly coupled
        var orders = repository.GetOrders();
        return Ok(orders);
    }
}

// ✅ Good - Dependency injection
public class OrderController : ControllerBase
{
    private readonly IOrderRepository _orderRepository;

    public OrderController(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetOrdersAsync()
    {
        var orders = await _orderRepository.GetOrdersAsync();
        return Ok(orders);
    }
}

// In Program.cs
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
```

## 13. Not Documenting the API

**The Problem:** Poorly documented APIs are difficult to use and maintain.

**The Solution:**
```csharp
// In Program.cs
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "A sample API with Swagger documentation"
    });
    
    // Include XML comments
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

// In controllers
/// <summary>
/// Gets weather information for a specific city
/// </summary>
/// <param name="city">The name of the city</param>
/// <returns>Weather information for the specified city</returns>
/// <response code="200">Returns the weather information</response>
/// <response code="404">If the city is not found</response>
[HttpGet("{city}")]
[ProducesResponseType(typeof(WeatherInfo), 200)]
[ProducesResponseType(404)]
public async Task<IActionResult> GetWeather(string city)
{
    // Implementation
}
```

## 14. Ignoring Proper HTTP Status Codes

**The Problem:** Incorrect status codes confuse clients and make debugging difficult.

**The Solution:**
```csharp
[HttpGet("{id}")]
public async Task<IActionResult> GetProduct(int id)
{
    var product = await _productService.GetByIdAsync(id);
    
    if (product == null)
        return NotFound(); // 404
    
    return Ok(product); // 200
}

[HttpPost]
public async Task<IActionResult> CreateProduct(CreateProductDto productDto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState); // 400
    
    var product = await _productService.CreateAsync(productDto);
    
    return CreatedAtAction(nameof(GetProduct), 
        new { id = product.Id }, product); // 201
}

[HttpPut("{id}")]
public async Task<IActionResult> UpdateProduct(int id, UpdateProductDto productDto)
{
    if (id != productDto.Id)
        return BadRequest(); // 400
    
    var updated = await _productService.UpdateAsync(productDto);
    
    if (!updated)
        return NotFound(); // 404
    
    return NoContent(); // 204
}
```

## 15. Using GET for Actions That Modify Data

**The Problem:** GET requests should be idempotent and safe. Using GET for data modification violates HTTP semantics.

**The Solution:**
```csharp
// ❌ Bad - Using GET for deletion
[HttpGet("delete/{id}")]
public async Task<IActionResult> DeleteProduct(int id)
{
    await _productService.DeleteAsync(id);
    return Ok();
}

// ✅ Good - Using proper HTTP verbs
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteProduct(int id)
{
    var deleted = await _productService.DeleteAsync(id);
    
    if (!deleted)
        return NotFound();
    
    return NoContent();
}

[HttpPost("approve/{id}")]
public async Task<IActionResult> ApproveProduct(int id)
{
    var approved = await _productService.ApproveAsync(id);
    
    if (!approved)
        return NotFound();
    
    return Ok();
}
```

## 16. Forgetting to Log API Calls

**The Problem:** Without proper logging, debugging and monitoring become extremely difficult.

**The Solution:**
```csharp
public class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly IProductService _productService;

    public ProductController(ILogger<ProductController> logger, IProductService productService)
    {
        _logger = logger;
        _productService = productService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        _logger.LogInformation("Getting product with ID: {ProductId}", id);
        
        try
        {
            var product = await _productService.GetByIdAsync(id);
            
            if (product == null)
            {
                _logger.LogWarning("Product with ID {ProductId} not found", id);
                return NotFound();
            }
            
            _logger.LogInformation("Successfully retrieved product with ID: {ProductId}", id);
            return Ok(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving product with ID: {ProductId}", id);
            throw;
        }
    }
}

// In Program.cs - Add request logging middleware
app.UseHttpLogging();
```

## 17. Overcomplicating Authentication & Authorization

**The Problem:** Complex authentication schemes can introduce security vulnerabilities and maintenance overhead.

**The Solution:**
```csharp
// In Program.cs - Simple JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => 
        policy.RequireRole("Admin"));
    options.AddPolicy("UserOrAdmin", policy => 
        policy.RequireRole("User", "Admin"));
});

// In controllers
[Authorize]
[ApiController]
public class ProductController : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetProducts() { /* ... */ }

    [HttpPost]
    [Authorize(Policy = "UserOrAdmin")]
    public async Task<IActionResult> CreateProduct() { /* ... */ }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> DeleteProduct(int id) { /* ... */ }
}
```

## 18. Not Validating Input Data

**The Problem:** Invalid input can cause errors, security vulnerabilities, and data corruption.

**The Solution:**
```csharp
public class CreateProductDto
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; set; }

    [Required]
    [StringLength(500)]
    public string Description { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
    public decimal Price { get; set; }

    [Required]
    [EmailAddress]
    public string ContactEmail { get; set; }
}

[HttpPost]
public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto productDto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // Additional custom validation
    if (await _productService.ExistsAsync(productDto.Name))
    {
        ModelState.AddModelError(nameof(productDto.Name), "Product name already exists");
        return BadRequest(ModelState);
    }

    var product = await _productService.CreateAsync(productDto);
    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
}

// Custom validation attribute
public class NotFutureDataAttribute : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        if (value is DateTime date)
        {
            return date <= DateTime.Now;
        }
        return true;
    }
}
```

## 19. Poorly Designed Endpoint Naming

**The Problem:** Inconsistent or unclear endpoint names make APIs difficult to understand and use.

**The Solution:**
```csharp
// ❌ Bad naming
[Route("api/[controller]")]
public class BadController : ControllerBase
{
    [HttpGet("getall")] // Redundant "get"
    public IActionResult GetAllProducts() { }

    [HttpGet("product-detail/{id}")] // Inconsistent naming
    public IActionResult GetProductDetail(int id) { }

    [HttpPost("add")] // Non-standard
    public IActionResult AddProduct() { }
}

// ✅ Good naming - RESTful conventions
[Route("api/products")]
public class ProductsController : ControllerBase
{
    [HttpGet] // GET /api/products
    public async Task<IActionResult> GetProducts() { }

    [HttpGet("{id}")] // GET /api/products/123
    public async Task<IActionResult> GetProduct(int id) { }

    [HttpPost] // POST /api/products
    public async Task<IActionResult> CreateProduct() { }

    [HttpPut("{id}")] // PUT /api/products/123
    public async Task<IActionResult> UpdateProduct(int id) { }

    [HttpDelete("{id}")] // DELETE /api/products/123
    public async Task<IActionResult> DeleteProduct(int id) { }

    [HttpGet("{id}/reviews")] // GET /api/products/123/reviews
    public async Task<IActionResult> GetProductReviews(int id) { }
}
```

## 20. Hardcoding Configuration Values

**The Problem:** Hardcoded values make applications difficult to deploy across different environments.

**The Solution:**
```csharp
// ❌ Bad - Hardcoded values
public class EmailService
{
    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var client = new SmtpClient("smtp.gmail.com", 587); // Hardcoded!
        client.Credentials = new NetworkCredential("user@gmail.com", "password"); // Hardcoded!
        // ...
    }
}

// ✅ Good - Configuration-based
public class EmailOptions
{
    public string SmtpServer { get; set; }
    public int SmtpPort { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
}

public class EmailService
{
    private readonly EmailOptions _emailOptions;

    public EmailService(IOptions<EmailOptions> emailOptions)
    {
        _emailOptions = emailOptions.Value;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var client = new SmtpClient(_emailOptions.SmtpServer, _emailOptions.SmtpPort);
        client.Credentials = new NetworkCredential(_emailOptions.Username, _emailOptions.Password);
        // ...
    }
}

// In Program.cs
builder.Services.Configure<EmailOptions>(
    builder.Configuration.GetSection("Email"));

// In appsettings.json
{
  "Email": {
    "SmtpServer": "smtp.gmail.com",
    "SmtpPort": 587,
    "Username": "user@gmail.com",
    "Password": "password"
  }
}

// For sensitive data, use user secrets or environment variables
// dotnet user-secrets set "Email:Password" "your-password"
```

## Conclusion

Building robust C# Web APIs requires attention to many details, from proper HTTP client usage to secure authentication and good API design. By avoiding these common pitfalls and following established best practices, you can create APIs that are:

- **Performant**: Through proper caching, compression, and asynchronous operations
- **Secure**: With proper authentication, authorization, and input validation
- **Maintainable**: Through dependency injection, good logging, and clear documentation
- **Scalable**: With rate limiting, pagination, and efficient resource usage
- **Developer-friendly**: With consistent naming, proper status codes, and comprehensive documentation

Remember that building great APIs is an iterative process. Start with the fundamentals and gradually implement more advanced features as your application grows. Each of these practices contributes to a better overall API experience for both developers and end users.

The investment in implementing these best practices early in your project will pay dividends in reduced bugs, easier maintenance, and happier users. Your future self (and your team) will thank you for taking the time to do it right from the start.