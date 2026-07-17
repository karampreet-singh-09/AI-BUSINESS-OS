import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const customers = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatar: "OM",
    amount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatar: "JL",
    amount: "+$39.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "IN",
    amount: "+$299.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    avatar: "WK",
    amount: "+$99.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    avatar: "SD",
    amount: "+$39.00",
  },
]

export function RecentCustomers() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {customers.map((customer) => (
            <div key={customer.email} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{customer.avatar}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{customer.name}</p>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
              </div>
              <div className="ml-auto font-medium">{customer.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
