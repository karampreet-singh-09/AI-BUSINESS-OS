# Component Guide

Next.js App Router shifts the paradigm between Server and Client rendering. We must be intentional about where components render.

## React Server Components (RSC)
By default, all components are Server Components.
**Use Server Components for:**
- Fetching data.
- Accessing backend resources (database, filesystem).
- Keeping heavy dependencies on the server to reduce bundle size.
- Rendering static UI.

*Rule: Keep components as Server Components unless interactivity is strictly required.*

## Client Components
Add `"use client"` at the very top of the file to opt into client-side rendering.
**Use Client Components for:**
- Interactivity (onClick, onChange).
- State and Lifecycle (useState, useEffect, hooks).
- Browser-only APIs (window, localStorage).

## Interleaving Components
You cannot import a Server Component directly into a Client Component. However, you can pass a Server Component as a `children` prop to a Client Component.

```tsx
// GOOD: Passing RSC as children
<ClientLayout>
  <ServerDataComponent />
</ClientLayout>
```

## Component Structure
- **Primitives**: `src/components/ui/` (shadcn components, dumb, no business logic).
- **Shared Modules**: `src/components/shared/` (combinations of primitives, e.g., a standardized DataTable, still no feature-specific logic).
- **Feature Components**: `src/features/<feature>/components/` (Tightly coupled to business logic, forms, and specific data structures).
