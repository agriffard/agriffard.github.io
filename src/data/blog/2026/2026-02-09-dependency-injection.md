---
title: 'Dependency Injection: Lifetimes, Composition Root, Decorators, and Anti-Patterns'
slug: dependency-injection
author: agriffard
pubDatetime: 2026-02-09T12:00:00Z
categories: [AI, .NET, Architecture]
tags: [DependencyInjection, Design Patterns, SOLID]
description: Master Dependency Injection in .NET with comprehensive coverage of lifetimes, composition root patterns, decorators, and common anti-patterns to avoid.
---

Dependency Injection (DI) is a fundamental design pattern in modern .NET applications. However, implementing it correctly requires understanding several critical concepts. This guide explores DI beyond the basics, covering lifetimes, composition root patterns, decorators, and the anti-patterns that can undermine your architecture.

## What is Dependency Injection?

Dependency Injection is a technique for achieving loose coupling between objects by externalizing the creation and management of dependencies. Instead of a class creating its dependencies, it receives them from an external container or factory.

```csharp
// Without DI - tightly coupled
public class OrderService
{
    private readonly PaymentProcessor _paymentProcessor = new PaymentProcessor();
    
    public void ProcessOrder(Order order)
    {
        _paymentProcessor.Process(order);
    }
}

// With DI - loosely coupled
public class OrderService
{
    private readonly IPaymentProcessor _paymentProcessor;
    
    public OrderService(IPaymentProcessor paymentProcessor)
    {
        _paymentProcessor = paymentProcessor;
    }
    
    public void ProcessOrder(Order order)
    {
        _paymentProcessor.Process(order);
    }
}
```

## Understanding Lifetimes

The lifetime of a dependency determines how long an instance lives and whether it's reused across requests. This is crucial for memory management, state isolation, and thread safety.

### Transient Lifetime

**Transient** dependencies are created fresh every time they're requested. A new instance is created for each injection point.

```csharp
services.AddTransient<IOrderRepository, OrderRepository>();

// Usage
var logger1 = serviceProvider.GetService<IOrderRepository>();
var logger2 = serviceProvider.GetService<IOrderRepository>();
// logger1 and logger2 are different instances
```

**Use Transient when:**
- The service is stateless or holds only request-specific state
- You need to ensure no state is shared between operations
- The service is lightweight to create

**Example:**
```csharp
public interface ILogger { }

public class OrderLogger : ILogger
{
    private Guid _instanceId = Guid.NewGuid();
}

// Registering as transient
services.AddTransient<ILogger, OrderLogger>();
```

### Scoped Lifetime

**Scoped** dependencies are created once per scope (typically per HTTP request in web applications). The same instance is reused throughout the scope.

```csharp
services.AddScoped<IOrderRepository, OrderRepository>();

// In an HTTP request, the same OrderRepository instance is used
// for all operations within that request
```

**Use Scoped when:**
- The service maintains state specific to a unit of work (request, transaction, etc.)
- You need to optimize database connections or other resources per request
- The service implements the Unit of Work pattern

**Example:**
```csharp
public interface IUnitOfWork : IDisposable
{
    IOrderRepository Orders { get; }
    IProductRepository Products { get; }
    Task SaveChangesAsync();
}

public class UnitOfWork : IUnitOfWork
{
    public IOrderRepository Orders { get; }
    public IProductRepository Products { get; }
    
    // Registered as scoped - ensures transactions stay consistent
}

services.AddScoped<IUnitOfWork, UnitOfWork>();
```

### Singleton Lifetime

**Singleton** dependencies are created once and reused throughout the application lifetime. There's only one instance for the entire application.

```csharp
services.AddSingleton<IApplicationConfiguration, ApplicationConfiguration>();

// The same instance is used everywhere
var config1 = serviceProvider.GetService<IApplicationConfiguration>();
var config2 = serviceProvider.GetService<IApplicationConfiguration>();
// config1 and config2 are the same instance
```

**Use Singleton when:**
- The service is stateless and thread-safe
- The service holds expensive resources (connection pools, caches)
- Configuration and settings that never change
- Services that provide shared caching

