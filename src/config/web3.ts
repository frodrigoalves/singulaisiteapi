// Configuracao Web3 simplificada (sem RainbowKit)
import { sepolia, mainnet, base } from "viem/chains";

export const SUPPORTED_CHAINS = {
  sepolia: {
    id: 11155111,
    name: "Sepolia",
    rpcUrl: import.meta.env.VITE_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com",
    explorer: "https://sepolia.etherscan.io",
  },
  mainnet: {
    id: 1,
    name: "Ethereum",
    rpcUrl: "https://eth.llamarpc.com",
    explorer: "https://etherscan.io",
  },
  base: {
    id: 8453,
    name: "Base",
    rpcUrl: "https://mainnet.base.org",
    explorer: "https://basescan.org",
  },
};

// Chain atual (do .env)
export const CURRENT_CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID) || 11155111;

// Enderecos dos contratos
export const CONTRACTS = {
  SGL_TOKEN: import.meta.env.VITE_SGL_TOKEN_ADDRESS as `0x${string}`,
  AVATAR_BASE: import.meta.env.VITE_AVATAR_BASE_ADDRESS as `0x${string}`,
  AVATAR_WALLET_LINK: import.meta.env.VITE_AVATAR_WALLET_LINK_ADDRESS as `0x${string}`,
  TIMECAPSULE: import.meta.env.VITE_TIMECAPSULE_ADDRESS as `0x${string}`,
  LEGACY: import.meta.env.VITE_LEGACY_ADDRESS as `0x${string}`,
};

// Export vazio para manter compatibilidade (remover depois)
export const config = {};
