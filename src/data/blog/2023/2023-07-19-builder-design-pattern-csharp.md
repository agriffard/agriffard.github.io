---
title: "Builder Design Pattern in C#: Constructing Complex Objects Step by Step"
slug: builder-design-pattern-csharp
author: agriffard
pubDatetime: 2023-07-19T12:00:00Z
categories: [DotNet]
tags: [AI, DesignPatterns, CSharp, FluentAPI]
description: "Master the Builder design pattern in C# with fluent interfaces, method chaining, and practical examples. Learn to construct complex objects elegantly and maintainably."
featured: true
---

The **Builder design pattern** is a creational pattern that provides a flexible solution for constructing complex objects step by step. Unlike other creational patterns that create objects in one go, the Builder pattern allows you to produce different types and representations of an object using the same construction code.

In this comprehensive guide, we'll explore various implementations of the Builder pattern in C#, from basic builders to fluent interfaces, and discover how modern C# features can make this pattern even more powerful.

## Table of Contents

## What is the Builder Design Pattern?

The Builder pattern separates the construction of complex objects from their representation, allowing the same construction process to create various representations. It's particularly useful when:

- Creating objects with many optional parameters
- The construction process must allow different representations
- You want to avoid telescoping constructors (constructors with many parameters)
- The object creation process is complex and involves multiple steps

### Key Components

1. **Builder Interface**: Defines the construction steps
2. **Concrete Builder**: Implements the construction steps and builds the product
3. **Director**: Orchestrates the construction process (optional)
4. **Product**: The complex object being constructed

### Benefits

- **Immutable Objects**: Can create immutable objects step by step
- **Readable Code**: Fluent interfaces make code more readable
- **Flexible Construction**: Same builder can create different representations
- **Parameter Validation**: Validate parameters during construction
- **Default Values**: Easy to handle optional parameters with defaults

## 1. Classic Builder Pattern

Let's start with the traditional implementation of the Builder pattern:

### Example: Computer Builder

```csharp
// Product class
public class Computer
{
    public string CPU { get; set; }
    public string RAM { get; set; }
    public string Storage { get; set; }
    public string GPU { get; set; }
    public string Motherboard { get; set; }
    public string PowerSupply { get; set; }
    public bool HasWiFi { get; set; }
    public bool HasBluetooth { get; set; }

    public override string ToString()
    {
        return $"Computer: CPU={CPU}, RAM={RAM}, Storage={Storage}, " +
               $"GPU={GPU}, Motherboard={Motherboard}, PSU={PowerSupply}, " +
               $"WiFi={HasWiFi}, Bluetooth={HasBluetooth}";
    }
}

// Builder interface
public interface IComputerBuilder
{
    IComputerBuilder SetCPU(string cpu);
    IComputerBuilder SetRAM(string ram);
    IComputerBuilder SetStorage(string storage);
    IComputerBuilder SetGPU(string gpu);
    IComputerBuilder SetMotherboard(string motherboard);
    IComputerBuilder SetPowerSupply(string powerSupply);
    IComputerBuilder AddWiFi();
    IComputerBuilder AddBluetooth();
    Computer Build();
}

// Concrete builder
public class ComputerBuilder : IComputerBuilder
{
    private Computer _computer;

    public ComputerBuilder()
    {
        Reset();
    }

    public void Reset()
    {
        _computer = new Computer();
    }

    public IComputerBuilder SetCPU(string cpu)
    {
        _computer.CPU = cpu;
        return this;
    }

    public IComputerBuilder SetRAM(string ram)
    {
        _computer.RAM = ram;
        return this;
    }

    public IComputerBuilder SetStorage(string storage)
    {
        _computer.Storage = storage;
        return this;
    }

    public IComputerBuilder SetGPU(string gpu)
    {
        _computer.GPU = gpu;
        return this;
    }

    public IComputerBuilder SetMotherboard(string motherboard)
    {
        _computer.Motherboard = motherboard;
        return this;
    }

    public IComputerBuilder SetPowerSupply(string powerSupply)
    {
        _computer.PowerSupply = powerSupply;
        return this;
    }

    public IComputerBuilder AddWiFi()
    {
        _computer.HasWiFi = true;
        return this;
    }

    public IComputerBuilder AddBluetooth()
    {
        _computer.HasBluetooth = true;
        return this;
    }

    public Computer Build()
    {
        var result = _computer;
        Reset(); // Prepare for next build
        return result;
    }
}

// Director (optional)
public class ComputerDirector
{
    public Computer BuildGamingComputer(IComputerBuilder builder)
    {
        return builder
            .SetCPU("Intel i9-13900K")
            .SetRAM("32GB DDR5")
            .SetStorage("1TB NVMe SSD")
            .SetGPU("RTX 4080")
            .SetMotherboard("ASUS ROG Strix")
            .SetPowerSupply("850W Gold")
            .AddWiFi()
            .AddBluetooth()
            .Build();
    }

    public Computer BuildOfficeComputer(IComputerBuilder builder)
    {
        return builder
            .SetCPU("Intel i5-13400")
            .SetRAM("16GB DDR4")
            .SetStorage("512GB SSD")
            .SetMotherboard("MSI Pro B660")
            .SetPowerSupply("500W Bronze")
            .AddWiFi()
            .Build();
    }
}

// Usage
var builder = new ComputerBuilder();
var director = new ComputerDirector();

// Using director
var gamingPC = director.BuildGamingComputer(builder);
Console.WriteLine(gamingPC);

// Direct builder usage
var customPC = new ComputerBuilder()
    .SetCPU("AMD Ryzen 7 7700X")
    .SetRAM("16GB DDR5")
    .SetStorage("1TB SSD")
    .SetGPU("RTX 4070")
    .AddWiFi()
    .Build();

Console.WriteLine(customPC);
```

