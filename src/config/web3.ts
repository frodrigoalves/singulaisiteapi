// Configuracao simplificada - sem RainbowKit
export const SUPPORTED_CHAINS = {
  BASE_MAINNET: {
    id: 8453,
    name: "Base",
    rpcUrl: "https://mainnet.base.org",
    explorer: "https://basescan.org",
  },
  BASE_SEPOLIA: {
    id: 84532,
    name: "Base Sepolia",
    rpcUrl: "https://sepolia.base.org",
    explorer: "https://sepolia.basescan.org",
  },
};

export const SGL_TOKEN = {
  symbol: "SGL",
  name: "SingulAI Token",
  decimals: 18,
  // Endereco do contrato (atualizar quando deployar)
  address: {
    [SUPPORTED_CHAINS.BASE_MAINNET.id]: "0x...", // Mainnet
    [SUPPORTED_CHAINS.BASE_SEPOLIA.id]: "0x...", // Testnet
  },
};

export const DEFAULT_CHAIN = SUPPORTED_CHAINS.BASE_SEPOLIA;
