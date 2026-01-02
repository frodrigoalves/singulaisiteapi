import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AddressDisplay } from "@/components/web3/address-display";
import { useApp } from "@/contexts/app-context";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Globe,
  Bell,
  Wallet,
  LogOut,
  Languages,
  Palette,
  Sun,
  Moon,
  Sparkles,
  Check,
  Loader2
} from "lucide-react";

const themes = [
  { id: "light" as const, labelKey: "theme.light", icon: Sun, preview: "bg-white border-gray-200" },
  { id: "dark" as const, labelKey: "theme.dark", icon: Moon, preview: "bg-gray-950 border-gray-800" },
  { id: "cyberpunk" as const, labelKey: "theme.cyberpunk", icon: Sparkles, preview: "bg-purple-950 border-purple-500" },
];

const languages = [
  { id: "en" as const, labelKey: "lang.en", flag: "" },
  { id: "pt" as const, labelKey: "lang.pt", flag: "" },
];

export default function SettingsPage() {
  const { language, setLanguage, theme, setTheme, t } = useApp();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<{
    display_name: string;
    email: string;
    wallet_address: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");

  // Carregar perfil do usuario
  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("display_name, wallet_address")
          .eq("user_id", user.id)
          .single();

        if (data) {
          setProfile({
            display_name: data.display_name || "",
            email: user.email || "",
            wallet_address: data.wallet_address,
          });
          setDisplayName(data.display_name || "");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: displayName })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Perfil atualizado!",
        description: "Suas alteracoes foram salvas.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Nao foi possivel salvar o perfil.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDisconnect = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h3 font-bold text-foreground">{t("settings.title")}</h1>
        <p className="text-muted-foreground mt-1">{t("settings.subtitle")}</p>
      </div>

      {/* Profile */}
      <GlassCard variant="default" size="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">{t("settings.profile")}</h2>
        </div>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">{t("settings.displayName")}</label>
            <Input 
              placeholder={t("settings.displayName")} 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">{t("settings.email")}</label>
            <Input 
              type="email" 
              value={profile?.email || ""} 
              disabled 
              className="opacity-60"
            />
          </div>
          <Button 
            variant="default" 
            onClick={handleSaveProfile}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              t("settings.saveProfile")
            )}
          </Button>
        </div>
      </GlassCard>

      {/* Language */}
      <GlassCard variant="default" size="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Languages className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">{t("settings.language")}</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-md">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id)}
              className={`
                flex items-center gap-4 p-4 rounded-xl border transition-all
                ${language === lang.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-secondary/30 hover:border-primary/50"
                }
              `}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{t(lang.labelKey)}</p>
              </div>
              {language === lang.id && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Theme */}
      <GlassCard variant="default" size="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">{t("settings.theme")}</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`
                relative flex flex-col items-center gap-3 p-6 rounded-xl border transition-all
                ${theme === themeOption.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-secondary/30 hover:border-primary/50"
                }
              `}
            >
              <div className={`w-16 h-16 rounded-xl ${themeOption.preview} border-2 flex items-center justify-center shadow-lg`}>
                <themeOption.icon className={`w-8 h-8 ${
                  themeOption.id === "light" ? "text-gray-700" :
                  themeOption.id === "dark" ? "text-gray-300" :
                  "text-purple-400"
                }`} />
              </div>

              <p className="font-medium text-foreground">{t(themeOption.labelKey)}</p>

              {theme === themeOption.id && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Preferences */}
      <GlassCard variant="default" size="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">{t("settings.preferences")}</h2>
        </div>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">{t("settings.currency")}</label>
            <div className="grid grid-cols-3 gap-2">
              {["USD", "EUR", "BRL"].map((currency) => (
                <button
                  key={currency}
                  className="p-3 rounded-xl border border-border bg-secondary/30 hover:border-primary/50 transition-colors text-foreground font-medium"
                >
                  {currency}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Wallet */}
      <GlassCard variant="default" size="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">{t("settings.wallet")}</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">{t("settings.connectedWallet")}</label>
            {profile?.wallet_address ? (
              <AddressDisplay address={profile.wallet_address} />
            ) : (
              <p className="text-muted-foreground text-sm">Nenhuma carteira conectada</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline">{t("settings.switchWallet")}</Button>
            <Button 
              variant="outline" 
              className="text-destructive hover:text-destructive gap-2"
              onClick={handleDisconnect}
            >
              <LogOut className="w-4 h-4" />
              {t("settings.disconnect")}
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Notifications */}
      <GlassCard variant="default" size="lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">{t("settings.notifications")}</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{t("settings.emailNotifications")}</p>
              <p className="text-sm text-muted-foreground">{t("settings.receiveUpdates")}</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{t("settings.browserNotifications")}</p>
              <p className="text-sm text-muted-foreground">{t("settings.getNotified")}</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{t("settings.transactionAlerts")}</p>
              <p className="text-sm text-muted-foreground">{t("settings.notifyOnTransactions")}</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
