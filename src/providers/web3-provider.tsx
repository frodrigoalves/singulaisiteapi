import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";

// Configuracao da rede (Base Mainnet para producao)
const CHAIN = base;
const RPC_URL = "https://mainnet.base.org";

// Cliente publico para leitura de dados
export const publicClient = createPublicClient({
  chain: CHAIN,
  transport: http(RPC_URL),
});

interface Web3ContextType {
  chain: typeof CHAIN;
  isConnected: boolean;
  address: string | null;
  setAddress: (address: string | null) => void;
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
  const [address, setAddress] = useState<string | null>(null);

  // Carregar endereco salvo no localStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem("wallet_address");
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  // Salvar endereco no localStorage
  useEffect(() => {
    if (address) {
      localStorage.setItem("wallet_address", address);
    } else {
      localStorage.removeItem("wallet_address");
    }
  }, [address]);

  const disconnect = () => {
    setAddress(null);
    localStorage.removeItem("wallet_address");
    localStorage.removeItem("wallet_private_key");
  };

  return (
    <Web3Context.Provider
      value={{
        chain: CHAIN,
        isConnected: !!address,
        address,
        setAddress,
        disconnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
