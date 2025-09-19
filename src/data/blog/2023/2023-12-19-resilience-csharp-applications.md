---
title: Building Resilient C# Applications
slug: resilience
author: agriffard
pubDatetime: 2023-12-19T12:00:00Z
categories: [DotNet]
tags: [AI, Resilience]
description: Learn how to build resilient C# applications.
---

In today's distributed systems landscape, **resilience** is not just a nice-to-have feature—it's essential. Network failures, service outages, and temporary glitches are inevitable. The key is building applications that can gracefully handle these disruptions and recover automatically.

Microsoft has introduced **Microsoft.Extensions.Resilience**, a powerful library that brings enterprise-grade resilience patterns to .NET applications. This library provides a comprehensive toolkit for implementing circuit breakers, retries, timeouts, and other patterns that make your applications more robust.

## Table of Contents

## What is Resilience in Software Architecture?

**Resilience** refers to a system's ability to handle and recover from failures gracefully. Instead of cascading failures that bring down entire systems, resilient applications:

- **Degrade gracefully** when dependencies fail.
- **Recover automatically** when services come back online  .
- **Prevent cascade failures** from spreading through the system.
- **Provide fallback mechanisms** when primary paths fail.

Common resilience patterns include:

- **Circuit Breaker**: Prevents calls to failing services.
- **Retry**: Automatically retries failed operations.
- **Timeout**: Limits how long operations can run.
- **Rate Limiting**: Controls the rate of requests.
- **Bulkhead**: Isolates critical resources.
- **Fallback**: Provides alternative responses when primary operations fail.

## Microsoft.Extensions.Resilience Overview

Microsoft.Extensions.Resilience is built on top of the popular **Polly** library and provides a standardized way to add resilience to .NET applications. It offers:

- **Fluent configuration API** for defining resilience strategies
- **Integration with dependency injection** for easy setup
- **Telemetry and logging** out of the box
- **Standardized resilience handlers** for common scenarios
- **Composable strategies** that can be combined

### Installation

Add the package to your project:

```bash
dotnet add package Microsoft.Extensions.Resilience
```

For HTTP clients, you'll also want:

```bash
dotnet add package Microsoft.Extensions.Http.Resilience
```

## Core Resilience Patterns

### Circuit Breaker Pattern

The circuit breaker pattern prevents an application from repeatedly trying to execute an operation that's likely to fail. It monitors failures and "opens" the circuit when failures exceed a threshold.

```csharp
services.AddResilienceHandler("my-handler", builder =>
{
    builder.AddCircuitBreaker(new CircuitBreakerStrategyOptions
    {
        FailureRatio = 0.5, // Open circuit at 50% failure rate
        SamplingDuration = TimeSpan.FromSeconds(10),
        MinimumThroughput = 5,
        BreakDuration = TimeSpan.FromSeconds(30)
    });
});
```

### Retry Pattern

The retry pattern automatically retries failed operations with configurable delays and limits.

```csharp
services.AddResilienceHandler("retry-handler", builder =>
{
    builder.AddRetry(new RetryStrategyOptions
    {
        ShouldHandle = new PredicateBuilder().Handle<HttpRequestException>(),
        MaxRetryAttempts = 3,
        Delay = TimeSpan.FromSeconds(2),
        BackoffType = DelayBackoffType.Exponential,
        UseJitter = true
    });
});
```

### Timeout Pattern

Timeouts ensure operations don't run indefinitely:

```csharp
services.AddResilienceHandler("timeout-handler", builder =>
{
    builder.AddTimeout(TimeSpan.FromSeconds(30));
});
```

### Rate Limiting

Control the rate of operations to protect downstream services:

```csharp
services.AddResilienceHandler("rate-limit-handler", builder =>
{
    builder.AddRateLimiter(new SlidingWindowRateLimiter(new SlidingWindowRateLimiterOptions
    {
        PermitLimit = 100,
        Window = TimeSpan.FromMinutes(1)
    }));
});
```

## Using AddStandardResilienceHandler