## 2. Fluent Builder Pattern

The fluent builder creates a more readable and intuitive API:

### Example: SQL Query Builder

```csharp
public class SqlQuery
{
    public string SelectClause { get; set; } = "";
    public string FromClause { get; set; } = "";
    public string WhereClause { get; set; } = "";
    public string OrderByClause { get; set; } = "";
    public string GroupByClause { get; set; } = "";
    public string HavingClause { get; set; } = "";
    public int? LimitValue { get; set; }

    public override string ToString()
    {
        var query = new StringBuilder();
        
        if (!string.IsNullOrEmpty(SelectClause))
            query.AppendLine($"SELECT {SelectClause}");
        
        if (!string.IsNullOrEmpty(FromClause))
            query.AppendLine($"FROM {FromClause}");
        
        if (!string.IsNullOrEmpty(WhereClause))
            query.AppendLine($"WHERE {WhereClause}");
        
        if (!string.IsNullOrEmpty(GroupByClause))
            query.AppendLine($"GROUP BY {GroupByClause}");
        
        if (!string.IsNullOrEmpty(HavingClause))
            query.AppendLine($"HAVING {HavingClause}");
        
        if (!string.IsNullOrEmpty(OrderByClause))
            query.AppendLine($"ORDER BY {OrderByClause}");
        
        if (LimitValue.HasValue)
            query.AppendLine($"LIMIT {LimitValue}");

        return query.ToString().Trim();
    }
}

public class SqlQueryBuilder
{
    private readonly SqlQuery _query;

    public SqlQueryBuilder()
    {
        _query = new SqlQuery();
    }

    public SqlQueryBuilder Select(params string[] columns)
    {
        _query.SelectClause = string.Join(", ", columns);
        return this;
    }

    public SqlQueryBuilder SelectAll()
    {
        _query.SelectClause = "*";
        return this;
    }

    public SqlQueryBuilder From(string table)
    {
        _query.FromClause = table;
        return this;
    }

    public SqlQueryBuilder Where(string condition)
    {
        if (string.IsNullOrEmpty(_query.WhereClause))
            _query.WhereClause = condition;
        else
            _query.WhereClause += $" AND {condition}";
        return this;
    }

    public SqlQueryBuilder Or(string condition)
    {
        if (!string.IsNullOrEmpty(_query.WhereClause))
            _query.WhereClause += $" OR {condition}";
        return this;
    }

    public SqlQueryBuilder OrderBy(string column, bool ascending = true)
    {
        var direction = ascending ? "ASC" : "DESC";
        if (string.IsNullOrEmpty(_query.OrderByClause))
            _query.OrderByClause = $"{column} {direction}";
        else
            _query.OrderByClause += $", {column} {direction}";
        return this;
    }

    public SqlQueryBuilder GroupBy(params string[] columns)
    {
        _query.GroupByClause = string.Join(", ", columns);
        return this;
    }

    public SqlQueryBuilder Having(string condition)
    {
        _query.HavingClause = condition;
        return this;
    }

    public SqlQueryBuilder Limit(int count)
    {
        _query.LimitValue = count;
        return this;
    }

    public SqlQuery Build() => _query;

    public string ToSql() => _query.ToString();

    // Implicit conversion for convenience
    public static implicit operator string(SqlQueryBuilder builder) => builder.ToSql();
}

// Usage
var query = new SqlQueryBuilder()
    .Select("u.Name", "u.Email", "COUNT(o.Id) as OrderCount")
    .From("Users u")
    .From("LEFT JOIN Orders o ON u.Id = o.UserId") // Could be enhanced for proper joins
    .Where("u.IsActive = 1")
    .Where("u.CreatedDate >= '2023-01-01'")
    .GroupBy("u.Id", "u.Name", "u.Email")
    .Having("COUNT(o.Id) > 5")
    .OrderBy("OrderCount", false)
    .Limit(10);

Console.WriteLine(query); // Implicit conversion to string

// Or explicit build
var sqlQuery = query.Build();
Console.WriteLine(sqlQuery.ToString());
```

