import { useState, useCallback } from 'react';
import { english, generateMnemonic, mnemonicToAccount } from 'viem/accounts';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Wallet,
  Copy,
  Download,
  CheckCircle,
  Eye,
  EyeOff,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Shield,
  Globe,
  Coins,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Network configuration
const NETWORK_CONFIG = {
  name: 'Sepolia Testnet',
  chainId: 11155111,
  rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
  symbol: 'ETH',
  blockExplorer: 'https://sepolia.etherscan.io',
};

// Token configuration
const TOKEN_CONFIG = {
  name: 'SingulAI Token',
  symbol: 'SGL',
  address: import.meta.env.VITE_SGL_TOKEN_ADDRESS || '0xF281a68ae5Baf227bADC1245AC5F9B2F53b7EDe1',
  decimals: 18,
};

interface WalletData {
  mnemonic: string;
  address: string;
  privateKey: string;
}

interface WalletGeneratorProps {
  onWalletCreated: (walletData: WalletData) => void;
  onBack: () => void;
}

export function WalletGenerator({ onWalletCreated, onBack }: WalletGeneratorProps) {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [hasCopiedMnemonic, setHasCopiedMnemonic] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Helper function to convert Uint8Array to hex string (browser-compatible)
  const bytesToHex = (bytes: Uint8Array): string => {
    return Array.from(bytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const generateWallet = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Generate a random mnemonic (12 words)
      const mnemonic = generateMnemonic(english);
      
      // Derive account from mnemonic
      const account = mnemonicToAccount(mnemonic);
      
      // Get private key using browser-compatible conversion
      const hdKey = account.getHdKey();
      const privateKeyHex = hdKey.privateKey 
        ? `0x${bytesToHex(hdKey.privateKey)}`
        : '';
      
      const newWalletData: WalletData = {
        mnemonic,
        address: account.address,
        privateKey: privateKeyHex,
      };
      
      setWalletData(newWalletData);
      setHasCopiedMnemonic(false);
      setHasDownloaded(false);
      
      toast({
        title: 'Wallet criada!',
        description: 'Guarde sua frase de recuperação em um local seguro.',
      });
    } catch (error) {
      console.error('Error generating wallet:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao gerar wallet. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  }, [toast]);

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (label === 'Frase de recuperação') {
        setHasCopiedMnemonic(true);
      }
      toast({
        title: 'Copiado!',
        description: `${label} copiado para a área de transferência.`,
      });
    } catch (error) {
      toast({
        title: 'Erro ao copiar',
        description: 'Não foi possível copiar. Tente manualmente.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const downloadWalletData = useCallback(() => {
    if (!walletData) return;

    const content = `╔══════════════════════════════════════════════════════════════╗
║              SingulAI Wallet - GUARDE EM LOCAL SEGURO         ║
╚══════════════════════════════════════════════════════════════╝

📋 INFORMAÇÕES DA WALLET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Endereço da Wallet:
${walletData.address}

Frase de Recuperação (12 palavras):
${walletData.mnemonic}

Chave Privada:
${walletData.privateKey}

🌐 CONFIGURAÇÃO DE REDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rede: ${NETWORK_CONFIG.name}
Chain ID: ${NETWORK_CONFIG.chainId}
RPC URL: ${NETWORK_CONFIG.rpcUrl}
Símbolo: ${NETWORK_CONFIG.symbol}
Block Explorer: ${NETWORK_CONFIG.blockExplorer}

🪙 TOKEN SGL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nome: ${TOKEN_CONFIG.name}
Símbolo: ${TOKEN_CONFIG.symbol}
Contrato: ${TOKEN_CONFIG.address}
Decimais: ${TOKEN_CONFIG.decimals}

📱 COMO IMPORTAR NO METAMASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Abra o MetaMask e clique em "Importar Conta"
2. Selecione "Frase de Recuperação" ou "Chave Privada"
3. Cole as informações acima
4. Adicione a rede Sepolia:
   - Nome: ${NETWORK_CONFIG.name}
   - RPC URL: ${NETWORK_CONFIG.rpcUrl}
   - Chain ID: ${NETWORK_CONFIG.chainId}
   - Símbolo: ${NETWORK_CONFIG.symbol}
5. Adicione o token SGL:
   - Clique em "Importar tokens"
   - Endereço do contrato: ${TOKEN_CONFIG.address}

⚠️ IMPORTANTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• NUNCA compartilhe sua chave privada ou frase de recuperação
• Guarde este arquivo em local seguro (offline)
• Qualquer pessoa com acesso a esses dados pode roubar seus fundos
• SingulAI NUNCA pedirá sua chave privada

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gerado em: ${new Date().toISOString()}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `singulai-wallet-${walletData.address.slice(0, 8)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setHasDownloaded(true);
    toast({
      title: 'Download concluído!',
      description: 'Guarde o arquivo em local seguro.',
    });
  }, [walletData, toast]);

  const handleContinue = () => {
    if (walletData) {
      onWalletCreated(walletData);
    }
  };

  const canContinue = hasCopiedMnemonic || hasDownloaded;

  return (
    <div className="space-y-6">
      {!walletData ? (
        // Initial state - generate wallet
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Wallet className="w-10 h-10 text-primary" />
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-foreground">Criar Nova Wallet</h2>
            <p className="text-muted-foreground mt-2">
              Gere uma wallet segura para acessar a plataforma SingulAI
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-left">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-500">Importante</p>
                <p className="text-muted-foreground mt-1">
                  Você receberá uma frase de 12 palavras que é a única forma de recuperar sua wallet. 
                  Guarde-a em local seguro e nunca compartilhe com ninguém.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              onClick={generateWallet}
              disabled={isGenerating}
              className="w-full gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Gerar Wallet
                </>
              )}
            </Button>
            
            <Button variant="ghost" onClick={onBack}>
              Voltar
            </Button>
          </div>
        </div>
      ) : (
        // Wallet generated - show data
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Wallet Criada!</h2>
            <p className="text-muted-foreground mt-1">
              Guarde suas credenciais em local seguro
            </p>
          </div>

          {/* Network & Token Info */}
          <div className="grid grid-cols-2 gap-3">
            <GlassCard variant="default" size="sm" className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Rede</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{NETWORK_CONFIG.name}</p>
                <p className="text-xs text-muted-foreground">Chain ID: {NETWORK_CONFIG.chainId}</p>
              </div>
            </GlassCard>

            <GlassCard variant="default" size="sm" className="space-y-2">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Token</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{TOKEN_CONFIG.symbol}</p>
                <p className="text-xs text-muted-foreground">{TOKEN_CONFIG.name}</p>
              </div>
            </GlassCard>
          </div>

          {/* Token Contract */}
          <GlassCard variant="default" size="sm" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Contrato SGL</span>
              <Badge variant="outline" className="gap-1 text-xs">
                <Coins className="w-3 h-3" />
                Token
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs font-mono bg-secondary/50 p-2 rounded break-all">
                {TOKEN_CONFIG.address}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(TOKEN_CONFIG.address, 'Contrato SGL')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </GlassCard>

          {/* Wallet Address */}
          <GlassCard variant="default" size="sm" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Seu Endereço</span>
              <Badge variant="outline" className="gap-1">
                <Shield className="w-3 h-3" />
                Público
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm font-mono bg-secondary/50 p-2 rounded break-all">
                {walletData.address}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(walletData.address, 'Endereço')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </GlassCard>

          {/* Mnemonic Phrase */}
          <GlassCard variant="default" size="sm" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Frase de Recuperação (12 palavras)
              </span>
              <Badge variant="outline" className="gap-1 border-red-500/50 text-red-400">
                <AlertTriangle className="w-3 h-3" />
                Secreto
              </Badge>
            </div>
            
            <div className="relative">
              <div 
                className={cn(
                  "grid grid-cols-3 gap-2 p-3 rounded bg-secondary/50 transition-all",
                  !showMnemonic && "blur-md select-none"
                )}
              >
                {walletData.mnemonic.split(' ').map((word, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-sm font-mono"
                  >
                    <span className="text-muted-foreground w-5">{index + 1}.</span>
                    <span>{word}</span>
                  </div>
                ))}
              </div>
              
              {!showMnemonic && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowMnemonic(true)}
                    className="gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Revelar
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
                onClick={() => copyToClipboard(walletData.mnemonic, 'Frase de recuperação')}
              >
                <Copy className="w-4 h-4" />
                {hasCopiedMnemonic ? 'Copiado!' : 'Copiar'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMnemonic(!showMnemonic)}
              >
                {showMnemonic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </GlassCard>

          {/* Private Key */}
          <GlassCard variant="default" size="sm" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Chave Privada</span>
              <Badge variant="outline" className="gap-1 border-red-500/50 text-red-400">
                <AlertTriangle className="w-3 h-3" />
                Secreto
              </Badge>
            </div>
            
            <div className="relative">
              <code 
                className={cn(
                  "block text-xs font-mono bg-secondary/50 p-2 rounded break-all transition-all",
                  !showPrivateKey && "blur-md select-none"
                )}
              >
                {walletData.privateKey}
              </code>
              
              {!showPrivateKey && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowPrivateKey(true)}
                    className="gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Revelar
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-2"
                onClick={() => copyToClipboard(walletData.privateKey, 'Chave privada')}
              >
                <Copy className="w-4 h-4" />
                Copiar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
              >
                {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </GlassCard>

          {/* Download Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full gap-2"
            onClick={downloadWalletData}
          >
            <Download className="w-4 h-4" />
            {hasDownloaded ? 'Baixar Novamente' : 'Baixar Dados da Wallet'}
          </Button>

          {/* Warning */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-400">Atenção!</p>
                <ul className="text-muted-foreground mt-1 space-y-1">
                  <li>• NUNCA compartilhe sua chave privada ou frase de recuperação</li>
                  <li>• SingulAI NUNCA pedirá esses dados</li>
                  <li>• Perca essas informações = perca seus fundos para sempre</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={handleContinue}
              disabled={!canContinue}
            >
              Continuar para Cadastro
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            {!canContinue && (
              <p className="text-xs text-center text-muted-foreground">
                Copie ou baixe suas credenciais para continuar
              </p>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="w-full gap-2"
              onClick={generateWallet}
            >
              <RefreshCw className="w-4 h-4" />
              Gerar Nova Wallet
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