One of the most powerful features of Microsoft.Extensions.Resilience is the **`AddStandardResilienceHandler`** method. This method provides a pre-configured resilience strategy that combines multiple patterns optimized for typical scenarios.

### What's Included in Standard Resilience

The standard resilience handler includes:

- **Retry strategy** with exponential backoff
- **Circuit breaker** with sensible defaults
- **Timeout handling** for both overall and attempt-level timeouts
- **Rate limiting** capabilities
- **Proper telemetry and logging**

### Basic Usage

```csharp
// In Program.cs or Startup.cs
services.AddHttpClient<IWeatherService, WeatherService>()
    .AddStandardResilienceHandler();
```

This single line adds comprehensive resilience to your HTTP client with battle-tested defaults.

### Customizing Standard Resilience

You can customize the standard resilience behavior:

```csharp
services.AddHttpClient<IOrderService, OrderService>()
    .AddStandardResilienceHandler(options =>
    {
        // Customize retry options
        options.Retry.MaxRetryAttempts = 5;
        options.Retry.Delay = TimeSpan.FromSeconds(1);
        options.Retry.BackoffType = DelayBackoffType.Linear;
        
        // Customize circuit breaker
        options.CircuitBreaker.FailureRatio = 0.3;
        options.CircuitBreaker.MinimumThroughput = 10;
        options.CircuitBreaker.BreakDuration = TimeSpan.FromMinutes(1);
        
        // Customize timeouts
        options.TotalRequestTimeout.Timeout = TimeSpan.FromMinutes(2);
        options.AttemptTimeout.Timeout = TimeSpan.FromSeconds(30);
    });
```

### Advanced Configuration

For more complex scenarios, you can configure individual strategies:

```csharp
services.AddHttpClient<IPaymentService, PaymentService>()
    .AddStandardResilienceHandler(options =>
    {
        // Configure what exceptions should trigger retries
        options.Retry.ShouldHandle = new PredicateBuilder()
            .Handle<HttpRequestException>()
            .Handle<TaskCanceledException>()
            .HandleResult<HttpResponseMessage>(response => 
                response.StatusCode >= HttpStatusCode.InternalServerError);
        
        // Add custom logic for circuit breaker
        options.CircuitBreaker.ShouldHandle = new PredicateBuilder()
            .Handle<HttpRequestException>()
            .HandleResult<HttpResponseMessage>(response => 
                response.StatusCode == HttpStatusCode.ServiceUnavailable);
    });
```

## Real-World Example: E-commerce Service

Let's build a complete example for an e-commerce application that needs to call multiple external services:

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        // Payment service - critical, needs aggressive resilience
        builder.Services.AddHttpClient<IPaymentService, PaymentService>(client =>
        {
            client.BaseAddress = new Uri("https://api.payment-provider.com");
        })
        .AddStandardResilienceHandler(options =>
        {
            options.Retry.MaxRetryAttempts = 5;
            options.CircuitBreaker.FailureRatio = 0.25; // More sensitive
            options.TotalRequestTimeout.Timeout = TimeSpan.FromMinutes(3);
        });
        
        // Inventory service - important but can tolerate some failures
        builder.Services.AddHttpClient<IInventoryService, InventoryService>(client =>
        {
            client.BaseAddress = new Uri("https://api.inventory.com");
        })
        .AddStandardResilienceHandler(options =>
        {
            options.Retry.MaxRetryAttempts = 3;
            options.CircuitBreaker.FailureRatio = 0.5;
        });
        
        // Recommendations service - nice-to-have, can fail gracefully
        builder.Services.AddHttpClient<IRecommendationService, RecommendationService>(client =>
        {
            client.BaseAddress = new Uri("https://api.recommendations.com");
        })
        .AddStandardResilienceHandler(options =>
        {
            options.Retry.MaxRetryAttempts = 1; // Minimal retries
            options.CircuitBreaker.FailureRatio = 0.8; // Very tolerant
            options.TotalRequestTimeout.Timeout = TimeSpan.FromSeconds(5); // Fast timeout
        });
        
        var app = builder.Build();
        app.Run();
    }
}
```

### Service Implementation with Fallbacks

```csharp
public class OrderService
{
    private readonly IPaymentService _paymentService;
    private readonly IInventoryService _inventoryService;
    private readonly IRecommendationService _recommendationService;
    private readonly ILogger<OrderService> _logger;
    
