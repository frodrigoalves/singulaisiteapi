import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  balance: string;
  connect: (address: string) => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within Web3Provider");
  }
  return context;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");

  // Carregar wallet do usuario logado
  useEffect(() => {
    async function loadWallet() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("wallet_address")
          .eq("user_id", user.id)
          .single();
        
        if (profile?.wallet_address) {
          setAddress(profile.wallet_address);
        }
      }
    }
    loadWallet();

    // Listener para mudancas de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadWallet();
    });

    return () => subscription.unsubscribe();
  }, []);

  const connect = (walletAddress: string) => {
    setAddress(walletAddress);
  };

  const disconnect = () => {
    setAddress(null);
    setBalance("0");
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        balance,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
