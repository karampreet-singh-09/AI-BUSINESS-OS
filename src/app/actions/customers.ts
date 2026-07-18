"use server"

import { createClient } from "@/utils/supabase/server"

export async function getCustomers() {
  const supabase = await createClient()

  // Thanks to RLS, this will automatically only return customers for the user's organization
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching customers:", error)
    return []
  }

  return data
}

export async function createCustomer(formData: FormData) {
  const supabase = await createClient()

  // Get current user to find their organization
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: userData } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single()
    
  if (!userData?.organization_id) throw new Error("No organization found")

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  
  // Basic validation
  if (!name) throw new Error("Name is required")

  const { data, error } = await supabase
    .from('customers')
    .insert([
      { 
        organization_id: userData.organization_id,
        name, 
        email, 
        phone,
        tags: ['New']
      }
    ])
    .select()

  if (error) throw new Error(error.message)
  return data
}
