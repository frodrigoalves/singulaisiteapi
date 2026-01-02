import { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/web3/wallet-button";
import { useApp } from "@/contexts/app-context";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo-singulai.png";
import {
  LayoutGrid,
  Coins,
  TrendingUp,
  User,
  Clock,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  ExternalLink,
  Languages,
  LogOut,
} from "lucide-react";

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState("0.00");
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useApp();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  // Carregar wallet do usuario do Supabase
  useEffect(() => {
    async function loadWallet() {
      if (!user) return;
      
      try {
        const { data } = await supabase
          .from("profiles")
          .select("wallet_address")
          .eq("user_id", user.id)
          .single();

        if (data?.wallet_address) {
          setWalletAddress(data.wallet_address);
        }

        // Buscar saldo
        const { data: balanceData } = await supabase
          .from("token_balances")
          .select("balance")
          .eq("user_id", user.id)
          .eq("token_symbol", "SGL")
          .single();

        if (balanceData) {
          setBalance(balanceData.balance.toLocaleString());
        }
      } catch (error) {
        console.error("Error loading wallet:", error);
      }
    }

    loadWallet();
  }, [user]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };

  const handleDisconnectWallet = async () => {
    if (!user) return;

    try {
      await supabase
        .from("profiles")
        .update({ wallet_address: null })
        .eq("user_id", user.id);

      setWalletAddress(null);
      toast({
        title: "Wallet desconectada",
        description: "Sua wallet foi desconectada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Nao foi possivel desconectar a wallet.",
        variant: "destructive",
      });
    }
  };

  const navItems = [
    { labelKey: "sidebar.overview", icon: LayoutGrid, href: "/dashboard" },
    { labelKey: "sidebar.tokens", icon: Coins, href: "/dashboard/tokens" },
    { labelKey: "sidebar.staking", icon: TrendingUp, href: "/dashboard/staking" },
    { labelKey: "sidebar.avatar", icon: User, href: "/dashboard/avatar" },
    { labelKey: "sidebar.timeCapsule", icon: Clock, href: "/dashboard/timecapsule" },
    { labelKey: "sidebar.legacy", icon: Shield, href: "/dashboard/legacy" },
    { labelKey: "sidebar.settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300 flex flex-col",
          sidebarCollapsed ? "w-[72px]" : "w-[280px]"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!sidebarCollapsed && (
            <Link to="/" className="logo-container">
              <img src={logo} alt="SingulAI" className="h-7 w-auto logo-adaptive" />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{t(item.labelKey)}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          {!sidebarCollapsed && user && (
            <div className="px-3 py-2 mb-2">
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          )}

          <Button
            variant="ghost"
            size={sidebarCollapsed ? "icon" : "default"}
            onClick={() => setLanguage(language === "en" ? "pt" : "en")}
            className={cn(
              "text-sidebar-foreground hover:bg-sidebar-accent",
              !sidebarCollapsed && "w-full justify-start"
            )}
          >
            <Languages className="w-5 h-5" />
            {!sidebarCollapsed && (
              <span className="ml-3 text-sm">{language === "en" ? "PT" : "EN"}</span>
            )}
          </Button>

          <Button
            variant="ghost"
            size={sidebarCollapsed ? "icon" : "default"}
            onClick={handleSignOut}
            className={cn(
              "text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive",
              !sidebarCollapsed && "w-full justify-start"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && (
              <span className="ml-3 text-sm">Sair</span>
            )}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarCollapsed ? "ml-[72px]" : "ml-[280px]"
        )}
      >
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <nav className="text-sm">
                <span className="text-muted-foreground">{t("nav.dashboard")}</span>
                {location.pathname !== "/dashboard" && (
                  <>
                    <span className="text-muted-foreground mx-2">/</span>
                    <span className="text-foreground font-medium capitalize">
                      {location.pathname.split("/").pop()}
                    </span>
                  </>
                )}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm w-40 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Button>

              {walletAddress && (
                <a
                  href={`https://basescan.org/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>BaseScan</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <WalletButton
                isConnected={!!walletAddress}
                address={walletAddress || undefined}
                balance={balance}
                network="base"
                onDisconnect={handleDisconnectWallet}
              />
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
