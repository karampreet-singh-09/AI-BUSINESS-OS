import { NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@supabase/supabase-js"

// The Webhook receives events directly from Razorpay, so it runs outside of an authenticated user session.
// We must use the Supabase Service Role Key to bypass RLS and update the database safely.

export async function POST(req: Request) {
  try {
    const bodyText = await req.text()
    const signature = req.headers.get("x-razorpay-signature")
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET

    if (!signature || !secret) {
      return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 })
    }

    // 1. Verify Webhook Signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(bodyText)
      .digest("hex")

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(bodyText)

    // 2. Handle Payment Capture Success
    if (event.event === "payment.captured" || event.event === "order.paid") {
      const paymentEntity = event.payload.payment.entity
      const orderId = paymentEntity.order_id
      const paymentId = paymentEntity.id
      const orgId = paymentEntity.notes?.organization_id

      if (orgId) {
        // Initialize Supabase Admin Client
        const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        // Upgrade the organization
        const { error } = await supabaseAdmin
          .from("organizations")
          .update({
            plan_tier: "pro",
            subscription_status: "active",
            razorpay_payment_id: paymentId
          })
          .eq("id", orgId)

        if (error) {
          console.error("Supabase Update Error:", error)
          return NextResponse.json({ error: "Database update failed" }, { status: 500 })
        }
      }
    }

    return NextResponse.json({ status: "ok" })

  } catch (error: any) {
    console.error("Webhook Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