## 3. Immutable Builder Pattern

Creating immutable objects with the Builder pattern provides thread safety and prevents accidental modifications:

### Example: Configuration Builder

```csharp
public sealed class DatabaseConfiguration
{
    public string ConnectionString { get; }
    public int CommandTimeout { get; }
    public int MaxRetries { get; }
    public bool EnableLogging { get; }
    public string LogLevel { get; }
    public int PoolSize { get; }

    internal DatabaseConfiguration(
        string connectionString,
        int commandTimeout,
        int maxRetries,
        bool enableLogging,
        string logLevel,
        int poolSize)
    {
        ConnectionString = connectionString;
        CommandTimeout = commandTimeout;
        MaxRetries = maxRetries;
        EnableLogging = enableLogging;
        LogLevel = logLevel;
        PoolSize = poolSize;
    }

    public override string ToString()
    {
        return $"DB Config: Timeout={CommandTimeout}s, Retries={MaxRetries}, " +
               $"Logging={EnableLogging} ({LogLevel}), Pool={PoolSize}";
    }
}

public class DatabaseConfigurationBuilder
{
    private string _connectionString = "";
    private int _commandTimeout = 30;
    private int _maxRetries = 3;
    private bool _enableLogging = false;
    private string _logLevel = "Info";
    private int _poolSize = 10;

    public DatabaseConfigurationBuilder WithConnectionString(string connectionString)
    {
        if (string.IsNullOrWhiteSpace(connectionString))
            throw new ArgumentException("Connection string cannot be null or empty");
        
        _connectionString = connectionString;
        return this;
    }

    public DatabaseConfigurationBuilder WithCommandTimeout(int seconds)
    {
        if (seconds <= 0)
            throw new ArgumentException("Command timeout must be positive");
        
        _commandTimeout = seconds;
        return this;
    }

    public DatabaseConfigurationBuilder WithMaxRetries(int retries)
    {
        if (retries < 0)
            throw new ArgumentException("Max retries cannot be negative");
        
        _maxRetries = retries;
        return this;
    }

    public DatabaseConfigurationBuilder EnableLogging(string logLevel = "Info")
    {
        var validLevels = new[] { "Debug", "Info", "Warning", "Error" };
        if (!validLevels.Contains(logLevel))
            throw new ArgumentException($"Invalid log level. Valid levels: {string.Join(", ", validLevels)}");
        
        _enableLogging = true;
        _logLevel = logLevel;
        return this;
    }

    public DatabaseConfigurationBuilder DisableLogging()
    {
        _enableLogging = false;
        return this;
    }

    public DatabaseConfigurationBuilder WithPoolSize(int size)
    {
        if (size <= 0)
            throw new ArgumentException("Pool size must be positive");
        
        _poolSize = size;
        return this;
    }

    public DatabaseConfiguration Build()
    {
        if (string.IsNullOrWhiteSpace(_connectionString))
            throw new InvalidOperationException("Connection string is required");

        return new DatabaseConfiguration(
            _connectionString,
            _commandTimeout,
            _maxRetries,
            _enableLogging,
            _logLevel,
            _poolSize);
    }
}

// Usage
var config = new DatabaseConfigurationBuilder()
    .WithConnectionString("Server=localhost;Database=MyApp;Trusted_Connection=true")
    .WithCommandTimeout(60)
    .WithMaxRetries(5)
    .EnableLogging("Debug")
    .WithPoolSize(20)
    .Build();

Console.WriteLine(config);

// The configuration object is immutable
// config.CommandTimeout = 90; // This would cause a compile error
```

