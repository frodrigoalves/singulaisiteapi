import { useState, useCallback } from 'react';
import { privateKeyToAccount } from 'viem/accounts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/glass-card';
import { useToast } from '@/hooks/use-toast';
import {
  Key,
  Eye,
  EyeOff,
  Loader2,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WalletImportProps {
  onWalletImported: (data: { address: string; privateKey: string }) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function WalletImport({ onWalletImported, onBack, isLoading }: WalletImportProps) {
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [derivedAddress, setDerivedAddress] = useState<string | null>(null);
  const { toast } = useToast();

  // Validar e derivar endereço da chave privada
  const validateAndDeriveAddress = useCallback((key: string) => {
    setError(null);
    setDerivedAddress(null);

    if (!key) return;

    // Normalizar a chave (adicionar 0x se não tiver)
    let normalizedKey = key.trim();
    if (!normalizedKey.startsWith('0x')) {
      normalizedKey = `0x${normalizedKey}`;
    }

    // Verificar formato
    if (!/^0x[a-fA-F0-9]{64}$/.test(normalizedKey)) {
      setError('Chave privada inválida. Deve ter 64 caracteres hexadecimais.');
      return;
    }

    try {
      const account = privateKeyToAccount(normalizedKey as `0x${string}`);
      setDerivedAddress(account.address);
    } catch (err) {
      setError('Chave privada inválida. Verifique e tente novamente.');
    }
  }, []);

  const handlePrivateKeyChange = (value: string) => {
    setPrivateKey(value);
    validateAndDeriveAddress(value);
  };

  const handleConnect = () => {
    if (!derivedAddress || !privateKey) {
      toast({
        title: 'Erro',
        description: 'Cole uma chave privada válida.',
        variant: 'destructive',
      });
      return;
    }

    // Normalizar a chave
    let normalizedKey = privateKey.trim();
    if (!normalizedKey.startsWith('0x')) {
      normalizedKey = `0x${normalizedKey}`;
    }

    onWalletImported({
      address: derivedAddress,
      privateKey: normalizedKey,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Key className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Importar Wallet</h2>
        <p className="text-muted-foreground mt-2">
          Cole sua chave privada para conectar
        </p>
      </div>

      {/* Aviso de Segurança */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-yellow-500">Atenção</p>
            <p className="text-muted-foreground mt-1">
              Sua chave privada é processada apenas localmente no seu navegador.
              Nunca a compartilhe com ninguém.
            </p>
          </div>
        </div>
      </div>

      {/* Input da Chave Privada */}
      <div className="space-y-3">
        <Label htmlFor="privateKey">Chave Privada</Label>
        <div className="relative">
          <Input
            id="privateKey"
            type={showPrivateKey ? 'text' : 'password'}
            placeholder="0x... ou cole sua chave privada"
            value={privateKey}
            onChange={(e) => handlePrivateKeyChange(e.target.value)}
            className={cn(
              "pr-10 font-mono text-sm",
              error && "border-destructive",
              derivedAddress && "border-green-500"
            )}
          />
          <button
            type="button"
            onClick={() => setShowPrivateKey(!showPrivateKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPrivateKey ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Erro */}
        {error && (
          <p className="text-sm text-destructive flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </p>
        )}

        {/* Endereço Derivado */}
        {derivedAddress && (
          <GlassCard variant="default" size="sm" className="space-y-2">
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Wallet Válida</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Endereço:</span>
              <code className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded">
                {derivedAddress.slice(0, 10)}...{derivedAddress.slice(-8)}
              </code>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Botões */}
      <div className="flex flex-col gap-3">
        <Button
          size="lg"
          className="w-full gap-2"
          onClick={handleConnect}
          disabled={!derivedAddress || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Conectando...
            </>
          ) : (
            <>
              Conectar Wallet
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>

        <Button variant="ghost" onClick={onBack} disabled={isLoading}>
          Voltar
        </Button>
      </div>
    </div>
  );
}