    public OrderService(
        IPaymentService paymentService,
        IInventoryService inventoryService,
        IRecommendationService recommendationService,
        ILogger<OrderService> logger)
    {
        _paymentService = paymentService;
        _inventoryService = inventoryService;
        _recommendationService = recommendationService;
        _logger = logger;
    }
    
    public async Task<OrderResult> ProcessOrderAsync(OrderRequest request)
    {
        try
        {
            // Critical operations - must succeed
            var inventoryResult = await _inventoryService.CheckAvailabilityAsync(request.ProductId);
            if (!inventoryResult.IsAvailable)
            {
                return OrderResult.Failed("Product not available");
            }
            
            var paymentResult = await _paymentService.ProcessPaymentAsync(request.Payment);
            if (!paymentResult.IsSuccessful)
            {
                return OrderResult.Failed("Payment failed");
            }
            
            // Non-critical operation - can fail gracefully
            var recommendations = await GetRecommendationsWithFallback(request.CustomerId);
            
            return OrderResult.Success(paymentResult.TransactionId, recommendations);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process order {OrderId}", request.Id);
            return OrderResult.Failed("Order processing failed");
        }
    }
    
    private async Task<List<Product>> GetRecommendationsWithFallback(string customerId)
    {
        try
        {
            return await _recommendationService.GetRecommendationsAsync(customerId);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Recommendations service failed for customer {CustomerId}", customerId);
            // Return empty list as fallback
            return new List<Product>();
        }
    }
}
```

## Monitoring and Observability

Microsoft.Extensions.Resilience provides built-in telemetry that integrates with .NET's observability stack:

### Metrics

The library emits metrics for:
- Retry attempts and outcomes
- Circuit breaker state changes
- Timeout occurrences
- Rate limiting events

```csharp
// Configure metrics collection
builder.Services.Configure<TelemetryOptions>(options =>
{
    options.Logging.LoggerName = "MyApp.Resilience";
    options.Metering.MeterName = "MyApp.Resilience";
});
```

### Logging

Structured logs are automatically created for resilience events:

```csharp
// Example log output
[Information] Resilience event occurred. EventName: 'OnRetry', Source: 'my-handler', Operation: 'GetWeatherAsync', Attempt: 2, ExecutionTime: 00:00:02.1234567
```

### Custom Telemetry

You can add custom telemetry for business-specific metrics:

```csharp
services.AddResilienceHandler("custom-handler", builder =>
{
    builder.AddRetry(new RetryStrategyOptions())
           .AddTimeout(TimeSpan.FromSeconds(30));
    
    // Add custom telemetry
    builder.ConfigureTelemetry(telemetry =>
    {
        telemetry.Configure(options =>
        {
            options.ResultFormatter = (outcome) => outcome.Exception?.GetType().Name ?? "Success";
        });
    });
});
```

## Best Practices

### 1. Choose Appropriate Timeouts
- **Total request timeout**: Maximum time for the entire operation
- **Attempt timeout**: Maximum time for each individual attempt
- Make attempt timeout < total timeout / max retries

### 2. Configure Circuit Breakers Thoughtfully
- Set failure ratio based on service SLA (e.g., 50% for non-critical services)
- Use appropriate sampling windows (10-60 seconds)
- Set break duration to allow service recovery time

### 3. Use Jitter for Retries
- Always enable jitter to prevent thundering herd problems
- Use exponential backoff for most scenarios
- Consider linear backoff for time-sensitive operations

### 4. Handle Different Exception Types
```csharp
options.Retry.ShouldHandle = new PredicateBuilder()
    .Handle<HttpRequestException>()           // Network issues
    .Handle<TaskCanceledException>()          // Timeouts
    .HandleResult<HttpResponseMessage>(r => 
        r.StatusCode >= HttpStatusCode.InternalServerError); // Server errors