## 4. Generic Builder Pattern

A generic builder can be used for multiple types:

### Example: Generic Object Builder

```csharp
public class GenericBuilder<T> where T : new()
{
    private readonly T _instance;

    public GenericBuilder()
    {
        _instance = new T();
    }

    public GenericBuilder<T> Set<TProperty>(
        Expression<Func<T, TProperty>> propertyExpression, 
        TProperty value)
    {
        if (propertyExpression.Body is MemberExpression memberExpression)
        {
            if (memberExpression.Member is PropertyInfo propertyInfo)
            {
                propertyInfo.SetValue(_instance, value);
            }
        }
        return this;
    }

    public GenericBuilder<T> Configure(Action<T> configuration)
    {
        configuration(_instance);
        return this;
    }

    public T Build() => _instance;
}

// Usage with any class
public class Employee
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Department { get; set; }
    public decimal Salary { get; set; }
    public DateTime HireDate { get; set; }
}

var employee = new GenericBuilder<Employee>()
    .Set(e => e.FirstName, "John")
    .Set(e => e.LastName, "Doe")
    .Set(e => e.Email, "john.doe@company.com")
    .Set(e => e.Department, "Engineering")
    .Set(e => e.Salary, 75000m)
    .Configure(e => e.HireDate = DateTime.Now)
    .Build();
```

## 5. Builder with Validation and Error Handling

### Example: User Registration Builder

