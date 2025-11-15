# CommunityCar Coding Standards

## General Guidelines
- Follow language-specific conventions (.NET for C#, Angular for TypeScript)
- Use meaningful variable and method names
- Write self-documenting code
- Keep methods small and focused
- Use consistent indentation (4 spaces)

## C# Standards

### Naming Conventions
- Classes: PascalCase
- Methods: PascalCase
- Properties: PascalCase
- Private fields: _camelCase
- Constants: PascalCase
- Interfaces: IPascalCase

### Code Structure
- Use regions for organizing class members
- Group related methods together
- Use dependency injection
- Implement proper exception handling
- Use async/await for asynchronous operations

### Example
```csharp
public class UserService : IUserService
{
    private readonly IRepository<User> _userRepository;

    public UserService(IRepository<User> userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        return user ?? throw new NotFoundException("User not found");
    }
}
```

## TypeScript/Angular Standards

### Naming Conventions
- Classes: PascalCase
- Methods: camelCase
- Properties: camelCase
- Constants: camelCase
- Interfaces: IPascalCase

### Component Structure
- Use Angular CLI for generating components
- Follow single responsibility principle
- Use reactive forms
- Implement OnPush change detection
- Use async pipe in templates

### Example
```typescript
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  users$ = this.userService.getUsers();

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
```

## File Organization
- Group related files in folders
- Use index.ts for barrel exports
- Keep shared code in core/shared modules
- Use feature modules for organization

## Testing
- Write unit tests for all public methods
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Aim for high code coverage (>80%)

## Git Standards
- Use descriptive commit messages
- Follow conventional commits format
- Create feature branches
- Use pull requests for code review

## Documentation
- Document public APIs
- Use XML comments in C#
- Use JSDoc in TypeScript
- Keep README files updated
- Document breaking changes

## Security
- Validate all inputs
- Use parameterized queries
- Implement proper authentication/authorization
- Sanitize user inputs
- Follow OWASP guidelines