```

### 5. Implement Graceful Degradation
```csharp
public async Task<WeatherData> GetWeatherAsync(string city)
{
    try
    {
        return await _weatherService.GetCurrentWeatherAsync(city);
    }
    catch (Exception)
    {
        // Return cached data or default values
        return _cache.GetLastKnownWeather(city) ?? WeatherData.Default;
    }
}
```

## Performance Considerations

### Memory Usage
- Resilience handlers are lightweight and can be cached
- Use dependency injection to share handlers across components
- Avoid creating new handlers for each operation

### CPU Overhead
- The overhead of resilience patterns is minimal (< 1ms typically)
- Circuit breakers have almost zero overhead when closed
- Jitter calculations are computationally cheap

### Network Efficiency
- Configure appropriate timeouts to avoid wasted resources
- Use circuit breakers to fail fast when services are down
- Implement proper backoff to reduce load on failing services

## Testing Resilient Applications

### Unit Testing
```csharp
[Test]
public async Task Should_Retry_On_Transient_Failure()
{
    // Arrange
    var mockHandler = new Mock<HttpMessageHandler>();
    mockHandler.SetupSequence(x => x.SendAsync(It.IsAny<HttpRequestMessage>(), It.IsAny<CancellationToken>()))
        .ThrowsAsync(new HttpRequestException())
        .ThrowsAsync(new HttpRequestException())
        .ReturnsAsync(new HttpResponseMessage(HttpStatusCode.OK));
    
    var httpClient = new HttpClient(mockHandler.Object);
    var service = new WeatherService(httpClient);
    
    // Act
    var result = await service.GetWeatherAsync("London");
    
    // Assert
    Assert.That(result, Is.Not.Null);
    mockHandler.Verify(x => x.SendAsync(It.IsAny<HttpRequestMessage>(), It.IsAny<CancellationToken>()), 
        Times.Exactly(3));
}
```

### Integration Testing
```csharp
[Test]
public async Task Should_Handle_Service_Outage()
{
    // Simulate service outage using test containers or mock servers
    using var factory = new WebApplicationFactory<Program>();
    
    // Configure test to use failing service
    var client = factory.WithWebHostBuilder(builder =>
    {
        builder.ConfigureServices(services =>
        {
            services.PostConfigure<StandardResilienceOptions>(options =>
            {
                options.CircuitBreaker.MinimumThroughput = 1;
                options.CircuitBreaker.BreakDuration = TimeSpan.FromSeconds(1);
            });
        });
    }).CreateClient();
    
    // Test that circuit breaker opens and closes appropriately
}
```

## Conclusion

Building resilient applications is crucial in today's distributed architecture landscape. Microsoft.Extensions.Resilience, with its `AddStandardResilienceHandler` method, makes it incredibly easy to add enterprise-grade resilience patterns to your .NET applications.

Key takeaways:

- **Start with `AddStandardResilienceHandler`** for most scenarios
- **Customize based on service criticality** and SLA requirements  
- **Implement graceful degradation** with fallback mechanisms
- **Monitor and observe** resilience events for continuous improvement
- **Test resilience patterns** to ensure they work as expected

By implementing these patterns, you'll build applications that gracefully handle failures, provide better user experiences, and maintain high availability even when dependencies are struggling.

Remember: resilience is not about preventing failures—it's about handling them gracefully when they inevitably occur.

## Resources

- [Microsoft.Extensions.Resilience Documentation](https://learn.microsoft.com/en-us/dotnet/core/resilience/)
- [Polly Documentation](https://www.pollydocs.org/)
- [.NET Resilience Patterns](https://learn.microsoft.com/en-us/dotnet/architecture/cloud-native/resiliency-patterns)
- [Circuit Breaker Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)