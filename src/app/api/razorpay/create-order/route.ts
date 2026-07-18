import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import Razorpay from "razorpay"

export async function POST(req: Request) {
  try {
    const { planId } = await req.json()
    const supabase = await createClient()

    // 1. Authenticate User
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 2. Get Organization ID
    const { data: userData } = await supabase
      .from("users")
      .select("organization_id")
      .eq("id", user.id)
      .single()

    const orgId = userData?.organization_id
    if (!orgId) {
      return NextResponse.json({ error: "No organization found" }, { status: 400 })
    }

    if (!planId) {
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 })
    }

    // 3. Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    // 4. Create Subscription
    const options = {
      plan_id: planId,
      customer_notify: 1 as 1,
      total_count: 120, // 10 years by default for monthly recurring
      notes: {
        organization_id: orgId,
        plan_tier: planId === process.env.NEXT_PUBLIC_RAZORPAY_BASE_PLAN_ID ? 'base' : 'advanced'
      }
    }

    const subscription = await razorpay.subscriptions.create(options)

    // 5. Save subscription ID to database
    await supabase
      .from("organizations")
      .update({ razorpay_order_id: subscription.id }) // repurposing column for subscription ID temporarily
      .eq("id", orgId)

    return NextResponse.json({ subscriptionId: subscription.id })

  } catch (error: any) {
    console.error("Razorpay Error:", error)
    return NextResponse.json({ error: error.message || "Failed to create subscription" }, { status: 500 })
  }
}
