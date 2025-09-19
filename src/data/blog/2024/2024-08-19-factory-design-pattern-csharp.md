---
title: "Factory Design Pattern in C#: Complete Guide with Examples"
slug: factory-design-pattern-csharp
author: agriffard
pubDatetime: 2024-08-19T12:00:00Z
categories: [DotNet]
tags: [AI, DesignPatterns, CSharp]
description: "Master the Factory design pattern in C# with practical examples, best practices, and real-world implementations. Learn Simple Factory, Factory Method, and Abstract Factory patterns."
featured: true
---

The **Factory design pattern** is one of the most widely used creational patterns in software development. It provides a way to create objects without specifying their exact classes, promoting loose coupling and making your code more maintainable and testable.

In this comprehensive guide, we'll explore three variations of the Factory pattern in C#: Simple Factory, Factory Method, and Abstract Factory, with practical examples and best practices.

## Table of Contents

## What is the Factory Design Pattern?

The Factory pattern encapsulates object creation logic, allowing you to create objects through a common interface without exposing the instantiation logic to the client code. This promotes the **Open/Closed Principle** - your code is open for extension but closed for modification.

### Key Benefits

- **Loose Coupling**: Clients depend on abstractions, not concrete implementations
- **Centralized Creation**: Object creation logic is centralized and reusable
- **Easy Testing**: Mock objects can be easily injected
- **Extensibility**: New types can be added without modifying existing code

## 1. Simple Factory Pattern

The Simple Factory is the most basic implementation, where a single factory class is responsible for creating objects based on input parameters.

### Example: Document Processor

```csharp
// Abstract product
public abstract class Document
{
    public abstract void Process();
    public abstract string GetFileExtension();
}

// Concrete products
public class PdfDocument : Document
{
    public override void Process()
    {
        Console.WriteLine("Processing PDF document...");
    }

    public override string GetFileExtension() => ".pdf";
}

public class WordDocument : Document
{
    public override void Process()
    {
        Console.WriteLine("Processing Word document...");
    }

    public override string GetFileExtension() => ".docx";
}

public class ExcelDocument : Document
{
    public override void Process()
    {
        Console.WriteLine("Processing Excel document...");
    }

    public override string GetFileExtension() => ".xlsx";
}

// Simple Factory
public static class DocumentFactory
{
    public static Document CreateDocument(string documentType)
    {
        return documentType.ToLower() switch
        {
            "pdf" => new PdfDocument(),
            "word" => new WordDocument(),
            "excel" => new ExcelDocument(),
            _ => throw new ArgumentException($"Unknown document type: {documentType}")
        };
    }
}

// Usage
var document = DocumentFactory.CreateDocument("pdf");
document.Process(); // Output: Processing PDF document...
```

### Pros and Cons of Simple Factory

**Pros:**
- Simple to implement and understand
- Centralizes object creation logic
- Easy to maintain for small numbers of types

**Cons:**
- Violates Open/Closed Principle (factory must be modified for new types)
- Can become unwieldy with many product types
- Static nature makes testing more difficult

## 2. Factory Method Pattern

The Factory Method pattern defines an interface for creating objects, but lets subclasses decide which class to instantiate. This allows the factory method to defer instantiation to subclasses.

### Example: Payment Processing System

```csharp
// Product interface
public interface IPaymentProcessor
{
    PaymentResult ProcessPayment(decimal amount, string currency);
}

// Concrete products
public class CreditCardProcessor : IPaymentProcessor
{
    public PaymentResult ProcessPayment(decimal amount, string currency)
    {
        Console.WriteLine($"Processing credit card payment: {amount} {currency}");
        return new PaymentResult { Success = true, TransactionId = Guid.NewGuid().ToString() };
    }
}

public class PayPalProcessor : IPaymentProcessor
{
    public PaymentResult ProcessPayment(decimal amount, string currency)
    {
        Console.WriteLine($"Processing PayPal payment: {amount} {currency}");
        return new PaymentResult { Success = true, TransactionId = Guid.NewGuid().ToString() };
    }
}

public class BankTransferProcessor : IPaymentProcessor
{
    public PaymentResult ProcessPayment(decimal amount, string currency)
    {
        Console.WriteLine($"Processing bank transfer: {amount} {currency}");
        return new PaymentResult { Success = true, TransactionId = Guid.NewGuid().ToString() };
    }
}

// Creator abstract class
public abstract class PaymentService
{
    // Factory method
    protected abstract IPaymentProcessor CreatePaymentProcessor();

    // Template method that uses the factory method
    public PaymentResult ProcessPayment(decimal amount, string currency)
    {
        var processor = CreatePaymentProcessor();
        return processor.ProcessPayment(amount, currency);
    }
}

// Concrete creators
public class CreditCardPaymentService : PaymentService
{
    protected override IPaymentProcessor CreatePaymentProcessor()
    {
        return new CreditCardProcessor();
    }
}

public class PayPalPaymentService : PaymentService
{
    protected override IPaymentProcessor CreatePaymentProcessor()
    {
        return new PayPalProcessor();
    }
}

public class BankTransferPaymentService : PaymentService
{
    protected override IPaymentProcessor CreatePaymentProcessor()
    {
        return new BankTransferProcessor();
    }
}

// Supporting classes
public class PaymentResult
{
    public bool Success { get; set; }
    public string TransactionId { get; set; }
    public string ErrorMessage { get; set; }
}

// Usage
PaymentService paymentService = new CreditCardPaymentService();
var result = paymentService.ProcessPayment(100.00m, "USD");
Console.WriteLine($"Transaction ID: {result.TransactionId}");
```

