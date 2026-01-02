import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Legacy general info
export function useLegacyInfo() {
  return useQuery({
    queryKey: ['legacy', 'info'],
    queryFn: () => api.getLegacyInfo(),
    staleTime: 60000,
  });
}

// User's legacy plans and as beneficiary
export function useUserLegacy(address: string | null) {
  return useQuery({
    queryKey: ['legacy', 'user', address],
    queryFn: () => api.getUserLegacy(address!),
    enabled: !!address,
    refetchInterval: 60000,
  });
}

// Get specific legacy plan by ID
export function useLegacyById(id: number | null) {
  return useQuery({
    queryKey: ['legacy', 'plan', id],
    queryFn: () => api.getLegacyById(id!),
    enabled: id !== null,
  });
}
