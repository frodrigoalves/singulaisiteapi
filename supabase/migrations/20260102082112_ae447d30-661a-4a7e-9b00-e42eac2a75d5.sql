-- Create airdrops table to track SGL token airdrops
CREATE TABLE public.airdrops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  wallet_address TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 10000,
  tx_hash TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  claimed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.airdrops ENABLE ROW LEVEL SECURITY;

-- Users can view their own airdrops
CREATE POLICY "Users can view their own airdrops"
ON public.airdrops
FOR SELECT
USING (auth.uid() = user_id);

-- Service role can insert airdrops (edge function)
CREATE POLICY "Service role can insert airdrops"
ON public.airdrops
FOR INSERT
WITH CHECK (true);

-- Service role can update airdrops
CREATE POLICY "Service role can update airdrops"
ON public.airdrops
FOR UPDATE
USING (true);