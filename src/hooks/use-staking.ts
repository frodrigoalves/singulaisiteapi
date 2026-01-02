import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Staking pools and general info
export function useStakingInfo() {
  return useQuery({
    queryKey: ['staking', 'info'],
    queryFn: () => api.getStakingInfo(),
    staleTime: 30000, // Cache for 30s
  });
}

// User staking positions
export function useUserStaking(address: string | null) {
  return useQuery({
    queryKey: ['staking', 'user', address],
    queryFn: () => api.getUserStaking(address!),
    enabled: !!address,
    refetchInterval: 30000, // Every 30s
  });
}

// Staking leaderboard
export function useStakingLeaderboard() {
  return useQuery({
    queryKey: ['staking', 'leaderboard'],
    queryFn: () => api.getStakingLeaderboard(),
    staleTime: 60000, // Cache for 1 min
  });
}