**Example:**
```csharp
public interface IMemoryCache
{
    void Set<T>(string key, T value);
    bool TryGetValue<T>(string key, out T value);
}

public class InMemoryCache : IMemoryCache
{
    private readonly ConcurrentDictionary<string, object> _cache 
        = new();
    
    // Thread-safe operations
    public void Set<T>(string key, T value)
    {
        _cache[key] = value;
    }
    
    public bool TryGetValue<T>(string key, out T value)
    {
        if (_cache.TryGetValue(key, out var obj) && obj is T typedValue)
        {
            value = typedValue;
            return true;
        }
        value = default;
        return false;
    }
}

services.AddSingleton<IMemoryCache, InMemoryCache>();
```

### Lifetime Comparison Table

| Lifetime | Instance Count | Reuse | Memory | Use Case |
|----------|---|---|---|---|
| **Transient** | Every request | No | Low | Stateless services |
| **Scoped** | Per scope (request) | Within scope | Medium | Unit of work, DbContext |
| **Singleton** | Once | Always | Variable | Config, caches, pools |

## The Composition Root Pattern

The Composition Root is the sole location in your application where dependencies are configured and the entire object graph is instantiated. This is typically your application's startup.

### Purpose of Composition Root

- **Single Responsibility:** All dependency configuration is in one place
- **Testability:** Makes it easy to swap implementations for testing
- **Consistency:** Ensures dependency configuration is applied uniformly
- **Clarity:** New developers can see the entire dependency structure

### Example: Web API Composition Root

```csharp
// Program.cs - The Composition Root
public static void Main(string[] args)
{
    var builder = WebApplication.CreateBuilder(args);
    
    // Register infrastructure
    builder.Services.AddScoped<IOrderRepository>(provider =>
    {
        var connectionString = builder.Configuration.GetConnectionString("Default");
        return new SqlOrderRepository(connectionString);
    });
    
    // Register services
    builder.Services.AddScoped<IOrderService, OrderService>();
    builder.Services.AddScoped<IPaymentService, PaymentService>();
    
    // Register cross-cutting concerns
    builder.Services.AddSingleton<ILogger>(new ConsoleLogger());
    builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
    
    var app = builder.Build();
    
    app.MapControllers();
    app.Run();
}
```

### Multi-Environment Composition Root

```csharp
public static void ConfigureServices(IServiceCollection services, 
    IConfiguration config, IHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        services.AddScoped<IOrderRepository, MockOrderRepository>();
        services.AddScoped<IPaymentProcessor, MockPaymentProcessor>();
    }
    else
    {
        services.AddScoped<IOrderRepository, SqlOrderRepository>();
        services.AddScoped<IPaymentProcessor, StripePaymentProcessor>();
    }
    
    // Shared services
    services.AddSingleton<IApplicationSettings, ApplicationSettings>();
    services.AddScoped<IOrderService, OrderService>();
}
```

## The Decorator Pattern with DI

The Decorator Pattern allows you to dynamically extend object functionality without altering the original code. It's particularly powerful when combined with dependency injection.

### Basic Decorator Implementation

```csharp
public interface IOrderService
{
    Task<Order> GetOrderAsync(int orderId);
    Task ProcessOrderAsync(Order order);
}

public class OrderService : IOrderService
{
    private readonly IOrderRepository _repository;
    
    public OrderService(IOrderRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<Order> GetOrderAsync(int orderId)
    {
        return await _repository.GetOrderAsync(orderId);
    }
    
    public async Task ProcessOrderAsync(Order order)
    {
        // Core business logic
        order.Status = OrderStatus.Processing;
        await _repository.UpdateOrderAsync(order);
    }
}

// Decorator: Logging
public class LoggingOrderServiceDecorator : IOrderService
{
    private readonly IOrderService _innerService;
    private readonly ILogger _logger;
    
    public LoggingOrderServiceDecorator(IOrderService innerService, ILogger logger)
    {
        _innerService = innerService;
        _logger = logger;
    }
    
    public async Task<Order> GetOrderAsync(int orderId)
    {
        _logger.Log($"Getting order {orderId}");
        var result = await _innerService.GetOrderAsync(orderId);
        _logger.Log($"Retrieved order {orderId}");
        return result;
    }
    
    public async Task ProcessOrderAsync(Order order)
    {
        _logger.Log($"Processing order {order.Id}");
        await _innerService.ProcessOrderAsync(order);
        _logger.Log($"Order {order.Id} processed");
    }
}

// Decorator: Caching
public class CachingOrderServiceDecorator : IOrderService
{
    private readonly IOrderService _innerService;
    private readonly IMemoryCache _cache;
    
    public CachingOrderServiceDecorator(IOrderService innerService, IMemoryCache cache)
    {
        _innerService = innerService;
        _cache = cache;
    }
    
    public async Task<Order> GetOrderAsync(int orderId)
    {
        var cacheKey = $"order_{orderId}";
        
        if (_cache.TryGetValue(cacheKey, out Order cachedOrder))
            return cachedOrder;
        
        var order = await _innerService.GetOrderAsync(orderId);
        _cache.Set(cacheKey, order, TimeSpan.FromHours(1));
        return order;
    }
    
    public Task ProcessOrderAsync(Order order)
    {
        // Clear cache for this order
        _cache.Remove($"order_{order.Id}");
        return _innerService.ProcessOrderAsync(order);
    }
}

// Decorator: Audit/Validation
public class ValidatingOrderServiceDecorator : IOrderService
{
    private readonly IOrderService _innerService;
    private readonly IValidator<Order> _validator;
    
    public ValidatingOrderServiceDecorator(IOrderService innerService, 
        IValidator<Order> validator)
    {
        _innerService = innerService;
        _validator = validator;
    }
    
    public async Task<Order> GetOrderAsync(int orderId)
    {
        if (orderId <= 0)
            throw new ArgumentException("Invalid order ID");
        
        return await _innerService.GetOrderAsync(orderId);
    }
    
    public async Task ProcessOrderAsync(Order order)
    {
        var validationResult = await _validator.ValidateAsync(order);
        if (!validationResult.IsValid)
            throw new ValidationException(validationResult.Errors);
        
        await _innerService.ProcessOrderAsync(order);
    }
}
```

