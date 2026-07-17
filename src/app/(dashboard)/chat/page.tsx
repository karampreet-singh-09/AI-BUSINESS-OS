"use client"

import { PageHeader } from "@/components/shared/page-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Bot, Paperclip, ChevronRight, Activity, CheckCircle2 } from "lucide-react"

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-muted/20">
      <PageHeader 
        title="AI Assistant" 
        description="Chat with your business context and execute automated workflows."
      />
      
      <div className="flex-1 max-w-4xl w-full mx-auto flex flex-col overflow-hidden">
        {/* Chat History */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            
            {/* User Message */}
            <div className="flex items-start gap-4 justify-end">
              <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                <p>Hey, can you analyze our customer churn this month and send a report to the team?</p>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>

            {/* AI Message */}
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8 bg-primary/10">
                <AvatarFallback className="text-primary"><Bot className="w-5 h-5" /></AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-2 max-w-[80%]">
                <div className="bg-background border px-4 py-3 rounded-2xl rounded-tl-sm">
                  <p>Absolutely. I will query the CRM for this month's churn data and execute the "Weekly Report" workflow.</p>
                </div>
                
                {/* Tool Execution Mock */}
                <Card className="bg-muted/50 border-dashed">
                  <CardContent className="p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Activity className="w-4 h-4 text-primary animate-pulse" />
                      Executing Workflow: Generate Report
                    </div>
                    <div className="space-y-2 pl-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Queried 124 churned profiles
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Generated summary using GPT-4
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Dispatched email to team@acme.com
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-background border px-4 py-3 rounded-2xl">
                  <p>The report has been generated and emailed to the team. We saw a 2.4% increase in churn compared to last month, mostly from the basic tier.</p>
                </div>
              </div>
            </div>

          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-6 pt-0">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <Button variant="outline" size="sm" className="rounded-full shrink-0">
              Draft an email to VIPs
            </Button>
            <Button variant="outline" size="sm" className="rounded-full shrink-0">
              Check unread messages
            </Button>
            <Button variant="outline" size="sm" className="rounded-full shrink-0">
              Summarize yesterday's sales
            </Button>
          </div>
          
          <div className="relative bg-background rounded-xl border shadow-sm focus-within:ring-1 focus-within:ring-primary transition-shadow">
            <Textarea 
              placeholder="Ask the AI to do something..." 
              className="min-h-[100px] border-0 focus-visible:ring-0 resize-none p-4 pb-12 bg-transparent"
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground rounded-full">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button size="sm" className="rounded-full px-4 h-8">
                Send <Send className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </div>
          <div className="text-center mt-3 text-xs text-muted-foreground">
            AI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>
    </div>
  )
}
