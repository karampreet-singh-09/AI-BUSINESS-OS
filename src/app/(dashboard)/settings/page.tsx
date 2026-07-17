import { PageHeader } from "@/components/shared/page-header"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { TeamSettings } from "@/components/settings/team-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { AISettings } from "@/components/settings/ai-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Settings" 
        description="Manage your organization preferences, billing, and API keys."
      />
      <div className="p-6 flex-1 max-w-5xl">
        <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-6">
          <TabsList className="flex flex-row md:flex-col justify-start h-auto bg-transparent w-full md:w-48 overflow-x-auto gap-2">
            <TabsTrigger value="profile" className="justify-start data-[state=active]:bg-muted">Profile</TabsTrigger>
            <TabsTrigger value="team" className="justify-start data-[state=active]:bg-muted">Team & Roles</TabsTrigger>
            <TabsTrigger value="ai" className="justify-start data-[state=active]:bg-muted">AI Config</TabsTrigger>
            <TabsTrigger value="notifications" className="justify-start data-[state=active]:bg-muted">Notifications</TabsTrigger>
            <TabsTrigger value="appearance" className="justify-start data-[state=active]:bg-muted">Appearance</TabsTrigger>
          </TabsList>
          
          <div className="flex-1">
            <TabsContent value="profile" className="mt-0">
              <ProfileSettings />
            </TabsContent>
            <TabsContent value="team" className="mt-0">
              <TeamSettings />
            </TabsContent>
            <TabsContent value="ai" className="mt-0">
              <AISettings />
            </TabsContent>
            <TabsContent value="notifications" className="mt-0">
              <NotificationSettings />
            </TabsContent>
            <TabsContent value="appearance" className="mt-0">
              <AppearanceSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
