'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login, bypassLogin } from '@/app/actions/auth'
import { SubmitButton } from '@/components/auth/submit-button'

function LoginForm() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(formData: FormData) {
    setError(null)
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Sign in</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <form action={handleLogin}>
        <CardContent className="space-y-4">
          {message && (
            <div className="p-3 text-sm text-green-600 bg-green-100 rounded-md dark:bg-green-900/30 dark:text-green-400">
              {message}
            </div>
          )}
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <SubmitButton className="w-full">Sign In</SubmitButton>
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
      {process.env.NODE_ENV === 'development' && (
        <form action={bypassLogin} className="px-6 pb-6 pt-0">
          <SubmitButton variant="outline" className="w-full bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20">
            Bypass (Developer Mode)
          </SubmitButton>
        </form>
      )}
    </Card>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Card className="w-full h-[400px] flex items-center justify-center">Loading...</Card>}>
      <LoginForm />
    </Suspense>
  )
}
