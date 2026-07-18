import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Simple chunking function (splits by paragraphs, keeps chunks under ~1000 chars)
function chunkText(text: string, maxChunkSize = 1000): string[] {
  const paragraphs = text.split(/\n\s*\n/)
  const chunks: string[] = []
  let currentChunk = ""

  for (const p of paragraphs) {
    if ((currentChunk.length + p.length) > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim())
      currentChunk = ""
    }
    currentChunk += p + "\n\n"
  }
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim())
  }
  return chunks
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json()
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

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // 2. Insert into documents table
    const { data: docData, error: docError } = await supabase
      .from("documents")
      .insert({
        organization_id: orgId,
        title: title,
        file_type: "text/plain",
        size_bytes: Buffer.byteLength(content, 'utf8')
      })
      .select("id")
      .single()

    if (docError || !docData) {
      throw new Error(docError?.message || "Failed to create document record")
    }

    const documentId = docData.id

    // 3. Chunk the text
    const chunks = chunkText(content)

    // 4. Generate Embeddings using Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" })

    // Process chunks sequentially to avoid rate limits
    const documentChunks = []
    for (const chunk of chunks) {
      // Get embedding array
      const result = await embedModel.embedContent(chunk)
      const embeddingValues = result.embedding.values

      documentChunks.push({
        document_id: documentId,
        organization_id: orgId,
        content: chunk,
        embedding: `[${embeddingValues.join(',')}]` // pgvector format
      })
    }

    // 5. Save chunks and vectors to Supabase
    const { error: chunkError } = await supabase
      .from("document_chunks")
      .insert(documentChunks)

    if (chunkError) {
      console.error("Chunk Insert Error:", chunkError)
      throw new Error("Failed to save document vectors")
    }

    return NextResponse.json({ success: true, documentId })

  } catch (error: any) {
    console.error("Ingestion Error:", error)
    return NextResponse.json({ error: error.message || "Failed to ingest document" }, { status: 500 })
  }
}
