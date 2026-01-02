import { ReactNode, createContext, useContext, useState } from "react";

interface Web3ContextType {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
  isConnected: boolean;
}

const Web3Context = createContext<Web3ContextType>({
  walletAddress: null,
  setWalletAddress: () => {},
  isConnected: false,
});

export function useWeb3() {
  return useContext(Web3Context);
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <Web3Context.Provider
      value={{
        walletAddress,
        setWalletAddress,
        isConnected: !!walletAddress,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
