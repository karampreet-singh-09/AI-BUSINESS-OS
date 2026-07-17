# Testing Guide

Robust testing ensures our SaaS platform remains stable as we ship rapidly. We implement a multi-layered testing strategy.

## 1. Static Testing
- **TypeScript**: Strictly enforced. `tsc --noEmit` must pass.
- **ESLint/Prettier**: Ensures consistent style and catches common errors.

## 2. Unit Testing (Jest & React Testing Library)
- **Scope**: Utility functions, custom hooks, and isolated UI components.
- **Location**: Place test files adjacent to the code they test (e.g., `format-date.test.ts` next to `format-date.ts`).
- **Command**: `npm run test`

## 3. Integration & API Testing
- **Scope**: Testing Server Actions and API Routes against a test database.
- **Database**: Use a dedicated Supabase testing project or local Docker instance. Seed it with known data before each suite runs.
- **Mocking**: Mock external services (Stripe, OpenAI) using MSW (Mock Service Worker) or Jest mocks.

## 4. End-to-End (E2E) Testing (Playwright)
- **Scope**: Critical user journeys (Login, Onboarding, Creating an Organization, Checkout).
- **Location**: `tests/e2e/`
- **Command**: `npx playwright test`
- **Rules**:
  - Do not use brittle selectors. Use `data-testid` or accessible roles (`getByRole('button', { name: /submit/i })`).
  - E2E tests are slow and expensive. Only write them for the absolute most critical paths.

## Continuous Integration (CI)
Our GitHub Actions pipeline automatically runs all tests on every Pull Request. A PR cannot be merged if any test fails or if coverage drops significantly.
