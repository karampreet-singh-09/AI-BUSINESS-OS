"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Mail, Calendar, Webhook, Key, CheckCircle2, XCircle } from "lucide-react"

const INTEGRATIONS = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Connect your WhatsApp Business API to handle customer messages directly in the Universal Inbox.",
    icon: <MessageCircle className="w-8 h-8 text-green-500" />,
    status: "connected",
  },
  {
    id: "email",
    name: "Gmail / Workspace",
    description: "Sync your support email address to automatically parse incoming tickets and draft AI replies.",
    icon: <Mail className="w-8 h-8 text-red-500" />,
    status: "connected",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "Allow the AI Agent to check your availability and schedule appointments automatically.",
    icon: <Calendar className="w-8 h-8 text-blue-500" />,
    status: "disconnected",
  },
  {
    id: "webhooks",
    name: "Custom Webhooks",
    description: "Trigger external applications or start internal workflows using standard HTTP POST webhooks.",
    icon: <Webhook className="w-8 h-8 text-purple-500" />,
    status: "disconnected",
  },
  {
    id: "api",
    name: "Developer API",
    description: "Generate API keys to programmatically interact with your CRM, Inbox, and Workflows.",
    icon: <Key className="w-8 h-8 text-amber-500" />,
    status: "disconnected",
  },
]

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <PageHeader 
        title="Integrations" 
        description="Connect your AI OS to the tools you already use to create powerful automated workflows."
      />
      
      <div className="p-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTEGRATIONS.map((integration) => (
            <Card key={integration.id} className="flex flex-col relative overflow-hidden transition-all hover:shadow-md">
              {/* Status Indicator Bar */}
              <div className={`absolute top-0 left-0 w-full h-1 ${integration.status === 'connected' ? 'bg-green-500' : 'bg-muted'}`} />
              
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-muted/50 rounded-lg">
                    {integration.icon}
                  </div>
                  {integration.status === 'connected' ? (
                    <span className="flex items-center text-xs font-medium text-green-600 bg-green-500/10 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                    </span>
                  ) : (
                    <span className="flex items-center text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      <XCircle className="w-3 h-3 mr-1" /> Disconnected
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl">{integration.name}</CardTitle>
                <CardDescription className="line-clamp-2 min-h-[40px]">
                  {integration.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                {/* Additional config details could go here */}
              </CardContent>
              
              <CardFooter className="pt-4 border-t bg-muted/10">
                {integration.status === 'connected' ? (
                  <div className="flex w-full gap-2">
                    <Button variant="outline" className="w-full">Configure</Button>
                    <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10 px-3">
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full">Connect</Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
