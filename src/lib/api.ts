// API Client for SingulAI Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.singulai.site';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Blockchain endpoints
  async getBlockchainHealth() {
    return this.request<{ status: string; timestamp: string }>('/api/v1/blockchain/health');
  }

  async getBlockchainStatus() {
    return this.request<{
      network: string;
      chainId: number;
      blockNumber: number;
      gasPrice: string;
    }>('/api/v1/blockchain/status');
  }

  async getWalletInfo(address: string) {
    return this.request<{
      address: string;
      ethBalance: string;
      sglBalance: string;
    }>(`/api/v1/blockchain/wallet/${address}`);
  }

  async getSglInfo() {
    return this.request<{
      name: string;
      symbol: string;
      address: string;
      totalSupply: string;
      decimals: number;
    }>('/api/v1/blockchain/sgl/info');
  }

  async getSglBalance(address: string) {
    return this.request<{
      address: string;
      balance: string;
      formatted: string;
    }>(`/api/v1/blockchain/sgl/balance/${address}`);
  }

  async transferSgl(data: { from: string; to: string; amount: string; privateKey?: string }) {
    return this.request<{
      txHash: string;
      from: string;
      to: string;
      amount: string;
    }>('/api/v1/blockchain/sgl/transfer', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async mintSgl(data: { to: string; amount: string }) {
    return this.request<{ txHash: string; to: string; amount: string }>('/api/v1/blockchain/sgl/mint', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async airdropSgl(data: { to: string; amount: string }) {
    return this.request<{ txHash: string; to: string; amount: string }>('/api/v1/blockchain/sgl/airdrop', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAvatarBalance(address: string) {
    return this.request<{
      address: string;
      balance: number;
      tokenIds: number[];
    }>(`/api/v1/blockchain/avatar/balance/${address}`);
  }

  async mintAvatar(data: { to: string; uri: string }) {
    return this.request<{ txHash: string; to: string; tokenId: number }>('/api/v1/blockchain/avatar/mint', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Staking endpoints
  async getStakingInfo() {
    return this.request<{
      totalStaked: string;
      rewardRate: string;
      minStake: string;
      lockPeriods: { days: number; apy: number; multiplier: string }[];
    }>('/api/v1/staking/info');
  }

  async getUserStaking(address: string) {
    return this.request<{
      address: string;
      totalStaked: string;
      pendingRewards: string;
      positions: {
        id: number;
        amount: string;
        period: number;
        startDate: string;
        unlockDate: string;
        rewards: string;
        status: 'locked' | 'unlocked';
      }[];
    }>(`/api/v1/staking/user/${address}`);
  }

  async getStakingLeaderboard() {
    return this.request<{
      leaderboard: { rank: number; address: string; staked: string }[];
    }>('/api/v1/staking/leaderboard');
  }

  // Time Capsule endpoints
  async getTimeCapsuleInfo() {
    return this.request<{
      totalCapsules: number;
      activeCapsules: number;
    }>('/api/v1/timecapsule/info');
  }

  async getUserCapsules(address: string) {
    return this.request<{
      capsules: {
        id: number;
        status: 'locked' | 'unlocked';
        unlockDate: string;
        created: string;
        recipient: string;
        daysLeft: number;
      }[];
    }>(`/api/v1/timecapsule/user/${address}`);
  }

  async getCapsuleById(id: number) {
    return this.request<{
      id: number;
      status: string;
      message?: string;
      unlockDate: string;
    }>(`/api/v1/timecapsule/capsule/${id}`);
  }

  // Legacy endpoints
  async getLegacyInfo() {
    return this.request<{
      totalPlans: number;
      activePlans: number;
    }>('/api/v1/legacy/info');
  }

  async getUserLegacy(address: string) {
    return this.request<{
      plans: {
        id: number;
        beneficiaries: number;
        totalAssets: string;
        inactivityPeriod: string;
        lastActivity: string;
        status: 'active' | 'pending' | 'executed';
      }[];
      asBeneficiary: {
        id: number;
        from: string;
        allocation: string;
        status: 'pending' | 'active';
      }[];
    }>(`/api/v1/legacy/user/${address}`);
  }

  async getLegacyById(id: number) {
    return this.request<{
      id: number;
      beneficiaries: { address: string; allocation: number }[];
      inactivityPeriod: number;
      status: string;
    }>(`/api/v1/legacy/legacy/${id}`);
  }
}

export const api = new ApiClient(API_BASE_URL);
export type { ApiClient };
