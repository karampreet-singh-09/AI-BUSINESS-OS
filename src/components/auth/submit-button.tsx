'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface SubmitButtonProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export function SubmitButton({ children, className, variant = 'default' }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className={className}
      variant={variant}
    >
      {pending ? 'Loading...' : children}
    </Button>
  )
}