### Advantages of Factory Method

- **Follows Open/Closed Principle**: New payment methods can be added without modifying existing code
- **Single Responsibility**: Each concrete creator handles one type of payment
- **Testability**: Easy to mock and test individual components

## 3. Abstract Factory Pattern

The Abstract Factory pattern provides an interface for creating families of related objects without specifying their concrete classes.

### Example: UI Component Factory

```csharp
// Abstract products
public interface IButton
{
    void Render();
    void Click();
}

public interface ITextBox
{
    void Render();
    void SetText(string text);
}

public interface ICheckBox
{
    void Render();
    void SetChecked(bool isChecked);
}

// Windows implementation
public class WindowsButton : IButton
{
    public void Render() => Console.WriteLine("Rendering Windows button");
    public void Click() => Console.WriteLine("Windows button clicked");
}

public class WindowsTextBox : ITextBox
{
    public void Render() => Console.WriteLine("Rendering Windows textbox");
    public void SetText(string text) => Console.WriteLine($"Windows textbox text: {text}");
}

public class WindowsCheckBox : ICheckBox
{
    public void Render() => Console.WriteLine("Rendering Windows checkbox");
    public void SetChecked(bool isChecked) => Console.WriteLine($"Windows checkbox checked: {isChecked}");
}

// macOS implementation
public class MacButton : IButton
{
    public void Render() => Console.WriteLine("Rendering macOS button");
    public void Click() => Console.WriteLine("macOS button clicked");
}

public class MacTextBox : ITextBox
{
    public void Render() => Console.WriteLine("Rendering macOS textbox");
    public void SetText(string text) => Console.WriteLine($"macOS textbox text: {text}");
}

public class MacCheckBox : ICheckBox
{
    public void Render() => Console.WriteLine("Rendering macOS checkbox");
    public void SetChecked(bool isChecked) => Console.WriteLine($"macOS checkbox checked: {isChecked}");
}

// Abstract factory
public interface IUIComponentFactory
{
    IButton CreateButton();
    ITextBox CreateTextBox();
    ICheckBox CreateCheckBox();
}

// Concrete factories
public class WindowsUIFactory : IUIComponentFactory
{
    public IButton CreateButton() => new WindowsButton();
    public ITextBox CreateTextBox() => new WindowsTextBox();
    public ICheckBox CreateCheckBox() => new WindowsCheckBox();
}

public class MacUIFactory : IUIComponentFactory
{
    public IButton CreateButton() => new MacButton();
    public ITextBox CreateTextBox() => new MacTextBox();
    public ICheckBox CreateCheckBox() => new MacCheckBox();
}

// Client code
public class Application
{
    private readonly IUIComponentFactory _uiFactory;

    public Application(IUIComponentFactory uiFactory)
    {
        _uiFactory = uiFactory;
    }

    public void CreateUI()
    {
        var button = _uiFactory.CreateButton();
        var textBox = _uiFactory.CreateTextBox();
        var checkBox = _uiFactory.CreateCheckBox();

        button.Render();
        textBox.Render();
        checkBox.Render();

        textBox.SetText("Hello World");
        checkBox.SetChecked(true);
        button.Click();
    }
}

// Usage
var factory = OperatingSystem.IsWindows() 
    ? new WindowsUIFactory() 
    : new MacUIFactory();

var app = new Application(factory);
app.CreateUI();
```