### Stacking Decorators in DI Container

```csharp
// Register the core service
services.AddScoped<OrderService>();

// Register decorators
services.AddScoped<IOrderService>(provider =>
{
    var coreService = provider.GetRequiredService<OrderService>();
    
    // Apply decorators in order (innermost to outermost)
    IOrderService decorated = coreService;
    
    // First decorator: validation
    decorated = new ValidatingOrderServiceDecorator(
        decorated, 
        provider.GetRequiredService<IValidator<Order>>()
    );
    
    // Second decorator: caching
    decorated = new CachingOrderServiceDecorator(
        decorated, 
        provider.GetRequiredService<IMemoryCache>()
    );
    
    // Third decorator: logging (outermost)
    decorated = new LoggingOrderServiceDecorator(
        decorated, 
        provider.GetRequiredService<ILogger>()
    );
    
    return decorated;
});
```

### Decorator Benefits

- **Separation of Concerns:** Each decorator handles one responsibility
- **Composition Over Inheritance:** Flexible combinations without deep hierarchies
- **Open/Closed Principle:** Open for extension, closed for modification
- **Reusability:** Decorators can wrap different implementations

## Common Anti-Patterns

### Anti-Pattern 1: Service Locator

The Service Locator pattern masks dependencies and makes them implicit. It's considered an anti-pattern because it hides what your class actually needs.

```csharp
// ❌ ANTI-PATTERN: Service Locator
public class OrderService
{
    private readonly IServiceProvider _serviceProvider;
    
    public OrderService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    
    public void ProcessOrder(Order order)
    {
        // Hidden dependencies!
        var paymentProcessor = _serviceProvider.GetService<IPaymentProcessor>();
        var emailService = _serviceProvider.GetService<IEmailService>();
        var logger = _serviceProvider.GetService<ILogger>();
        
        // Use services...
    }
}

// ✅ CORRECT: Explicit Dependencies
public class OrderService
{
    private readonly IPaymentProcessor _paymentProcessor;
    private readonly IEmailService _emailService;
    private readonly ILogger _logger;
    
    public OrderService(IPaymentProcessor paymentProcessor, 
        IEmailService emailService, ILogger logger)
    {
        _paymentProcessor = paymentProcessor;
        _emailService = emailService;
        _logger = logger;
    }
    
    public void ProcessOrder(Order order)
    {
        _paymentProcessor.Process(order);
        _emailService.SendConfirmation(order);
        _logger.Log($"Order {order.Id} processed");
    }
}
```

### Anti-Pattern 2: Captive Dependency

A captive dependency occurs when a longer-lived dependency holds a reference to a shorter-lived dependency. This can cause issues like leaked state or unexpected behavior.

