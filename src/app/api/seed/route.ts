import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()

  // 1. Get the current authenticated user and their organization
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'You must be logged in to seed data' }, { status: 401 })
  }

  const { data: userData } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single()

  const orgId = userData?.organization_id
  if (!orgId) {
    return NextResponse.json({ error: 'No organization found for this user' }, { status: 400 })
  }

  // 2. Insert Dummy Customers
  const { data: customers, error: customerError } = await supabase
    .from('customers')
    .insert([
      { organization_id: orgId, name: 'Olivia Martin', email: 'olivia@example.com', phone: '+1 555 123 4567', tags: ['VIP', 'Enterprise'] },
      { organization_id: orgId, name: 'Jackson Lee', email: 'jackson@example.com', phone: '+1 555 987 6543', tags: ['Churn Risk'] },
      { organization_id: orgId, name: 'Isabella Nguyen', email: 'isabella@example.com', phone: '+1 555 222 3333', tags: ['New'] },
    ])
    .select()

  if (customerError || !customers || customers.length === 0) {
    return NextResponse.json({ error: 'Failed to insert customers', details: customerError }, { status: 500 })
  }

  // 3. Insert Dummy Messages for the first two customers
  const oliviaId = customers[0].id
  const jacksonId = customers[1].id

  const { error: msgError } = await supabase
    .from('messages')
    .insert([
      { organization_id: orgId, customer_id: oliviaId, sender_type: 'customer', content: 'Hey, I want to upgrade my plan.', channel: 'whatsapp' },
      { organization_id: orgId, customer_id: oliviaId, sender_type: 'agent', content: 'Sure Olivia! I can help you with that.', channel: 'whatsapp' },
      { organization_id: orgId, customer_id: oliviaId, sender_type: 'customer', content: 'Thanks for the quick response!', channel: 'whatsapp' },
      
      { organization_id: orgId, customer_id: jacksonId, sender_type: 'customer', content: 'Where is my order? It is late.', channel: 'email' },
      { organization_id: orgId, customer_id: jacksonId, sender_type: 'agent', content: 'I am so sorry for the delay, Jackson. Let me check the tracking for you right now.', channel: 'email' },
    ])

  if (msgError) {
    return NextResponse.json({ error: 'Failed to insert messages', details: msgError }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    message: 'Dummy data successfully seeded!', 
    customers_created: customers.length 
  })
}
