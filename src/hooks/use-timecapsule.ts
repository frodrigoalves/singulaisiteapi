import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Time capsule general info
export function useTimeCapsuleInfo() {
  return useQuery({
    queryKey: ['timecapsule', 'info'],
    queryFn: () => api.getTimeCapsuleInfo(),
    staleTime: 60000,
  });
}

// User's time capsules
export function useUserCapsules(address: string | null) {
  return useQuery({
    queryKey: ['timecapsule', 'user', address],
    queryFn: () => api.getUserCapsules(address!),
    enabled: !!address,
    refetchInterval: 60000, // Every minute
  });
}

// Get specific capsule by ID
export function useCapsuleById(id: number | null) {
  return useQuery({
    queryKey: ['timecapsule', 'capsule', id],
    queryFn: () => api.getCapsuleById(id!),
    enabled: id !== null,
  });
}
