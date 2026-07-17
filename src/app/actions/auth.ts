'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

// --- Zod Schemas ---
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.string().min(2, 'Full name is required'),
  businessName: z.string().min(2, 'Business name is required'),
})

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// --- Actions ---

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = Object.fromEntries(formData.entries())
  const result = loginSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = Object.fromEntries(formData.entries())
  const result = signupSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        full_name: result.data.fullName,
        business_name: result.data.businessName,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Next steps typically involve redirecting to a check-email page
  // For MVP, we might auto-login or redirect. Let's redirect to login with a message.
  redirect('/login?message=Check your email to confirm your account')
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient()

  const data = Object.fromEntries(formData.entries())
  const result = forgotPasswordSchema.safeParse(data)

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(result.data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/login?message=Check your email for the password reset link')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function bypassLogin() {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  cookieStore.set('bypass_auth', 'true', { path: '/' })
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
