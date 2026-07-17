import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function AISettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Configuration</CardTitle>
        <CardDescription>Adjust how your AI agent behaves and communicates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Default Tone</Label>
          <Select defaultValue="professional">
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional & Polite</SelectItem>
              <SelectItem value="casual">Casual & Friendly</SelectItem>
              <SelectItem value="direct">Direct & Concise</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>System Instructions</Label>
          <Textarea 
            placeholder="Tell the AI how to represent your business..." 
            defaultValue="You are a helpful assistant for Acme Corp. Always prioritize customer satisfaction."
            rows={4}
          />
        </div>

        <div className="flex items-center justify-between space-x-2 pt-4 border-t">
          <div className="flex flex-col space-y-1">
            <Label>Autonomous Actions</Label>
            <span className="text-sm text-muted-foreground">Allow AI to send emails and update records without approval.</span>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  )
}
