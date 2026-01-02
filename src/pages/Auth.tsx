import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useWalletAuth } from '@/hooks/use-wallet-auth';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/ui/glass-card';
import { Separator } from '@/components/ui/separator';
import { WalletGenerator } from '@/components/auth/wallet-generator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Wallet, Plus, Gift } from 'lucide-react';
import { z } from 'zod';
import logoSingulai from '@/assets/logo-singulai.png';

const emailSchema = z.string().email('Email inválido');
const passwordSchema = z.string().min(6, 'Senha deve ter pelo menos 6 caracteres');

type AuthView = 'main' | 'create-wallet';

interface WalletData {
  mnemonic: string;
  address: string;
  privateKey: string;
}

export default function Auth() {
  const [view, setView] = useState<AuthView>('main');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [pendingWalletData, setPendingWalletData] = useState<WalletData | null>(null);
  
  const { signIn, signUp, isAuthenticated, loading, session } = useAuth();
  const { isConnected, isAuthenticating, authenticateWithWallet } = useWalletAuth();
  const { openConnectModal } = useConnectModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, from]);

  // Auto-authenticate when wallet connects
  useEffect(() => {
    if (isConnected && !isAuthenticated && !isAuthenticating) {
      authenticateWithWallet().then(({ success }) => {
        if (success) {
          navigate(from, { replace: true });
        }
      });
    }
  }, [isConnected, isAuthenticated, isAuthenticating, authenticateWithWallet, navigate, from]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processAirdrop = async (walletAddress: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('process-airdrop', {
        body: { wallet_address: walletAddress },
      });

      if (error) {
        console.error('Airdrop error:', error);
        return;
      }

      if (data?.success) {
        toast({
          title: '🎉 Airdrop Recebido!',
          description: data.message,
        });
      }
    } catch (error) {
      console.error('Error processing airdrop:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'Erro ao entrar',
              description: 'Email ou senha incorretos.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Erro ao entrar',
              description: error.message,
              variant: 'destructive',
            });
          }
          return;
        }
        
        toast({
          title: 'Bem-vindo!',
          description: 'Login realizado com sucesso.',
        });
      } else {
        const { data, error } = await signUp(email, password, displayName);
        
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: 'Erro ao criar conta',
              description: 'Este email já está cadastrado. Tente fazer login.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Erro ao criar conta',
              description: error.message,
              variant: 'destructive',
            });
          }
          return;
        }
        
        toast({
          title: 'Conta criada!',
          description: 'Sua conta foi criada com sucesso.',
        });

        // Process airdrop if wallet was created
        if (pendingWalletData && data?.session) {
          await processAirdrop(pendingWalletData.address);
        }
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Algo deu errado. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWalletConnect = () => {
    if (openConnectModal) {
      openConnectModal();
    }
  };

  const handleWalletCreated = (walletData: WalletData) => {
    setPendingWalletData(walletData);
    setIsLogin(false);
    setDisplayName(`${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}`);
    setView('main');
    
    toast({
      title: 'Wallet pronta!',
      description: 'Complete seu cadastro para receber 10.000 SGL de boas-vindas.',
    });
  };

  if (loading || isAuthenticating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        {isAuthenticating && (
          <p className="text-muted-foreground">Autenticando com wallet...</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-radial from-primary/10 via-background to-background pointer-events-none" />
      
      {/* Back to home link */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para Home</span>
      </Link>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logoSingulai} alt="SingulAI" className="h-12" />
        </div>

        <GlassCard variant="elevated" size="lg" className="w-full">
          {view === 'create-wallet' ? (
            <WalletGenerator
              onWalletCreated={handleWalletCreated}
              onBack={() => setView('main')}
            />
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-foreground">
                  {isLogin ? 'Entrar na Plataforma' : 'Criar Conta'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {isLogin
                    ? 'Acesse seu dashboard SingulAI'
                    : 'Crie sua conta para começar'}
                </p>
              </div>

              {/* Airdrop Banner for Signup */}
              {!isLogin && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Gift className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-green-400">
                        Bônus de Boas-vindas
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Receba 10.000 SGL tokens no primeiro cadastro!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Pending Wallet Info */}
              {pendingWalletData && !isLogin && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        Wallet Criada
                      </p>
                      <p className="text-xs text-muted-foreground font-mono truncate">
                        {pendingWalletData.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Wallet Connect Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full gap-3 h-14 text-base"
                  onClick={handleWalletConnect}
                  disabled={isAuthenticating}
                >
                  <Wallet className="w-5 h-5" />
                  Conectar Wallet Existente
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="w-full gap-3 h-14 text-base"
                  onClick={() => setView('create-wallet')}
                >
                  <Plus className="w-5 h-5" />
                  Criar Nova Wallet
                </Button>
              </div>

              <div className="relative mb-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-sm text-muted-foreground">
                  ou use email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Nome de exibição</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="Seu nome"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isLogin ? 'Entrando...' : 'Criando conta...'}
                    </>
                  ) : isLogin ? (
                    'Entrar'
                  ) : (
                    'Criar Conta'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setErrors({});
                    }}
                    className="ml-2 text-primary hover:underline font-medium"
                  >
                    {isLogin ? 'Criar conta' : 'Fazer login'}
                  </button>
                </p>
              </div>
            </>
          )}
        </GlassCard>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Ao continuar, você concorda com nossos{' '}
          <a href="#" className="text-primary hover:underline">
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-primary hover:underline">
            Política de Privacidade
          </a>
        </p>
      </div>
    </div>
  );
}
