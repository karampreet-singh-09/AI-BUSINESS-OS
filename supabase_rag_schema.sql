-- ==========================================
-- AI Business OS - RAG Vector Database Schema
-- ==========================================

-- 1. Enable the pgvector extension (CRITICAL)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the document_chunks table
CREATE TABLE public.document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding VECTOR(768), -- Google Gemini embeddings are 768 dimensions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable RLS
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access chunks in their org" 
ON public.document_chunks 
FOR ALL 
USING (organization_id = public.get_user_organization_id());

-- 4. Create the similarity search function (RPC)
-- This allows our backend to ask "Find the most mathematically similar text to this question"
CREATE OR REPLACE FUNCTION match_document_chunks (
  query_embedding VECTOR(768),
  match_count INT DEFAULT 5,
  filter_org_id UUID DEFAULT NULL
) RETURNS TABLE (
  id UUID,
  document_id UUID,
  content TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dc.id,
    dc.document_id,
    dc.content,
    1 - (dc.embedding <=> query_embedding) AS similarity
  FROM document_chunks dc
  WHERE dc.organization_id = filter_org_id
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 5. Add Autopilot toggle to organizations
ALTER TABLE public.organizations
ADD COLUMN IF NOT EXISTS autopilot_enabled BOOLEAN DEFAULT false;
