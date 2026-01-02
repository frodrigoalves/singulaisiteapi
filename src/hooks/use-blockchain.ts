import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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

// Get full wallet info
export function useWalletInfo() {
  const { address, loading, isConnected } = useWalletAddress();
  
  return {
    address,
    loading,
    isConnected,
    network: "base",
    chainId: 8453,
  };
}

// Get SGL token balance
export function useSglBalance() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["sgl-balance", user?.id],
    queryFn: async () => {
      if (!user) return "0.00";
      
      const { data } = await supabase
        .from("profiles")
        .select("sgl_balance")
        .eq("user_id", user.id)
        .single();
      
      return data?.sgl_balance?.toString() || "0.00";
    },
    enabled: !!user,
  });
}

// Get Avatar balance (quantity owned)
export function useAvatarBalance() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["avatar-balance", user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      const { count } = await supabase
        .from("user_avatars")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);
      
      return count || 0;
    },
    enabled: !!user,
  });
}

// Get user profile
export function useUserProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      
      return data;
    },
    enabled: !!user,
  });
}

// Get user airdrops
export function useUserAirdrop() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["user-airdrops", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data } = await supabase
        .from("airdrops")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      return data || [];
    },
    enabled: !!user,
  });
}

// Get user transactions
export function useUserTransactions() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["user-transactions", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("wallet_address")
        .eq("user_id", user.id)
        .single();
      
      if (!profile?.wallet_address) return [];
      
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .or(`from_address.eq.${profile.wallet_address},to_address.eq.${profile.wallet_address}`)
        .order("created_at", { ascending: false })
        .limit(20);
      
      return data || [];
    },
    enabled: !!user,
  });
}

// Legacy export for compatibility
export function useTokenBalance() {
  const { data: balance, isLoading } = useSglBalance();
  return { balance: balance || "0.00", loading: isLoading };
}
