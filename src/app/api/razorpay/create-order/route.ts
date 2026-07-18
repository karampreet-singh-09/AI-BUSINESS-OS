import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import Razorpay from "razorpay"

export async function POST(req: Request) {
  try {
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

    // 3. Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    // 4. Create Order (e.g., ₹9,999 One-time Pro Plan)
    const options = {
      amount: 999900, // Amount is in currency subunits (paise) = ₹9,999
      currency: "INR",
      receipt: `receipt_${orgId}`,
      notes: {
        organization_id: orgId
      }
    }

    const order = await razorpay.orders.create(options)

    // 5. Save order ID to database
    await supabase
      .from("organizations")
      .update({ razorpay_order_id: order.id })
      .eq("id", orgId)

    return NextResponse.json({ orderId: order.id, amount: options.amount, currency: options.currency })

  } catch (error: any) {
    console.error("Razorpay Error:", error)
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 })
  }
}