```csharp
// ❌ ANTI-PATTERN: Captive Dependency
services.AddSingleton<IOrderRepository, OrderRepository>();
services.AddScoped<DbContext>();

public class OrderRepository
{
    private readonly DbContext _dbContext; // Scoped, but held by Singleton!
    
    public OrderRepository(DbContext dbContext)
    {
        _dbContext = dbContext; // DbContext lives longer than intended
    }
}

// ✅ CORRECT: Match Lifetimes
services.AddScoped<IOrderRepository, OrderRepository>();
services.AddScoped<DbContext>();

// Or use a factory
services.AddSingleton<IOrderRepositoryFactory>(provider =>
    new OrderRepositoryFactory(
        () => provider.CreateScope().ServiceProvider.GetRequiredService<DbContext>()
    )
);
```

### Anti-Pattern 3: Mutable Dependencies

Passing mutable objects through the DI container can lead to unexpected state changes and race conditions.

```csharp
// ❌ ANTI-PATTERN: Mutable Singleton
public class AppSettings
{
    public string ConnectionString { get; set; }
    public int MaxConnections { get; set; }
}

services.AddSingleton(new AppSettings 
{ 
    ConnectionString = "...", 
    MaxConnections = 10 
});

// Anti-Pattern 4: Ambient Context / Static Service Locator

// ❌ ANTI-PATTERN: Ambient Context
public static class ServiceContext
{
    public static IOrderService OrderService { get; set; }
    
    public static void ProcessOrder(Order order)
    {
        OrderService.Process(order); // Where does this come from?
    }
}

// ✅ CORRECT: Immutable Configuration
public record AppSettings(string ConnectionString, int MaxConnections);

services.AddSingleton<AppSettings>(
    new AppSettings(config["ConnectionString"], 10)
);
```

### Anti-Pattern 4: Creating Dependencies Inside Services

Services should not create their own dependencies. This defeats the purpose of DI.

```csharp
// ❌ ANTI-PATTERN: Creating Dependencies
public class OrderService
{
    public void ProcessOrder(Order order)
    {
        var paymentProcessor = new PaymentProcessor(); // Hard to test, tightly coupled
        paymentProcessor.Process(order);
    }
}

// ✅ CORRECT: Injected Dependencies
public class OrderService
{
    private readonly IPaymentProcessor _paymentProcessor;
    
    public OrderService(IPaymentProcessor paymentProcessor)
    {
        _paymentProcessor = paymentProcessor;
    }
    
    public void ProcessOrder(Order order)
    {
        _paymentProcessor.Process(order);
    }
}
```

### Anti-Pattern 5: Dependency Hell (Too Many Dependencies)

When a class requires many dependencies, it's a sign of too many responsibilities.

```csharp
// ❌ ANTI-PATTERN: Too Many Dependencies
public class OrderService
{
    public OrderService(
        IOrderRepository orderRepository,
        IPaymentProcessor paymentProcessor,
        IEmailService emailService,
        ILogger logger,
        IInventoryService inventoryService,
        ITaxCalculator taxCalculator,
        IDiscountEngine discountEngine,
        IAuditService auditService,
        INotificationService notificationService,
        ICacheService cacheService)
    {
        // Constructor becomes unwieldy
    }
}

// ✅ CORRECT: Extract Composed/Aggregate Services
public class OrderProcessingPipeline
{
    private readonly IPaymentProcessor _paymentProcessor;
    private readonly IInventoryService _inventoryService;
    private readonly ITaxCalculator _taxCalculator;
    private readonly IDiscountEngine _discountEngine;
    // ... composed behavior
}

public class OrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly OrderProcessingPipeline _pipeline;
    private readonly ILogger _logger;
    
    public OrderService(IOrderRepository orderRepository, 
        OrderProcessingPipeline pipeline, ILogger logger)
    {
        // Much cleaner
    }
}
```

## Best Practices

1. **Keep Composition Root Simple:** Use extension methods for organized registration
2. **Prefer Constructor Injection:** It makes dependencies explicit and testable
3. **Use Appropriate Lifetimes:** Understand the implications of each lifetime
4. **Avoid Circular Dependencies:** Redesign your architecture if this occurs
5. **Favor Composition Over Inheritance:** Use decorators and composition for flexibility
6. **Test Your DI Configuration:** Ensure services are properly wired
7. **Document Complex Decorators:** Especially when stacking multiple decorators
8. **Use Named Registrations Sparingly:** Prefer clear interfaces instead

## Conclusion

Dependency Injection is powerful when implemented correctly. By understanding lifetimes, using composition root patterns, leveraging decorators, and avoiding common anti-patterns, you'll build maintainable, testable, and flexible applications. The key is thinking about dependencies as a first-class concern in your application architecture.
