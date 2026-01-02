// Configuracao Web3 - Rede Base (ou Sepolia para testes)
// SEM RainbowKit - apenas viem para leitura de blockchain

export const CHAIN_CONFIG = {
  // Base Mainnet
  base: {
    id: 8453,
    name: "Base",
    rpcUrl: "https://mainnet.base.org",
    explorer: "https://basescan.org",
    currency: "ETH",
  },
  // Base Sepolia (testnet)
  baseSepolia: {
    id: 84532,
    name: "Base Sepolia",
    rpcUrl: "https://sepolia.base.org",
    explorer: "https://sepolia.basescan.org",
    currency: "ETH",
  },
  // Sepolia (testnet Ethereum)
  sepolia: {
    id: 11155111,
    name: "Sepolia",
    rpcUrl: "https://rpc.sepolia.org",
    explorer: "https://sepolia.etherscan.io",
    currency: "ETH",
  },
};

// Rede atual (mudar para "base" em producao)
export const CURRENT_CHAIN = CHAIN_CONFIG.sepolia;

// Endereco do contrato SGL Token
// TODO: Atualizar com endereco real apos deploy
export const SGL_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

// Verificar se o token esta deployado
export const IS_TOKEN_DEPLOYED = SGL_TOKEN_ADDRESS !== "0x0000000000000000000000000000000000000000";
