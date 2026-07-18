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

    const { data: userData } = await supabase
      .from("users")
      .select("organization_id")
      .eq("id", user.id)
      .single()

    const orgId = userData?.organization_id
    if (!orgId) {
      return NextResponse.json({ error: "No organization found" }, { status: 400 })
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 })
    }

    // 2. Initialize Google Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" })

    // 3. RAG Retrieval - Get embedding of the last customer message
    const lastMessage = messages[messages.length - 1].content
    const embedResult = await embedModel.embedContent(lastMessage)
    const queryEmbedding = embedResult.embedding.values

    // 4. Search Supabase for relevant knowledge
    const { data: matchedChunks, error: rpcError } = await supabase.rpc(
      "match_document_chunks",
      {
        query_embedding: `[${queryEmbedding.join(',')}]`,
        match_count: 3, // Get top 3 most relevant paragraphs
        filter_org_id: orgId
      }
    )

    let knowledgeContext = ""
    if (matchedChunks && matchedChunks.length > 0) {
      knowledgeContext = matchedChunks.map((chunk: any) => chunk.content).join("\n\n")
    }

    // 5. Format the chat history for the prompt
    let chatHistoryText = `You are an expert, highly polite customer support agent for our company. 
You are speaking to a customer named ${customerName || "the customer"}.
Please read the following chat history and draft a perfect, professional, and concise response to the customer's last message. 
Do not include any placeholders like [Your Name]. Just write the exact message text that should be sent to the customer.

`
    if (knowledgeContext) {
      chatHistoryText += `\n--- IMPORTANT COMPANY KNOWLEDGE BASE ---\nUse the following rules/policies to answer the customer accurately if relevant:\n${knowledgeContext}\n---------------------------------------\n`
    }

    chatHistoryText += `\n--- CHAT HISTORY ---\n`

    for (const msg of messages) {
      const sender = msg.sender_type === 'customer' ? `Customer (${customerName})` : 'Agent (You)'
      chatHistoryText += `\n${sender}: ${msg.content}`
    }

    chatHistoryText += `\n\n--- END HISTORY ---\n\nDraft your response now:`

    // 6. Generate Content
    const result = await model.generateContent(chatHistoryText)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ draft: text.trim() })

  } catch (error: any) {
    console.error("Gemini AI Error:", error)
    return NextResponse.json({ error: error.message || "Failed to generate draft" }, { status: 500 })
  }
}