```csharp
public class User
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public List<string> Roles { get; set; } = new();
    public bool IsActive { get; set; } = true;
}

public class UserBuilder
{
    private readonly User _user;
    private readonly List<string> _validationErrors;

    public UserBuilder()
    {
        _user = new User();
        _validationErrors = new List<string>();
    }

    public UserBuilder WithUsername(string username)
    {
        if (string.IsNullOrWhiteSpace(username))
            _validationErrors.Add("Username is required");
        else if (username.Length < 3)
            _validationErrors.Add("Username must be at least 3 characters");
        else if (!username.All(c => char.IsLetterOrDigit(c) || c == '_'))
            _validationErrors.Add("Username can only contain letters, digits, and underscores");
        else
            _user.Username = username;

        return this;
    }

    public UserBuilder WithEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            _validationErrors.Add("Email is required");
        else if (!IsValidEmail(email))
            _validationErrors.Add("Invalid email format");
        else
            _user.Email = email;

        return this;
    }

    public UserBuilder WithPassword(string password)
    {
        if (string.IsNullOrWhiteSpace(password))
            _validationErrors.Add("Password is required");
        else if (password.Length < 8)
            _validationErrors.Add("Password must be at least 8 characters");
        else if (!password.Any(char.IsUpper))
            _validationErrors.Add("Password must contain at least one uppercase letter");
        else if (!password.Any(char.IsLower))
            _validationErrors.Add("Password must contain at least one lowercase letter");
        else if (!password.Any(char.IsDigit))
            _validationErrors.Add("Password must contain at least one digit");
        else
            _user.Password = password;

        return this;
    }

    public UserBuilder WithName(string firstName, string lastName)
    {
        if (string.IsNullOrWhiteSpace(firstName))
            _validationErrors.Add("First name is required");
        else
            _user.FirstName = firstName;

        if (string.IsNullOrWhiteSpace(lastName))
            _validationErrors.Add("Last name is required");
        else
            _user.LastName = lastName;

        return this;
    }

    public UserBuilder WithDateOfBirth(DateTime dateOfBirth)
    {
        var age = DateTime.Now.Year - dateOfBirth.Year;
        if (dateOfBirth > DateTime.Now.AddYears(-age)) age--;

        if (age < 13)
            _validationErrors.Add("User must be at least 13 years old");
        else if (age > 120)
            _validationErrors.Add("Invalid date of birth");
        else
            _user.DateOfBirth = dateOfBirth;

        return this;
    }

    public UserBuilder AddRole(string role)
    {
        if (!string.IsNullOrWhiteSpace(role) && !_user.Roles.Contains(role))
            _user.Roles.Add(role);
        return this;
    }

    public UserBuilder SetActive(bool isActive)
    {
        _user.IsActive = isActive;
        return this;
    }

    public User Build()
    {
        if (_validationErrors.Any())
        {
            throw new ValidationException($"User validation failed:\n" +
                string.Join("\n", _validationErrors));
        }

        return _user;
    }

    public bool IsValid => !_validationErrors.Any();
    
    public IReadOnlyList<string> ValidationErrors => _validationErrors.AsReadOnly();

    private static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
}

public class ValidationException : Exception
{
    public ValidationException(string message) : base(message) { }
}

// Usage
try
{
    var user = new UserBuilder()
        .WithUsername("john_doe")
        .WithEmail("john.doe@example.com")
        .WithPassword("SecurePass123")
        .WithName("John", "Doe")
        .WithDateOfBirth(new DateTime(1990, 5, 15))
        .AddRole("User")
        .AddRole("Editor")
        .Build();

    Console.WriteLine($"User created: {user.Username}");
}
catch (ValidationException ex)
{
    Console.WriteLine($"Validation failed: {ex.Message}");
}

// Check validation without throwing
var builder = new UserBuilder()
    .WithUsername("jo") // Too short
    .WithEmail("invalid-email")
    .WithPassword("weak");

if (!builder.IsValid)
{
    Console.WriteLine("Validation errors:");
    foreach (var error in builder.ValidationErrors)
    {
        Console.WriteLine($"- {error}");
    }
}
```

## 6. Builder with Dependency Injection

### Example: Service Configuration Builder

```csharp
public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
}

public interface ILoggerService
{
    void Log(string message);
}

public class EmailService : IEmailService
{
    public async Task SendEmailAsync(string to, string subject, string body)
    {
        await Task.Delay(100); // Simulate async operation
        Console.WriteLine($"Email sent to {to}: {subject}");
    }
}

public class LoggerService : ILoggerService
{
    public void Log(string message)
    {
        Console.WriteLine($"[LOG] {DateTime.Now}: {message}");
    }
}

public class NotificationConfiguration
{
    public string DefaultSender { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public List<string> Recipients { get; set; } = new();
    public bool LogNotifications { get; set; }
}

public class NotificationBuilder
{
    private readonly NotificationConfiguration _config;
    private readonly IEmailService _emailService;
    private readonly ILoggerService _loggerService;

    public NotificationBuilder(IEmailService emailService, ILoggerService loggerService)
    {
        _config = new NotificationConfiguration();
        _emailService = emailService;
        _loggerService = loggerService;
    }

    public NotificationBuilder From(string sender)
    {
        _config.DefaultSender = sender;
        return this;
    }

    public NotificationBuilder WithSubject(string subject)
    {
        _config.Subject = subject;
        return this;
    }

    public NotificationBuilder WithBody(string body)
    {
        _config.Body = body;
        return this;
    }

    public NotificationBuilder To(string recipient)
    {
        _config.Recipients.Add(recipient);
        return this;
    }

    public NotificationBuilder To(params string[] recipients)
    {
        _config.Recipients.AddRange(recipients);
        return this;
    }

    public NotificationBuilder EnableLogging()
    {
        _config.LogNotifications = true;
        return this;
    }

    public async Task SendAsync()
    {
        if (_config.LogNotifications)
        {
            _loggerService.Log($"Sending notification to {_config.Recipients.Count} recipients");
        }

        var tasks = _config.Recipients.Select(recipient =>
            _emailService.SendEmailAsync(recipient, _config.Subject, _config.Body));

        await Task.WhenAll(tasks);

        if (_config.LogNotifications)
        {
            _loggerService.Log("All notifications sent successfully");
        }
    }
}

// Registration in DI container
public static void RegisterServices(IServiceCollection services)
{
    services.AddTransient<IEmailService, EmailService>();
    services.AddTransient<ILoggerService, LoggerService>();
    services.AddTransient<NotificationBuilder>();
}

// Usage in a service or controller
public class NotificationService
{
    private readonly IServiceProvider _serviceProvider;

    public NotificationService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task SendWelcomeEmailAsync(string userEmail, string userName)
    {
        var builder = _serviceProvider.GetRequiredService<NotificationBuilder>();
        
        await builder
            .From("noreply@myapp.com")
            .WithSubject("Welcome to MyApp!")
            .WithBody($"Welcome {userName}! Thanks for joining us.")
            .To(userEmail)
            .EnableLogging()
            .SendAsync();
    }
}
```

