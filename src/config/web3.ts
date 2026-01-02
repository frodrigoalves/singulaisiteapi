// Configuracao de rede blockchain
export const CHAIN_CONFIG = {
  // Base Mainnet
  chainId: 8453,
  chainName: "Base",
  rpcUrl: "https://mainnet.base.org",
  explorerUrl: "https://basescan.org",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
};

// Contrato do Token SGL (atualizar com endereco real quando deployar)
export const SGL_TOKEN = {
  address: "0x0000000000000000000000000000000000000000", // TODO: Atualizar
  decimals: 18,
  symbol: "SGL",
  name: "SingulAI Token",
};

// API Backend
export const API_URL = "https://api.singulai.site";
