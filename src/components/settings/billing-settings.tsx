"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Sparkles, Loader2, Zap } from "lucide-react"
import Script from "next/script"

export function BillingSettings() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleUpgrade = async (planId: string, tier: string) => {
    setIsLoading(tier)
    
    try {
      // 1. Ask backend to create a Razorpay Subscription
      const res = await fetch("/api/razorpay/create-order", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId })
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      // 2. Open Razorpay Checkout popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        name: "AI Business OS",
        description: `${tier} Subscription`,
        subscription_id: data.subscriptionId, // Critical: use subscription_id instead of order_id
        handler: function (response: any) {
          // This executes when payment succeeds
          setPaymentSuccess(true)
          // The webhook handles the actual DB update securely
        },
        theme: {
          color: "#0f172a"
        }
      }

      const rzp1 = new (window as any).Razorpay(options)
      rzp1.on('payment.failed', function (response: any){
        console.error(response.error.description)
        setIsLoading(null)
      })

      rzp1.open()

    } catch (error) {
      console.error("Failed to checkout", error)
      setIsLoading(null)
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
              <CheckCircle2 className="w-5 h-5" /> Subscription Active!
            </CardTitle>
            <CardDescription className="text-green-600/80">
              Welcome to your new AI Business OS plan. Your account has been upgraded. You may need to refresh the page to see all features.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Free Tier</CardTitle>
              <CardDescription>Basic CRM and limited AI drafts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">₹0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
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

          {/* Base Plan */}
          <Card className="border-border relative overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" /> Base Plan
              </CardTitle>
              <CardDescription>Ideal for growing teams.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">₹1,000<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Up to 1,000 Customers</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Standard Inbox</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> 500 AI Drafts / month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Priority Email Support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_RAZORPAY_BASE_PLAN_ID!, "Base")} 
                disabled={isLoading !== null} 
                className="w-full"
                variant="outline"
              >
                {isLoading === "Base" ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Upgrade to Base"}
              </Button>
            </CardFooter>
          </Card>

          {/* Advanced Plan */}
          <Card className="border-primary shadow-sm relative overflow-hidden bg-primary/5">
            <div className="absolute top-0 right-0 p-3">
               <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">Popular</Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Advanced Plan
              </CardTitle>
              <CardDescription>For scaling enterprises.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">₹2,500<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited Customers</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> WhatsApp Integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited AI Drafts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Custom AI Knowledge Base</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_RAZORPAY_ADVANCED_PLAN_ID!, "Advanced")} 
                disabled={isLoading !== null} 
                className="w-full shadow-lg shadow-primary/20"
              >
                {isLoading === "Advanced" ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Upgrade to Advanced"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
