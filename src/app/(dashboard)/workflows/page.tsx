import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { FlowCanvas } from "@/components/workflows/flow-canvas"
import { Play, Save, Plus } from "lucide-react"

export default function WorkflowsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <PageHeader 
        title="Workflow Builder" 
        description="Design autonomous AI pipelines visually."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Play className="w-4 h-4 mr-2 text-green-500" /> Test Run
          </Button>
          <Button size="sm">
            <Save className="w-4 h-4 mr-2" /> Save & Deploy
          </Button>
        </div>
      </PageHeader>
      
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-64 border-r bg-card p-4 flex flex-col h-full overflow-y-auto">
          <h3 className="font-semibold mb-4 text-sm uppercase text-muted-foreground tracking-wider">Nodes</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Triggers</h4>
              <div className="p-3 border rounded-md cursor-move hover:border-primary transition-colors bg-background flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Incoming Message
              </div>
              <div className="p-3 border rounded-md cursor-move hover:border-primary transition-colors bg-background flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Webhook
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">AI Actions</h4>
              <div className="p-3 border rounded-md cursor-move hover:border-primary transition-colors bg-background flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Extract Data
              </div>
              <div className="p-3 border rounded-md cursor-move hover:border-primary transition-colors bg-background flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Draft Reply
              </div>
              <div className="p-3 border rounded-md cursor-move hover:border-primary transition-colors bg-background flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                RAG Search
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Logic</h4>
              <div className="p-3 border rounded-md cursor-move hover:border-primary transition-colors bg-background flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Condition (If/Else)
              </div>
              <div className="p-3 border rounded-md cursor-move hover:border-primary transition-colors bg-background flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Delay
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative">
          <FlowCanvas />
        </div>
        
      </div>
    </div>
  )
}
