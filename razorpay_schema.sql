-- ==========================================
-- AI Business OS - Razorpay Schema Update
-- ==========================================

-- Add Razorpay tracking columns to organizations table
ALTER TABLE public.organizations
ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT,
ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT,
ADD COLUMN IF NOT EXISTS plan_tier TEXT DEFAULT 'free';

-- Update the default subscription status to match a free tier model
-- We will change 'trialing' to 'active' for 'free' tier, or keep it simple.
-- For now, if plan_tier is 'pro', subscription_status is 'active'.