## 7. Advanced Builder Patterns

### Example: Expression Builder for Dynamic Queries

```csharp
public class ExpressionBuilder<T>
{
    private Expression<Func<T, bool>> _expression;

    public ExpressionBuilder()
    {
        _expression = x => true; // Start with always true
    }

    public ExpressionBuilder<T> And(Expression<Func<T, bool>> condition)
    {
        _expression = CombineExpressions(_expression, condition, Expression.AndAlso);
        return this;
    }

    public ExpressionBuilder<T> Or(Expression<Func<T, bool>> condition)
    {
        _expression = CombineExpressions(_expression, condition, Expression.OrElse);
        return this;
    }

    public ExpressionBuilder<T> Where(string propertyName, object value, ComparisonType comparison = ComparisonType.Equal)
    {
        var condition = CreatePropertyComparison(propertyName, value, comparison);
        return And(condition);
    }

    public Expression<Func<T, bool>> Build() => _expression;

    private static Expression<Func<T, bool>> CombineExpressions(
        Expression<Func<T, bool>> first,
        Expression<Func<T, bool>> second,
        Func<Expression, Expression, BinaryExpression> merge)
    {
        var parameter = Expression.Parameter(typeof(T));
        var leftVisitor = new ReplaceExpressionVisitor(first.Parameters[0], parameter);
        var left = leftVisitor.Visit(first.Body);
        var rightVisitor = new ReplaceExpressionVisitor(second.Parameters[0], parameter);
        var right = rightVisitor.Visit(second.Body);
        return Expression.Lambda<Func<T, bool>>(merge(left, right), parameter);
    }

    private static Expression<Func<T, bool>> CreatePropertyComparison(
        string propertyName, 
        object value, 
        ComparisonType comparison)
    {
        var parameter = Expression.Parameter(typeof(T));
        var property = Expression.Property(parameter, propertyName);
        var constant = Expression.Constant(value);

        Expression comparisonExpression = comparison switch
        {
            ComparisonType.Equal => Expression.Equal(property, constant),
            ComparisonType.NotEqual => Expression.NotEqual(property, constant),
            ComparisonType.GreaterThan => Expression.GreaterThan(property, constant),
            ComparisonType.GreaterThanOrEqual => Expression.GreaterThanOrEqual(property, constant),
            ComparisonType.LessThan => Expression.LessThan(property, constant),
            ComparisonType.LessThanOrEqual => Expression.LessThanOrEqual(property, constant),
            _ => throw new ArgumentOutOfRangeException(nameof(comparison))
        };

        return Expression.Lambda<Func<T, bool>>(comparisonExpression, parameter);
    }
}

public enum ComparisonType
{
    Equal,
    NotEqual,
    GreaterThan,
    GreaterThanOrEqual,
    LessThan,
    LessThanOrEqual
}

internal class ReplaceExpressionVisitor : ExpressionVisitor
{
    private readonly Expression _oldValue;
    private readonly Expression _newValue;

    public ReplaceExpressionVisitor(Expression oldValue, Expression newValue)
    {
        _oldValue = oldValue;
        _newValue = newValue;
    }

    public override Expression Visit(Expression node)
    {
        return node == _oldValue ? _newValue : base.Visit(node);
    }
}

// Usage with Entity Framework or similar
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
    public bool IsActive { get; set; }
}

// Usage
var filterExpression = new ExpressionBuilder<Product>()
    .Where(nameof(Product.IsActive), true)
    .And(p => p.Price > 10m)
    .Where(nameof(Product.Category), "Electronics")
    .Build();

// Use with Entity Framework
// var products = dbContext.Products.Where(filterExpression).ToList();
```

