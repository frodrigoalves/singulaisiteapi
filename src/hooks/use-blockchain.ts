import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './use-auth';
import { useAccount } from 'wagmi';

// Get the connected wallet address (from Web3 wallet or Supabase profile)
export function useWalletAddress() {
  const { address: web3Address } = useAccount();
  const { user } = useAuth();

  // Try Web3 wallet first
  if (web3Address) {
    return web3Address;
  }

  // Fallback to localStorage (for legacy support)
  const storedAddress = localStorage.getItem('walletAddress');
  return storedAddress || null;
}

// Get user profile with wallet address from Supabase
export function useUserProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
}

// Get user's airdrop status
export function useUserAirdrop() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['airdrop', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('airdrops')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
}

// Blockchain health check
export function useBlockchainHealth() {
  return useQuery({
    queryKey: ['blockchain', 'health'],
    queryFn: () => api.getBlockchainHealth(),
    refetchInterval: 30000, // Every 30s
  });
}

// Blockchain status (network, gas, etc)
export function useBlockchainStatus() {
  return useQuery({
    queryKey: ['blockchain', 'status'],
    queryFn: () => api.getBlockchainStatus(),
    refetchInterval: 15000, // Every 15s
  });
}

// Wallet info (ETH + SGL balance)
export function useWalletInfo(address: string | null) {
  return useQuery({
    queryKey: ['wallet', address],
    queryFn: () => api.getWalletInfo(address!),
    enabled: !!address,
    refetchInterval: 10000, // Every 10s
  });
}

// SGL Token info
export function useSglInfo() {
  return useQuery({
    queryKey: ['sgl', 'info'],
    queryFn: () => api.getSglInfo(),
    staleTime: 60000, // Cache for 1 min
  });
}

// SGL Balance for a specific address
export function useSglBalance(address: string | null) {
  return useQuery({
    queryKey: ['sgl', 'balance', address],
    queryFn: () => api.getSglBalance(address!),
    enabled: !!address,
    refetchInterval: 10000,
  });
}

// Transfer SGL
export function useTransferSgl() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { from: string; to: string; amount: string }) => 
      api.transferSgl(data),
    onSuccess: (_, variables) => {
      // Invalidate balances
      queryClient.invalidateQueries({ queryKey: ['sgl', 'balance', variables.from] });
      queryClient.invalidateQueries({ queryKey: ['sgl', 'balance', variables.to] });
      queryClient.invalidateQueries({ queryKey: ['wallet', variables.from] });
    },
  });
}

// Avatar balance
export function useAvatarBalance(address: string | null) {
  return useQuery({
    queryKey: ['avatar', 'balance', address],
    queryFn: () => api.getAvatarBalance(address!),
    enabled: !!address,
  });
}

// Mint avatar
export function useMintAvatar() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { to: string; uri: string }) => api.mintAvatar(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['avatar', 'balance', variables.to] });
    },
  });
}
