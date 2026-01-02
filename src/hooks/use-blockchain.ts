import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./use-auth";

// Get wallet address from Supabase profile
export function useWalletAddress() {
  const { user } = useAuth();
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWallet() {
      if (!user) {
        setAddress(null);
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase
          .from("profiles")
          .select("wallet_address")
          .eq("user_id", user.id)
          .single();

        setAddress(data?.wallet_address || null);
      } catch (error) {
        console.error("Error fetching wallet:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWallet();
  }, [user]);

  return { address, loading, isConnected: !!address };
}

// Get token balance (placeholder - implement with real API later)
export function useTokenBalance() {
  const { address } = useWalletAddress();
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      // TODO: Implement real balance fetch from blockchain
      setBalance("0.00");
    }
    setLoading(false);
  }, [address]);

  return { balance, loading };
}