## Best Practices and Guidelines

### 1. When to Use Builder Pattern

**Use Builder when:**
- Creating objects with many optional parameters (more than 3-4)
- Object construction requires multiple steps
- You need different representations of the same object
- You want to enforce immutability
- Complex validation is required during construction

**Avoid Builder when:**
- Simple objects with few required parameters
- Object construction is straightforward
- Performance is critical (builders add overhead)

### 2. Design Considerations

```csharp
public class BestPracticesBuilder<T> where T : class
{
    private readonly List<Action<T>> _buildActions = new();

    // Return the builder type for fluent chaining
    public BestPracticesBuilder<T> Configure(Action<T> action)
    {
        _buildActions.Add(action);
        return this;
    }

    // Provide both Build() and implicit conversion
    public T Build()
    {
        var instance = Activator.CreateInstance<T>();
        foreach (var action in _buildActions)
        {
            action(instance);
        }
        return instance;
    }

    public static implicit operator T(BestPracticesBuilder<T> builder) => builder.Build();

    // Allow reset for reuse
    public BestPracticesBuilder<T> Reset()
    {
        _buildActions.Clear();
        return this;
    }
}
```

### 3. Error Handling

```csharp
public class RobustBuilder
{
    private readonly List<string> _errors = new();
    private bool _built = false;

    protected void AddError(string error)
    {
        _errors.Add(error);
    }

    protected void ValidateNotBuilt()
    {
        if (_built)
            throw new InvalidOperationException("Builder has already been used to build an object");
    }

    protected void ValidateBeforeBuild()
    {
        if (_errors.Any())
            throw new InvalidOperationException($"Cannot build object with errors: {string.Join(", ", _errors)}");
    }

    protected void MarkAsBuilt()
    {
        _built = true;
    }

    public bool HasErrors => _errors.Any();
    public IReadOnlyList<string> Errors => _errors.AsReadOnly();
}
```

## Testing Builder Patterns

```csharp
[Test]
public void ComputerBuilder_BuildGamingPC_CreatesValidConfiguration()
{
    // Arrange
    var builder = new ComputerBuilder();

    // Act
    var computer = builder
        .SetCPU("Intel i9")
        .SetRAM("32GB")
        .SetGPU("RTX 4080")
        .AddWiFi()
        .Build();

    // Assert
    Assert.AreEqual("Intel i9", computer.CPU);
    Assert.AreEqual("32GB", computer.RAM);
    Assert.AreEqual("RTX 4080", computer.GPU);
    Assert.IsTrue(computer.HasWiFi);
    Assert.IsFalse(computer.HasBluetooth);
}

[Test]
public void UserBuilder_InvalidEmail_ThrowsValidationException()
{
    // Arrange
    var builder = new UserBuilder();

    // Act & Assert
    Assert.Throws<ValidationException>(() =>
        builder
            .WithUsername("testuser")
            .WithEmail("invalid-email")
            .WithPassword("ValidPass123")
            .Build());
}

[Test]
public void SqlQueryBuilder_ComplexQuery_GeneratesCorrectSql()
{
    // Arrange & Act
    var sql = new SqlQueryBuilder()
        .Select("u.Name", "COUNT(o.Id)")
        .From("Users u")
        .Where("u.IsActive = 1")
        .GroupBy("u.Name")
        .OrderBy("u.Name")
        .ToSql();

    // Assert
    Assert.Contains("SELECT u.Name, COUNT(o.Id)", sql);
    Assert.Contains("FROM Users u", sql);
    Assert.Contains("WHERE u.IsActive = 1", sql);
    Assert.Contains("GROUP BY u.Name", sql);
    Assert.Contains("ORDER BY u.Name ASC", sql);
}
```

