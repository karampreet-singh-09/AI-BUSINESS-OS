"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { 
  Calculator, 
  Calendar, 
  CreditCard, 
  Settings, 
  User, 
  Users, 
  MessageSquare, 
  Sparkles,
  Search
} from "lucide-react"

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      {/* Optional visible trigger button (often placed in the header) */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="AI Actions">
            <CommandItem onSelect={() => runCommand(() => console.log("drafting..."))}>
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>Draft a generic follow-up</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("analyzing..."))}>
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>Analyze today's sentiment</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Jump To">
            <CommandItem onSelect={() => runCommand(() => router.push("/inbox"))}>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Inbox</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/customers"))}>
              <Users className="mr-2 h-4 w-4" />
              <span>Customers</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />

          <CommandGroup heading="Search Customers (Mock)">
            <CommandItem onSelect={() => runCommand(() => router.push("/customers"))}>
              <User className="mr-2 h-4 w-4" />
              <span>Olivia Martin</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/customers"))}>
              <User className="mr-2 h-4 w-4" />
              <span>Jackson Lee</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
