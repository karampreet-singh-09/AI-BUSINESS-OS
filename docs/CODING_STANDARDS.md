# Coding Standards

This project follows strict coding principles to ensure long-term maintainability.

## Architectural Principles
- **Clean Architecture**: Separate business logic from UI. Keep Server Actions pure and isolated.
- **SOLID**: 
  - *Single Responsibility*: A component or function should do one thing.
  - *Open/Closed*: Software entities should be open for extension, closed for modification.
- **DRY (Don't Repeat Yourself)**: Extract reusable logic into hooks, utilities, or shared components.
- **KISS (Keep It Simple, Stupid)**: Avoid over-engineering. Write code that is easy to read.
- **Composition over Inheritance**: Use React component composition instead of passing endless props down a tree.

## TypeScript Rules
- **Strict Mode**: `tsconfig.json` MUST have `"strict": true`.
- **No `any`**: Never use `any`. Use `unknown` if the type is truly dynamic, or create an interface.
- **Interfaces vs Types**: Use `type` for unions/intersections and `interface` for object shapes.
- **Zod for Runtime**: TypeScript only exists at build time. Use Zod to validate all incoming data at runtime.

## Naming Conventions
- **Files/Folders**: Use `kebab-case` for folders and files (e.g., `user-profile.tsx`).
- **Components**: Use `PascalCase` for React components (e.g., `UserProfile`).
- **Functions/Variables**: Use `camelCase` (e.g., `fetchUserData`).
- **Constants**: Use `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`).
- **Types/Interfaces**: Use `PascalCase` without `I` prefixes (e.g., `User`, not `IUser`).

## Formatting & Linting
- We use Prettier for code formatting.
- We use ESLint for static analysis.
- Do not bypass linting errors using `@ts-ignore` or `eslint-disable` without a documented, valid reason.
