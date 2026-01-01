import { useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/container";
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
} from "lucide-react";

type AuthMethod = "wallet" | "social" | "email" | "create" | null;
type CreateStep = 1 | 2 | 3 | 4 | 5;

const walletOptions = [
  { name: "MetaMask", icon: "🦊", popular: true },
  { name: "WalletConnect", icon: "🔗" },
  { name: "Coinbase Wallet", icon: "💰" },
];

const mockMnemonic = [
  "abandon", "ability", "able", "about", "above", "absent",
  "absorb", "abstract", "absurd", "abuse", "access", "accident"
];

export default function ConnectPage() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(null);
  const [createStep, setCreateStep] = useState<CreateStep>(1);
  const [email, setEmail] = useState("");
  const [savedPhrase, setSavedPhrase] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verifyWords, setVerifyWords] = useState<string[]>(["", "", ""]);

  const renderWalletConnect = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Connect Wallet</h3>
      {walletOptions.map((wallet) => (
        <button
          key={wallet.name}
          className="w-full flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group"
        >
          <span className="text-2xl">{wallet.icon}</span>
          <span className="flex-1 font-medium text-foreground">{wallet.name}</span>
          {wallet.popular && (
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">Popular</span>
          )}
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      ))}
      <button className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
        Show more wallets
      </button>
    </div>
  );

  const renderSocialLogin = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Social Login</h3>
      <Button variant="outline" className="w-full justify-start gap-3 h-12">
        <Chrome className="w-5 h-5" />
        Continue with Google
      </Button>
      <Button variant="outline" className="w-full justify-start gap-3 h-12">
        <Smartphone className="w-5 h-5" />
        Continue with Apple
      </Button>
      <p className="text-xs text-muted-foreground text-center pt-2">
        A wallet will be created automatically for you
      </p>
    </div>
  );

  const renderEmailLogin = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Email Login</h3>
      <div>
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button variant="hero" className="w-full gap-2">
        <Mail className="w-4 h-4" />
        Send Magic Link
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        We'll send you a passwordless login link
      </p>
    </div>
  );

  const renderCreateWallet = () => {
    switch (createStep) {
      case 1:
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto">
              <Wallet className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Let's create your wallet</h3>
              <p className="text-muted-foreground">
                A wallet is your digital identity on the blockchain. It's secured by a recovery phrase that only you know.
              </p>
            </div>
            <Button variant="hero" size="lg" className="w-full" onClick={() => setCreateStep(2)}>
              Generate Wallet
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Save your recovery phrase</h3>
              <p className="text-sm text-muted-foreground">
                Write these 12 words down in order. Never share them with anyone.
              </p>
            </div>
            
            <GlassCard variant="subtle" size="default">
              <div className="grid grid-cols-3 gap-3">
                {mockMnemonic.map((word, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                    <span className="font-mono text-sm text-foreground">{word}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive flex items-start gap-2">
                <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Anyone with this phrase can access your wallet. Store it securely offline.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={savedPhrase}
                onChange={(e) => setSavedPhrase(e.target.checked)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm text-foreground">I have saved this phrase securely</span>
            </label>

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              disabled={!savedPhrase}
              onClick={() => setCreateStep(3)}
            >
              Continue
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Verify your phrase</h3>
              <p className="text-sm text-muted-foreground">
                Enter the words at positions 2, 5, and 9
              </p>
            </div>

            <div className="space-y-4">
              {[2, 5, 9].map((pos, idx) => (
                <div key={pos}>
                  <label className="text-sm text-muted-foreground mb-1 block">Word #{pos}</label>
                  <Input
                    placeholder={`Enter word #${pos}`}
                    value={verifyWords[idx]}
                    onChange={(e) => {
                      const newWords = [...verifyWords];
                      newWords[idx] = e.target.value;
                      setVerifyWords(newWords);
                    }}
                  />
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="w-full" onClick={() => setCreateStep(4)}>
              Verify
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Set a password (optional)</h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security for local access
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Input type="password" placeholder="Confirm password" />
            </div>

            <Button variant="hero" size="lg" className="w-full" onClick={() => setCreateStep(5)}>
              Create Wallet
            </Button>
            <button
              className="w-full text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setCreateStep(5)}
            >
              Skip for now
            </button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Wallet Created Successfully</h3>
              <p className="text-muted-foreground mb-4">
                Your new wallet is ready to use
              </p>
              <div className="p-3 rounded-lg bg-secondary/50 font-mono text-sm text-foreground">
                0x7F3a4B2c8D9E1f6A5B3C2D8E9F1A6B3C8D2E8B2c
              </div>
            </div>
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="w-full gap-2">
                Enter Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        );
    }
  };

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

              <button
                onClick={() => setAuthMethod("create")}
                className="w-full text-primary hover:text-primary/80 transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <Key className="w-4 h-4" />
                I don't have a wallet - Create new
              </button>
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
              Back to options
            </button>
          )}
          
          {authMethod === "create" && createStep > 1 && createStep < 5 && (
            <button
              onClick={() => setCreateStep((createStep - 1) as CreateStep)}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-6"
            >
              Go back
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
