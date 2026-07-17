"use client"

import { useCallback, useState } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Handle,
  Position
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Mail, Settings, AlertTriangle } from 'lucide-react'

// --- Custom Node Component ---
function WorkflowNode({ data, isConnectable }: any) {
  return (
    <div className="bg-background border-2 border-primary/20 shadow-md rounded-xl p-4 min-w-[200px]">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-3 h-3 bg-primary" />
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-md ${data.type === 'trigger' ? 'bg-blue-500/10 text-blue-500' : data.type === 'condition' ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'}`}>
          {data.icon}
        </div>
        <div>
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.sublabel}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-3 h-3 bg-primary" />
    </div>
  )
}

const nodeTypes = {
  workflowNode: WorkflowNode,
}

// --- Initial Mock Data ---
const initialNodes: Node[] = [
  { 
    id: '1', 
    type: 'workflowNode', 
    position: { x: 250, y: 50 }, 
    data: { label: 'Incoming Email', sublabel: 'Trigger', type: 'trigger', icon: <Mail className="w-5 h-5" /> } 
  },
  { 
    id: '2', 
    type: 'workflowNode', 
    position: { x: 250, y: 200 }, 
    data: { label: 'Analyze Sentiment', sublabel: 'AI Action', type: 'action', icon: <Settings className="w-5 h-5" /> } 
  },
  { 
    id: '3', 
    type: 'workflowNode', 
    position: { x: 250, y: 350 }, 
    data: { label: 'Is Negative?', sublabel: 'Condition', type: 'condition', icon: <AlertTriangle className="w-5 h-5" /> } 
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
]

export function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  )

  return (
    <div className="w-full h-full bg-muted/10">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap zoomable pannable className="bg-background border rounded-lg shadow-sm" />
        <Background color="#ccc" gap={16} />
      </ReactFlow>
    </div>
  )
}
