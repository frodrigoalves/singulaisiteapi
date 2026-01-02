import { ReactNode, createContext, useContext, useState } from 'react';

interface Web3ContextType {
  isConnected: boolean;
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
  setIsConnected: (connected: boolean) => void;
}

const Web3Context = createContext<Web3ContextType | null>(null);

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <Web3Context.Provider value={{ 
      isConnected, 
      walletAddress, 
      setWalletAddress, 
      setIsConnected 
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
