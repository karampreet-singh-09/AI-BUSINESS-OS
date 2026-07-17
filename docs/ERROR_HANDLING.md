# Error Handling & Observability Guide

Reliability requires knowing exactly when, where, and why things fail.

## 1. UI Error Boundaries
- **Next.js `error.tsx`**: Every major route segment must have an `error.tsx` file. This acts as a React Error Boundary, catching unexpected runtime errors in Server and Client components and displaying a fallback UI instead of crashing the app.
- **`not-found.tsx`**: Used when a specific resource (e.g., a contact ID) does not exist.

## 2. Server Action Errors
Never throw unhandled exceptions from Server Actions to the client.
Catch errors, log them, and return a standardized object:
```typescript
try {
  // logic
  return { success: true, data }
} catch (error) {
  logger.error("Failed to update contact", { error, contactId })
  return { error: "An unexpected error occurred. Please try again." }
}
```

## 3. Database Errors
- Supabase/PostgreSQL errors should be intercepted. Do not expose raw SQL error strings (like duplicate key violations) to the frontend. Map them to user-friendly messages.

## 4. Observability & Logging
- **Sentry**: We use Sentry for global error tracking.
  - Automatically captures unhandled exceptions in the frontend and backend.
  - Wrap Server Actions or API routes with Sentry handlers where necessary.
- **Logging**: Use a structured logger (like `pino` or `winston`) for backend logs.
  - Always include context (e.g., `organization_id`, `user_id`) in log payloads to make debugging easier.
