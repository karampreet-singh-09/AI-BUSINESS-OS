# State Management Guide

Proper state management is critical to maintaining a fast, bug-free SaaS application. In Next.js App Router, the line between Server State and Client State is explicit.

## 1. Server State (Data fetching & Caching)
- **Primary Method**: Use React Server Components (RSC) to fetch data directly from Supabase. Next.js natively caches these requests.
- **Mutations**: Use Server Actions. Upon success, use `revalidatePath` or `revalidateTag` to purge the cache and update the UI automatically.
- **Client-Side Data Fetching**: If data MUST be fetched on the client (e.g., highly dynamic search results), use **SWR** or **React Query**. Do not use standard `useEffect` for data fetching.

## 2. Client State (UI State)
- **URL State (First Choice)**: Store UI state (filters, sorting, pagination, open modals) in the URL query parameters using `next/navigation` (`useSearchParams`, `useRouter`). This makes the application shareable and bookmarkable.
- **Component State**: Use `useState` or `useReducer` for ephemeral, component-local state (e.g., whether a specific dropdown is open).
- **Global State**: If state must be shared across many disconnected client components, use **Zustand**. Avoid React Context for high-frequency updates, as it causes unnecessary re-renders.

## Rule of Thumb
"If I refresh the page, should this state persist?"
- **Yes**: Put it in the Database or the URL.
- **No**: Put it in `useState` or `Zustand`.
