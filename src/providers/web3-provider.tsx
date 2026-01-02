import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string;
}

interface Web3ContextType {
  wallet: WalletState;
  setWallet: (wallet: WalletState) => void;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within Web3Provider");
  }
  return context;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    balance: "0",
  });

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
          setWallet({
            address: profile.wallet_address,
            isConnected: true,
            balance: "0", // TODO: buscar saldo real da blockchain
          });
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

  const disconnect = async () => {
    await supabase.auth.signOut();
    setWallet({ address: null, isConnected: false, balance: "0" });
  };

  return (
    <Web3Context.Provider value={{ wallet, setWallet, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
}
