"use server"

import { createClient } from "@/utils/supabase/server"

export async function getConversations() {
  const supabase = await createClient()

  // Fetch customers with their latest message
  // Note: For a real app, this query might be a view or more complex join.
  // For now, we fetch customers and then their messages.
  const { data: customers, error: custError } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  if (custError) {
    console.error("Error fetching customers:", custError)
    return []
  }

  // We need to fetch messages for these customers to get the "last message"
  // For simplicity, we just fetch all messages for the org and group them in JS for now.
  const { data: messages, error: msgError } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (msgError) {
    console.error("Error fetching messages:", msgError)
    return []
  }

  // Group messages by customer
  const conversations = customers.map(customer => {
    const customerMsgs = messages?.filter(m => m.customer_id === customer.id) || []
    const lastMsg = customerMsgs[0] // Since ordered desc

    return {
      id: `conv_${customer.id}`,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        initials: customer.name.substring(0, 2).toUpperCase(),
        sentiment: 'Neutral', // Calculate from real data later
        tags: customer.tags || []
      },
      channel: lastMsg?.channel || 'web',
      lastMessage: lastMsg?.content || 'No messages yet',
      time: lastMsg ? new Date(lastMsg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '',
      unread: 0, // Calculate later
      messages: customerMsgs.reverse() // Reverse for chronological order in chat
    }
  })

  // Only return conversations that have messages, or just return all customers as conversations
  return conversations
}

export async function sendMessage(customerId: string, content: string, channel: string = 'web') {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: userData } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single()
    
  if (!userData?.organization_id) throw new Error("No organization found")

  const { data, error } = await supabase
    .from('messages')
    .insert([
      { 
        organization_id: userData.organization_id,
        customer_id: customerId,
        sender_type: 'agent',
        content,
        channel
      }
    ])
    .select()

  if (error) throw new Error(error.message)
  return data
}
