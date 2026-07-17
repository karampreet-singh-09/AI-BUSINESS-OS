# Performance & Scaling Guide

Speed is a feature. A B2B SaaS platform must be extremely snappy.

## 1. Next.js Caching
Next.js aggressively caches by default. Understand the cache layers:
- **Data Cache**: Responses from `fetch` are cached persistently unless `cache: 'no-store'` is used.
- **Full Route Cache**: Static routes are rendered at build time and cached at the Edge.
- **Router Cache**: Client-side cache of RSC payloads.
- **Revalidation**: Use `revalidateTag` or `revalidatePath` inside Server Actions when mutating data to immediately update the UI.

## 2. Database Performance
- **Indexes**: Every foreign key MUST be indexed. Any column frequently used in `WHERE` or `ORDER BY` clauses should be indexed.
- **pgvector**: Use HNSW indexes for vector columns. Approximate Nearest Neighbor (ANN) search is required for scale.
- **N+1 Problem**: Avoid N+1 queries. When using Supabase JS, use joins (e.g., `select('*, nested_table(*)')`) instead of fetching a list and iterating over it to fetch related records.

## 3. Frontend Performance (Core Web Vitals)
- **LCP (Largest Contentful Paint)**: Optimize the hero section. Use `next/image` with `priority` for above-the-fold images.
- **CLS (Cumulative Layout Shift)**: Define dimensions for images. Use skeleton loaders that perfectly match the final dimensions of the loaded data.
- **Bundle Size**: Avoid massive client-side libraries. (e.g., Use `date-fns` instead of `moment.js`). Keep heavy dependencies in Server Components.

## 4. Edge vs Node
Vercel allows deploying to the Edge Network or standard Node.js Serverless Functions.
- Use Edge for simple, fast middleware (like Auth checks and redirecting tenants).
- Use Node Serverless for heavy computation or libraries that do not support the Edge runtime (e.g., some PDF generators, native Node APIs).
