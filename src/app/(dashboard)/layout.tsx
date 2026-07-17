import { AppSidebar } from "@/components/shared/app-sidebar"
import { ThemeSwitcher } from "@/components/shared/theme-switcher"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarProvider } from "@/components/ui/sidebar"
import { CommandMenu } from "@/components/shared/command-menu"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full bg-background">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
          <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 backdrop-blur px-4 shadow-sm">
            <div className="flex flex-1 items-center gap-2">
              <CommandMenu />
            </div>
            <div className="flex items-center gap-2">
              {process.env.NODE_ENV === 'development' && (
                <Button variant="outline" size="sm" className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20">
                  Developer Preview
                </Button>
              )}
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <ThemeSwitcher />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
