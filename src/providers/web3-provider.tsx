import { ReactNode, createContext, useContext, useState } from 'react';

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connect: (address: string) => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  connect: () => {},
  disconnect: () => {},
});

export const useWallet = () => useContext(WalletContext);

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [address, setAddress] = useState<string | null>(() => {
    // Recuperar do localStorage se existir
    return localStorage.getItem('wallet_address');
  });

  const connect = (walletAddress: string) => {
    setAddress(walletAddress);
    localStorage.setItem('wallet_address', walletAddress);
  };

  const disconnect = () => {
    setAddress(null);
    localStorage.removeItem('wallet_address');
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!address,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