## Factory Pattern with Dependency Injection

Modern C# applications often use Dependency Injection containers. Here's how to integrate the Factory pattern with Microsoft's DI container:

```csharp
// Service interface
public interface INotificationService
{
    Task SendNotificationAsync(string message, string recipient);
}

// Implementations
public class EmailNotificationService : INotificationService
{
    public async Task SendNotificationAsync(string message, string recipient)
    {
        await Task.Delay(100); // Simulate async operation
        Console.WriteLine($"Email sent to {recipient}: {message}");
    }
}

public class SmsNotificationService : INotificationService
{
    public async Task SendNotificationAsync(string message, string recipient)
    {
        await Task.Delay(50); // Simulate async operation
        Console.WriteLine($"SMS sent to {recipient}: {message}");
    }
}

public class PushNotificationService : INotificationService
{
    public async Task SendNotificationAsync(string message, string recipient)
    {
        await Task.Delay(25); // Simulate async operation
        Console.WriteLine($"Push notification sent to {recipient}: {message}");
    }
}

// Factory interface
public interface INotificationFactory
{
    INotificationService CreateNotificationService(NotificationType type);
}

public enum NotificationType
{
    Email,
    Sms,
    Push
}

// Factory implementation
public class NotificationFactory : INotificationFactory
{
    private readonly IServiceProvider _serviceProvider;

    public NotificationFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public INotificationService CreateNotificationService(NotificationType type)
    {
        return type switch
        {
            NotificationType.Email => _serviceProvider.GetRequiredService<EmailNotificationService>(),
            NotificationType.Sms => _serviceProvider.GetRequiredService<SmsNotificationService>(),
            NotificationType.Push => _serviceProvider.GetRequiredService<PushNotificationService>(),
            _ => throw new ArgumentException($"Unknown notification type: {type}")
        };
    }
}

// Registration in Program.cs or Startup.cs
public static void RegisterServices(IServiceCollection services)
{
    services.AddTransient<EmailNotificationService>();
    services.AddTransient<SmsNotificationService>();
    services.AddTransient<PushNotificationService>();
    services.AddTransient<INotificationFactory, NotificationFactory>();
}

// Usage in a controller or service
public class NotificationController : ControllerBase
{
    private readonly INotificationFactory _notificationFactory;

    public NotificationController(INotificationFactory notificationFactory)
    {
        _notificationFactory = notificationFactory;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendNotification(
        [FromBody] NotificationRequest request)
    {
        var service = _notificationFactory.CreateNotificationService(request.Type);
        await service.SendNotificationAsync(request.Message, request.Recipient);
        return Ok();
    }
}

public class NotificationRequest
{
    public NotificationType Type { get; set; }
    public string Message { get; set; }
    public string Recipient { get; set; }
}
```

## Best Practices and Guidelines

### 1. Choose the Right Factory Pattern

- **Simple Factory**: Use for simple scenarios with few types and no need for extension
- **Factory Method**: Use when you need to delegate object creation to subclasses
- **Abstract Factory**: Use when creating families of related objects

### 2. Configuration-Driven Factories

For more dynamic scenarios, consider configuration-driven factories:

```csharp
public class ConfigurableDocumentFactory
{
    private readonly IConfiguration _configuration;
    private readonly Dictionary<string, Func<Document>> _factories;

    public ConfigurableDocumentFactory(IConfiguration configuration)
    {
        _configuration = configuration;
        _factories = new Dictionary<string, Func<Document>>();
        RegisterFactories();
    }

    private void RegisterFactories()
    {
        var factoryConfig = _configuration.GetSection("DocumentFactories");
        
        foreach (var factory in factoryConfig.GetChildren())
        {
            var typeName = factory.Value;
            var type = Type.GetType(typeName);
            
            if (type != null && typeof(Document).IsAssignableFrom(type))
            {
                _factories[factory.Key] = () => (Document)Activator.CreateInstance(type);
            }
        }
    }

    public Document CreateDocument(string documentType)
    {
        return _factories.TryGetValue(documentType, out var factory) 
            ? factory() 
            : throw new ArgumentException($"Unknown document type: {documentType}");
    }
}
```

### 3. Error Handling

Always implement proper error handling in your factories:

