import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Mail, Phone, Calendar, Clock, ShoppingBag } from "lucide-react"

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  initials: string
  sentiment: string
  tags: string[]
}

interface CustomerProfileProps {
  customer: Customer | null
}

export function CustomerProfile({ customer }: CustomerProfileProps) {
  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6 text-center">
        <UsersIcon className="w-12 h-12 mb-4 opacity-20" />
        <p>Select a conversation to view customer details.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background border-l">
      {/* Header Info */}
      <div className="p-6 border-b flex flex-col items-center text-center">
        <Avatar className="w-20 h-20 mb-4">
          <AvatarFallback className="text-xl">{customer.initials}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{customer.name}</h2>
        <div className="flex items-center text-sm text-muted-foreground mt-1 gap-4">
          <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> {customer.email}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-1 gap-4">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {customer.phone}</span>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge variant={customer.sentiment === 'Frustrated' ? 'destructive' : 'default'} className="flex items-center gap-1">
            {customer.sentiment === 'Frustrated' ? '🔴' : '🟢'} {customer.sentiment}
          </Badge>
          {customer.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

        {/* AI Quick Actions */}
        <div className="grid grid-cols-2 gap-2 mt-6 w-full">
          <Button variant="outline" size="sm" className="w-full">
            <Sparkles className="w-4 h-4 mr-2 text-primary" /> Summarize
          </Button>
          <Button variant="outline" size="sm" className="w-full">
            <Calendar className="w-4 h-4 mr-2" /> Book Call
          </Button>
        </div>
      </div>

      {/* Detail Tabs */}
      <Tabs defaultValue="timeline" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-6 py-0 h-12">
          <TabsTrigger value="timeline" className="data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Timeline</TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Notes</TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Orders</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1">
          <TabsContent value="timeline" className="p-6 m-0 space-y-4">
            <div className="relative pl-6 border-l space-y-6">
              <div className="relative">
                <div className="absolute -left-[31px] bg-background border rounded-full p-1"><Clock className="w-3 h-3" /></div>
                <p className="text-sm font-medium">Ticket Resolved</p>
                <p className="text-xs text-muted-foreground">Yesterday by AI Agent</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] bg-background border rounded-full p-1"><Mail className="w-3 h-3" /></div>
                <p className="text-sm font-medium">Marketing Email Sent</p>
                <p className="text-xs text-muted-foreground">Oct 24, 2024</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="p-6 m-0">
            <div className="bg-muted/50 p-3 rounded-md text-sm border border-border">
              Customer prefers WhatsApp communication. Very sensitive to pricing changes.
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="p-6 m-0 space-y-3">
             <div className="flex items-center justify-between p-3 border rounded-md">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-primary/10 text-primary rounded-md"><ShoppingBag className="w-4 h-4"/></div>
                 <div>
                   <p className="text-sm font-medium">Enterprise Plan</p>
                   <p className="text-xs text-muted-foreground">Active • $299/mo</p>
                 </div>
               </div>
             </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
