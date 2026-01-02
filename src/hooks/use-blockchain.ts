import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Get the connected wallet address (from localStorage or context)
export function useWalletAddress() {
  // For now, try to get from localStorage
  const address = localStorage.getItem('walletAddress');
  return address || null;
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