```csharp
public class RobustDocumentFactory
{
    public static Document CreateDocument(string documentType)
    {
        try
        {
            return documentType?.ToLower() switch
            {
                "pdf" => new PdfDocument(),
                "word" => new WordDocument(),
                "excel" => new ExcelDocument(),
                null => throw new ArgumentNullException(nameof(documentType)),
                _ => throw new NotSupportedException($"Document type '{documentType}' is not supported")
            };
        }
        catch (Exception ex)
        {
            // Log the error
            Console.WriteLine($"Error creating document: {ex.Message}");
            
            // Return a default or null object pattern
            return new DefaultDocument();
        }
    }
}
```

### 4. Performance Considerations

For frequently created objects, consider caching or object pooling:

```csharp
public class CachedDocumentFactory
{
    private static readonly ConcurrentDictionary<string, Document> Cache = new();

    public static Document CreateDocument(string documentType)
    {
        return Cache.GetOrAdd(documentType.ToLower(), type => type switch
        {
            "pdf" => new PdfDocument(),
            "word" => new WordDocument(),
            "excel" => new ExcelDocument(),
            _ => throw new ArgumentException($"Unknown document type: {type}")
        });
    }
}
```

## Real-World Examples

### 1. Database Connection Factory

```csharp
public interface IDbConnectionFactory
{
    IDbConnection CreateConnection();
}

public class SqlServerConnectionFactory : IDbConnectionFactory
{
    private readonly string _connectionString;

    public SqlServerConnectionFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IDbConnection CreateConnection()
    {
        return new SqlConnection(_connectionString);
    }
}

public class MySqlConnectionFactory : IDbConnectionFactory
{
    private readonly string _connectionString;

    public MySqlConnectionFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IDbConnection CreateConnection()
    {
        return new MySqlConnection(_connectionString);
    }
}
```

### 2. Logging Factory

```csharp
public static class LoggerFactory
{
    public static ILogger CreateLogger(LogLevel level, string outputPath = null)
    {
        return level switch
        {
            LogLevel.Debug => new DebugLogger(),
            LogLevel.Information => new ConsoleLogger(),
            LogLevel.Warning => new FileLogger(outputPath ?? "warnings.log"),
            LogLevel.Error => new FileLogger(outputPath ?? "errors.log"),
            LogLevel.Critical => new DatabaseLogger(),
            _ => new NullLogger()
        };
    }
}
```

## Common Pitfalls to Avoid

1. **Over-engineering**: Don't use factories for simple object creation
2. **God Factory**: Avoid factories that create too many different types
3. **Tight Coupling**: Ensure your factory doesn't depend on concrete implementations
4. **Missing Validation**: Always validate input parameters
5. **Poor Error Handling**: Implement proper exception handling and logging

## Testing Factory Patterns

```csharp
[Test]
public void CreateDocument_WithValidType_ReturnsCorrectDocument()
{
    // Arrange
    var documentType = "pdf";

    // Act
    var document = DocumentFactory.CreateDocument(documentType);

    // Assert
    Assert.IsInstanceOf<PdfDocument>(document);
    Assert.AreEqual(".pdf", document.GetFileExtension());
}

[Test]
public void CreateDocument_WithInvalidType_ThrowsArgumentException()
{
    // Arrange
    var invalidType = "invalid";

    // Act & Assert
    Assert.Throws<ArgumentException>(() => 
        DocumentFactory.CreateDocument(invalidType));
}

// Testing with mocked dependencies
[Test]
public void NotificationFactory_CreateEmailService_ReturnsEmailService()
{
    // Arrange
    var mockServiceProvider = new Mock<IServiceProvider>();
    var emailService = new EmailNotificationService();
    
    mockServiceProvider
        .Setup(sp => sp.GetRequiredService<EmailNotificationService>())
        .Returns(emailService);

    var factory = new NotificationFactory(mockServiceProvider.Object);

    // Act
    var result = factory.CreateNotificationService(NotificationType.Email);

    // Assert
    Assert.AreSame(emailService, result);
}
```

## Conclusion

The Factory design pattern is a powerful tool for creating flexible, maintainable, and testable code. By encapsulating object creation logic, it promotes loose coupling and makes your applications more extensible.

**Key takeaways:**

- **Simple Factory** for basic scenarios with few types
- **Factory Method** when you need inheritance-based creation
- **Abstract Factory** for creating families of related objects
- Always consider error handling, performance, and testability
- Integrate well with modern DI containers

The Factory pattern is particularly valuable in enterprise applications where you need to create different implementations based on configuration, user preferences, or runtime conditions. By mastering these patterns, you'll be able to write more robust and maintainable C# applications.

Remember: the best pattern is the one that solves your specific problem without unnecessary complexity. Start simple and evolve your design as requirements change.