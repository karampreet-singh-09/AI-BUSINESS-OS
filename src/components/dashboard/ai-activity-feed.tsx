import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    title: "Drafted Email Reply",
    description: "AI drafted a response to 'Refund Request - Order #124'",
    time: "2 mins ago",
    status: "pending_review",
  },
  {
    id: 2,
    title: "Analyzed Sentiment",
    description: "Flagged conversation with John Doe as 'Frustrated'",
    time: "15 mins ago",
    status: "automated",
  },
  {
    id: 3,
    title: "Meeting Scheduled",
    description: "AI booked a demo call with Sarah Jenkins",
    time: "1 hour ago",
    status: "success",
  },
  {
    id: 4,
    title: "Data Extracted",
    description: "Saved 3 phone numbers from incoming SMS queue",
    time: "2 hours ago",
    status: "success",
  },
]

export function AIActivityFeed() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>AI Activity Feed</CardTitle>
        <CardDescription>Recent actions taken by your AI Agent.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="pt-2">
                    <Badge variant={activity.status === 'success' ? 'default' : activity.status === 'automated' ? 'secondary' : 'outline'}>
                      {activity.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
