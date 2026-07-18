"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Sparkles, Loader2 } from "lucide-react"
import Script from "next/script"

export function BillingSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleUpgrade = async () => {
    setIsLoading(true)
    
    try {
      // 1. Ask backend to create a Razorpay Order
      const res = await fetch("/api/razorpay/create-order", { method: "POST" })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      // 2. Open Razorpay Checkout popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: data.currency,
        name: "AI Business OS",
        description: "Lifetime Pro Upgrade",
        order_id: data.orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response: any) {
          // This executes when payment succeeds
          setPaymentSuccess(true)
          // The webhook handles the actual DB update securely in the background
        },
        theme: {
          color: "#0f172a"
        }
      }

      const rzp1 = new (window as any).Razorpay(options)
      rzp1.on('payment.failed', function (response: any){
        console.error(response.error.description)
        setIsLoading(false)
      })

      rzp1.open()

    } catch (error) {
      console.error("Failed to checkout", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div>
        <h3 className="text-lg font-medium">Billing & Plan</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing details.
        </p>
      </div>

      {paymentSuccess ? (
        <Card className="bg-green-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-green-600 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Payment Successful!
            </CardTitle>
            <CardDescription className="text-green-600/80">
              Welcome to AI Business OS Pro. Your account has been upgraded. You may need to refresh the page to see all features.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Free Tier</CardTitle>
              <CardDescription>Basic CRM and limited AI drafts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">₹0</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Up to 100 Customers</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Basic Inbox</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 50 AI Drafts / month</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Badge variant="secondary" className="w-full justify-center">Current Plan</Badge>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="border-primary shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3">
               <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Lifetime Deal</Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Pro Plan
              </CardTitle>
              <CardDescription>Unlock the full power of the AI Business OS.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">₹9,999</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited Customers</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> WhatsApp Integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited AI Drafts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Custom AI Knowledge Base</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpgrade} disabled={isLoading} className="w-full shadow-lg shadow-primary/20">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Upgrade to Pro"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
