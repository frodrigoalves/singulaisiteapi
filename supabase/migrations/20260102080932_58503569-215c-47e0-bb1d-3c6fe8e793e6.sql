-- Create transactions table for real-time tracking
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('stake', 'unstake', 'transfer', 'reward', 'mint', 'capsule')),
  amount NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  tx_hash TEXT,
  from_address TEXT,
  to_address TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own transactions
CREATE POLICY "Users can view their own transactions"
ON public.transactions
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own transactions
CREATE POLICY "Users can insert their own transactions"
ON public.transactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Enable realtime for transactions table
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;

-- Trigger for updated_at
CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();