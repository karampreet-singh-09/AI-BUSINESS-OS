"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CustomerProfile, type Customer } from "@/components/crm/customer-profile"
import { Search, Sparkles, Send, Paperclip, Phone, MoreVertical, MessageCircle } from "lucide-react"

// --- Mock Data ---
const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Olivia Martin', email: 'olivia@example.com', phone: '+1 555 123 4567', initials: 'OM', sentiment: 'Happy', tags: ['VIP', 'Enterprise'] },
  { id: '2', name: 'Jackson Lee', email: 'jackson@example.com', phone: '+1 555 987 6543', initials: 'JL', sentiment: 'Frustrated', tags: ['Churn Risk'] },
]

const CONVERSATIONS = [
  { id: 'c1', customer: MOCK_CUSTOMERS[0], channel: 'whatsapp', lastMessage: 'Thanks for the quick refund!', time: '10:42 AM', unread: 0 },
  { id: 'c2', customer: MOCK_CUSTOMERS[1], channel: 'email', lastMessage: 'Where is my order? It is late.', time: 'Yesterday', unread: 2 },
]

const MESSAGES = [
  { id: 'm1', text: 'Where is my order? It is late.', sender: 'customer', time: 'Yesterday 2:30 PM' },
  { id: 'm2', text: 'I am so sorry for the delay, Jackson. Let me check the tracking for you right now.', sender: 'agent', time: 'Yesterday 2:45 PM' },
  { id: 'm3', text: 'Still waiting...', sender: 'customer', time: 'Yesterday 5:00 PM' },
]

export default function InboxPage() {
  const [activeChat, setActiveChat] = useState(CONVERSATIONS[1])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader 
        title="Universal Inbox" 
      />
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          
          {/* Left Pane: Conversation List */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35} className="flex flex-col">
            <div className="p-4 border-b space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-8 bg-muted/50" />
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="cursor-pointer">All</Badge>
                <Badge variant="outline" className="cursor-pointer">WhatsApp</Badge>
                <Badge variant="outline" className="cursor-pointer">Email</Badge>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="flex flex-col">
                {CONVERSATIONS.map(conv => (
                  <div 
                    key={conv.id} 
                    onClick={() => setActiveChat(conv)}
                    className={`flex items-start gap-3 p-4 border-b cursor-pointer transition-colors hover:bg-muted/50 ${activeChat.id === conv.id ? 'bg-muted' : ''}`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{conv.customer.initials}</AvatarFallback>
                      </Avatar>
                      {/* Channel Badge overlay */}
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center ${conv.channel === 'whatsapp' ? 'bg-green-500' : 'bg-blue-500'}`}>
                        {conv.channel === 'whatsapp' ? <MessageCircle className="w-2 h-2 text-white" /> : <span className="text-[8px] text-white">@</span>}
                      </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm truncate">{conv.customer.name}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <Badge variant="default" className="rounded-full w-5 h-5 flex items-center justify-center p-0">{conv.unread}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle />

          {/* Center Pane: Chat Area */}
          <ResizablePanel defaultSize={50} minSize={40}>
            <div className="flex flex-col h-full bg-muted/20">
              {/* Chat Header */}
              <div className="h-16 border-b flex items-center justify-between px-6 bg-background">
                <div className="flex items-center gap-3">
                  <div className="font-semibold">{activeChat.customer.name}</div>
                  <Badge variant="outline" className="capitalize">{activeChat.channel}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Chat History */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {MESSAGES.map(msg => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'agent' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${msg.sender === 'agent' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm'}`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 mx-1">{msg.time}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Composer */}
              <div className="p-4 bg-background border-t">
                <div className="flex gap-2 mb-2">
                   <Button variant="secondary" size="sm" className="h-7 text-xs rounded-full">
                     <Sparkles className="w-3 h-3 mr-1 text-primary" /> Auto-Draft Reply
                   </Button>
                   <Button variant="outline" size="sm" className="h-7 text-xs rounded-full">Ask for Order ID</Button>
                </div>
                <div className="relative">
                  <textarea 
                    className="w-full min-h-[80px] p-3 rounded-lg border bg-muted/50 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Type a message..."
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="h-8">
                      Send <Send className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Pane: Customer CRM Sidebar */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
            <CustomerProfile customer={activeChat.customer} />
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  )
}
