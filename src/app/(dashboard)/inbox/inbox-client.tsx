"use client"

import { useState, useRef, useEffect } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CustomerProfile } from "@/components/crm/customer-profile"
import { Search, Sparkles, Send, Paperclip, Phone, MoreVertical, MessageCircle, Loader2 } from "lucide-react"
import { sendMessage } from "@/app/actions/messages"

export default function InboxClient({ initialConversations }: { initialConversations: any[] }) {
  const [activeChat, setActiveChat] = useState(initialConversations[0] || null)
  const [draft, setDraft] = useState("")
  const [conversations, setConversations] = useState(initialConversations)
  const [isSending, setIsSending] = useState(false)
  const [isDrafting, setIsDrafting] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [activeChat?.messages])

  const handleAutoDraft = async () => {
    if (!activeChat || activeChat.messages.length === 0 || isDrafting) return
    setIsDrafting(true)

    try {
      const res = await fetch("/api/ai/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: activeChat.messages,
          customerName: activeChat.customer.name 
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setDraft(data.draft)
    } catch (e) {
      console.error("Failed to auto-draft", e)
      setDraft("Sorry, AI drafting failed. Please try again.")
    } finally {
      setIsDrafting(false)
    }
  }

  const handleSend = async () => {
    if (!draft.trim() || !activeChat || isSending) return
    setIsSending(true)
    
    try {
      const newMsg = await sendMessage(activeChat.customer.id, draft, activeChat.channel)
      
      // Optimistic UI update
      if (newMsg && newMsg.length > 0) {
        const message = newMsg[0]
        const updatedChat = {
          ...activeChat,
          lastMessage: message.content,
          messages: [...activeChat.messages, message]
        }
        
        setActiveChat(updatedChat)
        setConversations(prev => prev.map(c => c.id === updatedChat.id ? updatedChat : c))
      }
      setDraft("")
    } catch (e) {
      console.error("Failed to send message", e)
    } finally {
      setIsSending(false)
    }
  }

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
                {conversations.length === 0 ? (
                   <div className="p-8 text-center text-muted-foreground text-sm">
                     No conversations yet.
                   </div>
                ) : (
                  conversations.map(conv => (
                    <div 
                      key={conv.id} 
                      onClick={() => setActiveChat(conv)}
                      className={`flex items-start gap-3 p-4 border-b cursor-pointer transition-colors hover:bg-muted/50 ${activeChat?.id === conv.id ? 'bg-muted' : ''}`}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>{conv.customer.initials}</AvatarFallback>
                        </Avatar>
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
                  ))
                )}
              </div>
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle />

          {/* Center Pane: Chat Area */}
          <ResizablePanel defaultSize={50} minSize={40}>
            {activeChat ? (
              <div className="flex flex-col h-full bg-muted/20">
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

                <ScrollArea className="flex-1 p-6" ref={scrollRef}>
                  <div className="space-y-6">
                    {activeChat.messages.length === 0 ? (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        No messages yet. Send a message to start the conversation!
                      </div>
                    ) : (
                      activeChat.messages.map((msg: any) => (
                        <div key={msg.id} className={`flex flex-col ${msg.sender_type === 'agent' ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${msg.sender_type === 'agent' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm'}`}>
                            <p className="text-sm">{msg.content}</p>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1 mx-1">
                            {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>

                <div className="p-4 bg-background border-t">
                  <div className="flex gap-2 mb-2">
                     <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-7 text-xs rounded-full"
                        onClick={handleAutoDraft}
                        disabled={isDrafting || activeChat.messages.length === 0}
                     >
                       {isDrafting ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1 text-primary" />}
                       {isDrafting ? "Drafting..." : "Auto-Draft Reply"}
                     </Button>
                     <Button variant="outline" size="sm" className="h-7 text-xs rounded-full">Ask for Order ID</Button>
                  </div>
                  <div className="relative">
                    <textarea 
                      className="w-full min-h-[80px] p-3 rounded-lg border bg-muted/50 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Type a message..."
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSend()
                        }
                      }}
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="h-8" onClick={handleSend} disabled={isSending}>
                        Send <Send className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground bg-muted/20">
                Select a conversation to start chatting.
              </div>
            )}
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Pane: Customer CRM Sidebar */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
            {activeChat ? (
              <CustomerProfile customer={activeChat.customer} />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No customer selected.
              </div>
            )}
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  )
}