## Performance Considerations

### 1. Object Pooling with Builders

```csharp
public class PooledBuilder<T> where T : class, new()
{
    private static readonly ObjectPool<T> Pool = new DefaultObjectPool<T>(new DefaultPooledObjectPolicy<T>());

    public T Build()
    {
        var instance = Pool.Get();
        try
        {
            ConfigureInstance(instance);
            return instance;
        }
        finally
        {
            // Reset the instance before returning to pool
            if (instance is IResettable resettable)
                resettable.Reset();
        }
    }

    protected virtual void ConfigureInstance(T instance) { }
}

public interface IResettable
{
    void Reset();
}
```

### 2. Avoiding Reflection

```csharp
// Instead of reflection-based property setting
public class FastBuilder<T>
{
    private readonly Dictionary<string, Action<T, object>> _setters;

    public FastBuilder()
    {
        // Pre-compile property setters
        _setters = typeof(T).GetProperties()
            .Where(p => p.CanWrite)
            .ToDictionary(
                p => p.Name,
                p => CreateSetter(p));
    }

    private static Action<T, object> CreateSetter(PropertyInfo property)
    {
        var target = Expression.Parameter(typeof(T));
        var value = Expression.Parameter(typeof(object));
        var convertedValue = Expression.Convert(value, property.PropertyType);
        var propertyAccess = Expression.Property(target, property);
        var assign = Expression.Assign(propertyAccess, convertedValue);
        
        return Expression.Lambda<Action<T, object>>(assign, target, value).Compile();
    }
}
```

## Common Pitfalls to Avoid

1. **Mutable Builders**: Don't reuse builder instances unless you have a Reset method
2. **Over-Engineering**: Don't use builders for simple objects
3. **Missing Validation**: Always validate required fields
4. **Thread Safety**: Builders are typically not thread-safe
5. **Memory Leaks**: Be careful with event handlers and references in builders

## Integration with Modern C# Features

### Example: Using Records and Init-Only Properties

```csharp
public record DatabaseConfig
{
    public string ConnectionString { get; init; } = "";
    public int CommandTimeout { get; init; } = 30;
    public bool EnableRetries { get; init; } = false;
    public int MaxRetries { get; init; } = 3;
}

public class DatabaseConfigBuilder
{
    private string _connectionString = "";
    private int _commandTimeout = 30;
    private bool _enableRetries = false;
    private int _maxRetries = 3;

    public DatabaseConfigBuilder WithConnectionString(string connectionString)
    {
        _connectionString = connectionString;
        return this;
    }

    public DatabaseConfigBuilder WithTimeout(int seconds)
    {
        _commandTimeout = seconds;
        return this;
    }

    public DatabaseConfigBuilder EnableRetries(int maxRetries = 3)
    {
        _enableRetries = true;
        _maxRetries = maxRetries;
        return this;
    }

    public DatabaseConfig Build() => new()
    {
        ConnectionString = _connectionString,
        CommandTimeout = _commandTimeout,
        EnableRetries = _enableRetries,
        MaxRetries = _maxRetries
    };
}
```

## Conclusion

The Builder design pattern is an invaluable tool for constructing complex objects in a readable, maintainable way. It shines particularly well in C# due to the language's excellent support for fluent interfaces, method chaining, and type safety.

**Key takeaways:**

- **Use builders for complex objects** with many optional parameters
- **Fluent interfaces** make code more readable and intuitive
- **Validation during construction** prevents invalid objects
- **Immutable objects** can be built step by step safely
- **Integration with DI containers** makes builders even more powerful
- **Performance considerations** matter for high-frequency scenarios

The Builder pattern promotes the creation of clean, testable, and maintainable code. Whether you're building configuration objects, complex domain entities, or fluent APIs, the Builder pattern provides the flexibility and clarity your applications need.

Remember to choose the right level of complexity for your use case - sometimes a simple constructor with optional parameters is sufficient, but when you need the power and flexibility of step-by-step construction, the Builder pattern is your best friend.