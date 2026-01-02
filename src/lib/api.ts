// API Client for SingulAI Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://72.60.147.56:3004/api/v1';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;
const API_RETRIES = Number(import.meta.env.VITE_API_RETRIES) || 3;

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit, retries = API_RETRIES): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (retries > 0 && (error instanceof TypeError || (error as Error).name === 'AbortError')) {
        console.log(`Retrying request to ${endpoint}, ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.request<T>(endpoint, options, retries - 1);
      }
      
      throw error;
    }
  }

  // Blockchain endpoints
  async getBlockchainHealth() {
    return this.request<{ status: string; timestamp: string }>('/blockchain/health');
  }

  async getBlockchainStatus() {
    return this.request<{
      network: string;
      chainId: number;
      blockNumber: number;
      gasPrice: string;
    }>('/blockchain/status');
  }

  async getWalletInfo(address: string) {
    return this.request<{
      address: string;
      ethBalance: string;
      sglBalance: string;
    }>(`/blockchain/wallet/${address}`);
  }

  async getSglInfo() {
    return this.request<{
      name: string;
      symbol: string;
      address: string;
      totalSupply: string;
      decimals: number;
    }>('/blockchain/sgl/info');
  }

  async getSglBalance(address: string) {
    return this.request<{
      address: string;
      balance: string;
      formatted: string;
    }>(`/blockchain/sgl/balance/${address}`);
  }

  async transferSgl(data: { from: string; to: string; amount: string; privateKey?: string }) {
    return this.request<{
      txHash: string;
      from: string;
      to: string;
      amount: string;
    }>('/blockchain/sgl/transfer', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async mintSgl(data: { to: string; amount: string }) {
    return this.request<{ txHash: string; to: string; amount: string }>('/blockchain/sgl/mint', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async airdropSgl(data: { to: string; amount: string }) {
    return this.request<{ txHash: string; to: string; amount: string }>('/blockchain/sgl/airdrop', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAvatarBalance(address: string) {
    return this.request<{
      address: string;
      balance: number;
      tokenIds: number[];
    }>(`/blockchain/avatar/balance/${address}`);
  }

  async mintAvatar(data: { to: string; uri: string }) {
    return this.request<{ txHash: string; to: string; tokenId: number }>('/blockchain/avatar/mint', {
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
    }>('/staking/info');
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
    }>(`/staking/user/${address}`);
  }

  async getStakingLeaderboard() {
    return this.request<{
      leaderboard: { rank: number; address: string; staked: string }[];
    }>('/staking/leaderboard');
  }

  // Time Capsule endpoints
  async getTimeCapsuleInfo() {
    return this.request<{
      totalCapsules: number;
      activeCapsules: number;
    }>('/timecapsule/info');
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
    }>(`/timecapsule/user/${address}`);
  }

  async getCapsuleById(id: number) {
    return this.request<{
      id: number;
      status: string;
      message?: string;
      unlockDate: string;
    }>(`/timecapsule/capsule/${id}`);
  }

  // Legacy endpoints
  async getLegacyInfo() {
    return this.request<{
      totalPlans: number;
      activePlans: number;
    }>('/legacy/info');
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
    }>(`/legacy/user/${address}`);
  }

  async getLegacyById(id: number) {
    return this.request<{
      id: number;
      beneficiaries: { address: string; allocation: number }[];
      inactivityPeriod: number;
      status: string;
    }>(`/legacy/legacy/${id}`);
  }
}

export const api = new ApiClient(API_BASE_URL);
export type { ApiClient };
