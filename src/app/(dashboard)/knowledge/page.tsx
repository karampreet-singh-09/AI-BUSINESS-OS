"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { UploadCloud, FileText, Search, MoreHorizontal, Trash2, RefreshCw, Plus, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createClient } from "@/utils/supabase/client"

export default function KnowledgePage() {
  const [documents, setDocuments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const supabase = createClient()

  const fetchDocuments = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (data) setDocuments(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  const handleIngest = async () => {
    if (!title.trim() || !content.trim()) return
    setIsUploading(true)

    try {
      const res = await fetch("/api/knowledge/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error)
      }

      // Success
      setIsModalOpen(false)
      setTitle("")
      setContent("")
      fetchDocuments() // Refresh list
    } catch (error) {
      console.error("Failed to ingest document", error)
      alert("Failed to save document. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Knowledge Base" 
        description="Add text documents to train your AI on your specific business rules."
      >
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add Knowledge
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add AI Knowledge</DialogTitle>
              <DialogDescription>
                Paste your refund policies, FAQs, or rules here. The AI will read this to answer customer questions automatically.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Document Title</label>
                <Input 
                  placeholder="e.g., Return Policy 2024" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Raw Text Content</label>
                <Textarea 
                  placeholder="Paste your text here..." 
                  className="min-h-[200px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleIngest} disabled={isUploading || !title || !content}>
                {isUploading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Indexing AI...</> : "Save to Brain"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>
      
      <div className="p-6 max-w-6xl w-full mx-auto space-y-6">
        
        {/* Document Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Indexed Knowledge</h3>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-8" />
            </div>
          </div>
          
          <div className="border rounded-md bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" /> Loading documents...
                    </TableCell>
                  </TableRow>
                ) : documents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No knowledge documents added yet. Click "Add Knowledge" to train your AI.
                    </TableCell>
                  </TableRow>
                ) : (
                  documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="flex items-center gap-2 font-medium">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        {doc.title}
                      </TableCell>
                      <TableCell>{doc.file_type === 'text/plain' ? 'Text' : doc.file_type}</TableCell>
                      <TableCell className="text-muted-foreground">{formatBytes(doc.size_bytes)}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                          Indexed
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
