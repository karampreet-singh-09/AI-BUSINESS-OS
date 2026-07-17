import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how and when you want to be alerted.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-col space-y-1">
            <Label>Email Notifications</Label>
            <span className="text-sm text-muted-foreground">Receive daily summaries of AI activities.</span>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-col space-y-1">
            <Label>AI Action Alerts</Label>
            <span className="text-sm text-muted-foreground">Get instantly notified when the AI makes a major change.</span>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-col space-y-1">
            <Label>Marketing Emails</Label>
            <span className="text-sm text-muted-foreground">Receive product updates and offers.</span>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  )
}
