# Environment Setup Guide

Follow these steps to set up your local development environment for the AI Business Agent platform.

## Prerequisites
- Node.js (v18+)
- npm or pnpm
- Docker (optional, for running Supabase locally)
- Supabase CLI (`npm i -g supabase`)

## 1. Local Configuration
Copy the `.env.example` file to create your local `.env.local` file:
```bash
cp .env.example .env.local
```

### Required Environment Variables
You will need to populate the following keys in your `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (DO NOT expose to client).
- `OPENAI_API_KEY`: For AI/RAG features.
- `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`: For local billing tests.

## 2. Database Setup (Supabase Local)
We highly recommend running Supabase locally for development.
```bash
supabase start
supabase db push
```
This will spin up a local Postgres instance, apply all migrations, and provide you with local Studio access.

## 3. Running the Application
```bash
npm install
npm run dev
```
The application will be available at `http://localhost:3000`.

## Testing Webhooks Locally
Use Stripe CLI or Ngrok to forward webhooks to `http://localhost:3000/api/webhooks/...` during local development.
