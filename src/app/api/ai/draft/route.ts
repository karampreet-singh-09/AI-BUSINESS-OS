import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {
    const { messages, customerName } = await req.json()
    const supabase = await createClient()

    // 1. Authenticate
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 })
    }

    // 2. Initialize Google Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // 3. Format the chat history for the prompt
    let chatHistoryText = `You are an expert, highly polite customer support agent for our company. 
You are speaking to a customer named ${customerName || "the customer"}.
Please read the following chat history and draft a perfect, professional, and concise response to the customer's last message. 
Do not include any placeholders like [Your Name]. Just write the exact message text that should be sent to the customer.

--- CHAT HISTORY ---\n`

    for (const msg of messages) {
      const sender = msg.sender_type === 'customer' ? `Customer (${customerName})` : 'Agent (You)'
      chatHistoryText += `\n${sender}: ${msg.content}`
    }

    chatHistoryText += `\n\n--- END HISTORY ---\n\nDraft your response now:`

    // 4. Generate Content
    const result = await model.generateContent(chatHistoryText)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ draft: text.trim() })

  } catch (error: any) {
    console.error("Gemini AI Error:", error)
    return NextResponse.json({ error: error.message || "Failed to generate draft" }, { status: 500 })
  }
}
