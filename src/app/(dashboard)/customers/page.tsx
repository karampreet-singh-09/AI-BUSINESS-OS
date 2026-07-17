"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CustomerProfile, type Customer } from "@/components/crm/customer-profile"
import { Search, Download, Plus, Filter } from "lucide-react"

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Olivia Martin', email: 'olivia@example.com', phone: '+1 555 123 4567', initials: 'OM', sentiment: 'Happy', tags: ['VIP', 'Enterprise'] },
  { id: '2', name: 'Jackson Lee', email: 'jackson@example.com', phone: '+1 555 987 6543', initials: 'JL', sentiment: 'Frustrated', tags: ['Churn Risk'] },
  { id: '3', name: 'Isabella Nguyen', email: 'isabella@example.com', phone: '+1 555 222 3333', initials: 'IN', sentiment: 'Neutral', tags: ['New'] },
  { id: '4', name: 'William Kim', email: 'william@example.com', phone: '+1 555 444 5555', initials: 'WK', sentiment: 'Happy', tags: [] },
  { id: '5', name: 'Sofia Davis', email: 'sofia@example.com', phone: '+1 555 666 7777', initials: 'SD', sentiment: 'Happy', tags: ['VIP'] },
]

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer)
    setSheetOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Customers (CRM)" 
        description="Manage your contacts, leads, and customer data."
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add Customer
          </Button>
        </div>
      </PageHeader>
      
      <div className="p-6 flex-1 flex flex-col space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-8" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>

        {/* Data Table */}
        <div className="border rounded-md bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_CUSTOMERS.map((customer) => (
                <TableRow 
                  key={customer.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleRowClick(customer)}
                >
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{customer.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.sentiment === 'Frustrated' ? 'destructive' : customer.sentiment === 'Happy' ? 'default' : 'secondary'}>
                      {customer.sentiment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {customer.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                      {customer.tags.length === 0 && <span className="text-muted-foreground text-xs">--</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{customer.phone}</TableCell>
                  <TableCell className="text-right text-muted-foreground text-sm">2 days ago</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Customer Profile Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-md p-0 sm:max-w-[400px]">
          <SheetHeader className="sr-only">
            <SheetTitle>Customer Profile</SheetTitle>
            <SheetDescription>View customer details and history.</SheetDescription>
          </SheetHeader>
          <CustomerProfile customer={selectedCustomer} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
