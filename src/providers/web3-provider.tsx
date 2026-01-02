import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { createPublicClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';

// Configuracao da rede (Base Mainnet para producao)
const chain = import.meta.env.PROD ? base : baseSepolia;

export const publicClient = createPublicClient({
  chain,
  transport: http(),
});

interface Web3ContextType {
  chain: typeof chain;
  isTestnet: boolean;
}

const Web3Context = createContext<Web3ContextType>({
  chain,
  isTestnet: !import.meta.env.PROD,
});

export const useWeb3 = () => useContext(Web3Context);

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const value = {
    chain,
    isTestnet: !import.meta.env.PROD,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}
