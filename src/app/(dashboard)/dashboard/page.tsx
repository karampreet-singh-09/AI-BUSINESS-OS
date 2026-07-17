import { PageHeader } from "@/components/shared/page-header"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { RecentCustomers } from "@/components/dashboard/recent-customers"
import { AIActivityFeed } from "@/components/dashboard/ai-activity-feed"
import { Button } from "@/components/ui/button"
import { PlusCircle, MessageSquare, Bot } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Dashboard" 
        description="Overview of your business operations."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            New Message
          </Button>
          <Button variant="outline" size="sm">
            <Bot className="mr-2 h-4 w-4" />
            Train AI
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </PageHeader>
      
      <div className="flex-1 space-y-6 p-6 pt-6">
        <OverviewCards />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <RevenueChart />
          <RecentCustomers />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AIActivityFeed />
          {/* Pending Tasks placeholder (could be an EmptyState or a new component) */}
          <div className="col-span-1 lg:col-span-2 rounded-xl border bg-card text-card-foreground shadow flex items-center justify-center p-6 min-h-[300px]">
             <div className="text-center">
               <h3 className="text-lg font-semibold">Pending Human Tasks</h3>
               <p className="text-sm text-muted-foreground mt-2">All caught up! The AI handled everything.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
