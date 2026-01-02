// Web3 Configuration - Simplified (sem RainbowKit)
// Configuracao para rede Base

export const CHAIN_CONFIG = {
  id: 8453,
  name: "Base",
  network: "base",
  rpcUrl: "https://mainnet.base.org",
  blockExplorer: "https://basescan.org",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
};

export const SGL_TOKEN = {
  address: "0x0000000000000000000000000000000000000000", // TODO: Substituir pelo endereco real do token
  symbol: "SGL",
  name: "SingulAI Token",
  decimals: 18,
};

// Funcao para formatar endereco
export function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Funcao para validar endereco Ethereum
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
