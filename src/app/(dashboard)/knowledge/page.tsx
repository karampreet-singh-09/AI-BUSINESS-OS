"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { UploadCloud, FileText, Search, MoreHorizontal, Trash2, RefreshCw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const DOCUMENTS = [
  { id: '1', name: 'Acme_Product_Manual_2024.pdf', type: 'PDF', size: '2.4 MB', status: 'Indexed', date: 'Oct 24, 2024' },
  { id: '2', name: 'Refund_Policy.docx', type: 'DOCX', size: '145 KB', status: 'Indexed', date: 'Oct 23, 2024' },
  { id: '3', name: 'https://acme.com/pricing', type: 'URL', size: '--', status: 'Syncing', date: 'Just now' },
]

export default function KnowledgePage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Knowledge Base" 
        description="Upload documents to train your AI OS on your specific business context."
      >
        <Button size="sm">
          <UploadCloud className="w-4 h-4 mr-2" /> Add Source
        </Button>
      </PageHeader>
      
      <div className="p-6 max-w-6xl w-full mx-auto space-y-6">
        
        {/* Upload Dropzone */}
        <Card className="border-dashed bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold">Upload Knowledge Files</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              Drag and drop PDFs, CSVs, or text files here. The AI will instantly read them and use them to answer customer questions.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Button variant="secondary">Browse Files</Button>
              <span className="text-sm text-muted-foreground">or</span>
              <div className="flex w-64 items-center space-x-2">
                <Input type="url" placeholder="Paste a URL to scrape..." />
                <Button type="submit">Add</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Indexed Sources</h3>
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
                {DOCUMENTS.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="flex items-center gap-2 font-medium">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      {doc.name}
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                    <TableCell>
                      {doc.status === 'Syncing' ? (
                        <Badge variant="secondary" className="animate-pulse">
                          <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Syncing
                        </Badge>
                      ) : (
                        <Badge variant="default" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                          {doc.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{doc.date}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <RefreshCw className="w-4 h-4 mr-2" /> Resync
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
