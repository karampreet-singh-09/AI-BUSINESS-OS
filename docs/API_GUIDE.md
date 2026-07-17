# API & Server Actions Guide

Our Next.js application uses **Server Actions** for all internal mutations, and **API Routes (Route Handlers)** for external integrations and webhooks.

## Server Actions (Internal API)
For any action triggered by our own UI, use Server Actions inside `src/features/<feature>/actions/`.

### Rules for Server Actions
1. **Validation**: All inputs MUST be validated using Zod.
2. **Authentication**: Verify the user's session using `await createClient().auth.getUser()`.
3. **Authorization**: Do not trust the client. Verify the user has permissions (e.g., they belong to the correct `organization_id`).
4. **Error Handling**: Catch database errors and return standardized JSON objects. Do NOT throw raw errors to the client.

*Example:*
```typescript
'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const createContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export async function createContact(orgId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const parsed = createContactSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: 'Invalid data' }

  const { error } = await supabase.from('contacts').insert({
    organization_id: orgId,
    name: parsed.data.name,
    email: parsed.data.email,
  })

  if (error) return { error: 'Failed to create contact' }

  revalidatePath('/dashboard/contacts')
  return { success: true }
}
```

## REST API Routes (External API)
For webhooks (Stripe, WhatsApp) or public APIs, use `app/api/<route>/route.ts`.

### External API Standards
1. **Versioning**: Use `/api/v1/...` for public APIs.
2. **Rate Limiting**: Implement strict rate limiting (using Upstash Redis or Supabase RPC).
3. **API Keys**: Authenticate requests using secure API keys hashed in the database.
4. **Pagination**: Always paginate list endpoints (cursor-based preferred over offset).
5. **Responses**: Use JSend format: `{ status: "success" | "fail" | "error", data: any, message?: string }`.
