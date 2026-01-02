import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo-singulai.png";
import {
  Wallet,
  Mail,
  ArrowLeft,
  Key,
  Plus,
  Loader2,
  ChevronRight,
} from "lucide-react";

export default function ConnectPage() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se ja autenticado
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

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
          <h1 className="text-h3 font-bold text-foreground mb-2">
            Bem-vindo ao SingulAI
          </h1>
          <p className="text-muted-foreground">
            Escolha como deseja acessar sua conta
          </p>
        </div>

        <GlassCard variant="glow" size="lg">
          <div className="space-y-4">
            {/* Login com Email/Senha */}
            <button
              onClick={() => navigate("/auth")}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Email e Senha</p>
                <p className="text-sm text-muted-foreground">
                  Login tradicional com sua conta
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Login com Chave Privada */}
            <button
              onClick={() => navigate("/auth?method=privatekey")}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Key className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Chave Privada</p>
                <p className="text-sm text-muted-foreground">
                  Importar wallet existente
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-card text-sm text-muted-foreground">
                  ou
                </span>
              </div>
            </div>

            {/* Criar Nova Wallet */}
            <Button
              variant="hero"
              className="w-full gap-2"
              onClick={() => navigate("/auth?method=create")}
            >
              <Plus className="w-4 h-4" />
              Criar Nova Conta + Wallet
            </Button>
          </div>
        </GlassCard>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Home
          </Link>
        </div>
      </Container>
    </div>
  );
}
