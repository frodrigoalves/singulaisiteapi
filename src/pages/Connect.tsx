import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/container";
import { WalletGenerator } from "@/components/auth/wallet-generator";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useWalletAuth } from '@/hooks/use-wallet-auth';
import { useAuth } from '@/hooks/use-auth';
import logo from "@/assets/logo-singulai.png";
import {
  Wallet,
  Mail,
  ArrowRight,
  ArrowLeft,
  Chrome,
  Smartphone,
  Key,
  ChevronRight,
  Shield,
  Copy,
  Download,
  CheckCircle,
  Eye,
  EyeOff,
  Plus,
  Loader2,
} from "lucide-react";

type AuthMethod = "wallet" | "social" | "email" | "create" | null;

export default function ConnectPage() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(null);
  const [email, setEmail] = useState("");
  
  const { openConnectModal } = useConnectModal();
  const { isConnected, isAuthenticating, authenticateWithWallet } = useWalletAuth();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  // Auto-authenticate when wallet connects
  useEffect(() => {
    if (isConnected && !isAuthenticated && !isAuthenticating) {
      authenticateWithWallet().then(({ success }) => {
        if (success) {
          navigate('/dashboard', { replace: true });
        }
      });
    }
  }, [isConnected, isAuthenticated, isAuthenticating, authenticateWithWallet, navigate]);

  const handleWalletConnect = () => {
    if (openConnectModal) {
      openConnectModal();
    }
  };

  const handleWalletCreated = () => {
    navigate('/auth');
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

  const renderWalletConnect = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Conectar Wallet</h3>
      
      <Button
        variant="outline"
        size="lg"
        className="w-full gap-3 h-14 text-base"
        onClick={handleWalletConnect}
      >
        <Wallet className="w-5 h-5" />
        Conectar Wallet Existente
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        MetaMask, WalletConnect, Coinbase e outras
      </p>
    </div>
  );

  const renderSocialLogin = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Login Social</h3>
      <Button variant="outline" className="w-full justify-start gap-3 h-12">
        <Chrome className="w-5 h-5" />
        Continuar com Google
      </Button>
      <Button variant="outline" className="w-full justify-start gap-3 h-12">
        <Smartphone className="w-5 h-5" />
        Continuar com Apple
      </Button>
      <p className="text-xs text-muted-foreground text-center pt-2">
        Uma wallet será criada automaticamente para você
      </p>
    </div>
  );

  const renderEmailLogin = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Login por Email</h3>
      <div>
        <Input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button variant="hero" className="w-full gap-2" onClick={() => navigate('/auth')}>
        <Mail className="w-4 h-4" />
        Ir para Login
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        Faça login ou crie sua conta
      </p>
    </div>
  );

  const renderCreateWallet = () => (
    <WalletGenerator
      onWalletCreated={handleWalletCreated}
      onBack={() => setAuthMethod(null)}
    />
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
      </div>

      <Container size="sm">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="SingulAI" className="h-10 w-auto mx-auto mb-6" />
          </Link>
          <h1 className="text-h3 font-bold text-foreground mb-2">Welcome to SingulAI</h1>
          <p className="text-muted-foreground">Connect or create a wallet to continue</p>
        </div>

        <GlassCard variant="glow" size="lg">
          {!authMethod ? (
            <div className="space-y-4">
              <button
                onClick={() => setAuthMethod("wallet")}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Connect Wallet</p>
                  <p className="text-sm text-muted-foreground">MetaMask, WalletConnect, etc.</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              <button
                onClick={() => setAuthMethod("social")}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Chrome className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Social Login</p>
                  <p className="text-sm text-muted-foreground">Google, Apple</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              <button
                onClick={() => setAuthMethod("email")}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">Passwordless login</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-card text-sm text-muted-foreground">or</span>
                </div>
              </div>

              <Button
                variant="secondary"
                className="w-full gap-2"
                onClick={() => setAuthMethod("create")}
              >
                <Plus className="w-4 h-4" />
                Não tenho wallet - Criar nova
              </Button>
            </div>
          ) : authMethod === "wallet" ? (
            renderWalletConnect()
          ) : authMethod === "social" ? (
            renderSocialLogin()
          ) : authMethod === "email" ? (
            renderEmailLogin()
          ) : (
            renderCreateWallet()
          )}

          {authMethod && authMethod !== "create" && (
            <button
              onClick={() => setAuthMethod(null)}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-6"
            >
              Voltar às opções
            </button>
          )}
        </GlassCard>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </Container>
    </div>
  );
}
