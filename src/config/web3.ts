import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, mainnet } from 'wagmi/chains';

// WalletConnect Project ID - get yours at https://cloud.walletconnect.com
// Using a demo project ID - replace with your own for production
const projectId = '3a8170812b534d0ff9d794f19a901d64';

export const config = getDefaultConfig({
  appName: 'SingulAI',
  projectId,
  chains: [sepolia, mainnet],
  ssr: false,
});
