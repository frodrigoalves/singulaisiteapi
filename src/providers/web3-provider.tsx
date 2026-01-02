import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { createPublicClient, http, formatEther } from 'viem';
import { sepolia } from 'viem/chains';

// Cliente público para leitura da blockchain
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(import.meta.env.VITE_RPC_URL || 'https://ethereum-sepolia-rpc.publicnode.com'),
});

interface Web3ContextType {
  // Dados da wallet conectada (do Supabase/Auth)
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
  
  // Saldos
  ethBalance: string;
  sglBalance: string;
  
  // Funções
  refreshBalances: () => Promise<void>;
  isLoading: boolean;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
}

interface Web3ProviderProps {
  children: ReactNode;
}

// ABI mínimo para ler saldo ERC20
const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

export function Web3Provider({ children }: Web3ProviderProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState('0.00');
  const [sglBalance, setSglBalance] = useState('0.00');
  const [isLoading, setIsLoading] = useState(false);

  const SGL_TOKEN_ADDRESS = import.meta.env.VITE_SGL_TOKEN_ADDRESS as `0x${string}`;

  const refreshBalances = async () => {
    if (!walletAddress) {
      setEthBalance('0.00');
      setSglBalance('0.00');
      return;
    }

    setIsLoading(true);
    try {
      // Buscar saldo ETH
      const ethBal = await publicClient.getBalance({
        address: walletAddress as `0x${string}`,
      });
      setEthBalance(parseFloat(formatEther(ethBal)).toFixed(4));

      // Buscar saldo SGL Token
      if (SGL_TOKEN_ADDRESS) {
        try {
          const sglBal = await publicClient.readContract({
            address: SGL_TOKEN_ADDRESS,
            abi: ERC20_ABI,
            functionName: 'balanceOf',
            args: [walletAddress as `0x${string}`],
          });
          setSglBalance(parseFloat(formatEther(sglBal)).toFixed(2));
        } catch (e) {
          console.warn('Erro ao buscar saldo SGL:', e);
          setSglBalance('0.00');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar saldos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar saldos quando wallet mudar
  useEffect(() => {
    if (walletAddress) {
      refreshBalances();
    }
  }, [walletAddress]);

  return (
    <Web3Context.Provider
      value={{
        walletAddress,
        setWalletAddress,
        ethBalance,
        sglBalance,
        refreshBalances,
        isLoading,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
