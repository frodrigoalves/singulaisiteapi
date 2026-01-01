import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "pt";
type Theme = "cyberpunk" | "light" | "dark";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.features": "Features",
    "nav.howItWorks": "How It Works",
    "nav.tokenomics": "Tokenomics",
    "nav.security": "Security",
    "nav.contact": "Contact",
    "nav.dashboard": "Dashboard",
    "nav.launchApp": "Launch App",
    
    // Dashboard sidebar
    "sidebar.overview": "Overview",
    "sidebar.tokens": "Tokens",
    "sidebar.staking": "Staking",
    "sidebar.avatar": "Avatar",
    "sidebar.timeCapsule": "Time Capsule",
    "sidebar.legacy": "Digital Legacy",
    "sidebar.settings": "Settings",
    
    // Dashboard
    "dashboard.welcome": "Welcome back to your SingulAI dashboard",
    "dashboard.sglBalance": "SGL Balance",
    "dashboard.stakedAmount": "Staked Amount",
    "dashboard.pendingRewards": "Pending Rewards",
    "dashboard.nftAvatars": "NFT Avatars",
    "dashboard.claimRewards": "Claim Rewards",
    "dashboard.quickActions": "Quick Actions",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.viewAll": "View All",
    "dashboard.transfer": "Transfer",
    "dashboard.stake": "Stake",
    "dashboard.mintAvatar": "Mint Avatar",
    "dashboard.createCapsule": "Create Capsule",
    
    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Manage your account preferences",
    "settings.profile": "Profile",
    "settings.displayName": "Display Name",
    "settings.email": "Email (for notifications)",
    "settings.saveProfile": "Save Profile",
    "settings.preferences": "Preferences",
    "settings.language": "Language",
    "settings.theme": "Theme",
    "settings.currency": "Currency Display",
    "settings.wallet": "Wallet",
    "settings.connectedWallet": "Connected Wallet",
    "settings.switchWallet": "Switch Wallet",
    "settings.disconnect": "Disconnect",
    "settings.notifications": "Notifications",
    "settings.emailNotifications": "Email Notifications",
    "settings.browserNotifications": "Browser Notifications",
    "settings.transactionAlerts": "Transaction Alerts",
    "settings.receiveUpdates": "Receive updates via email",
    "settings.getNotified": "Get notified in your browser",
    "settings.notifyOnTransactions": "Notify on all transactions",
    
    // Themes
    "theme.light": "White",
    "theme.dark": "Black",
    "theme.cyberpunk": "Cyberpunk",
    
    // Languages
    "lang.en": "English",
    "lang.pt": "Português",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
  },
  pt: {
    // Navigation
    "nav.features": "Recursos",
    "nav.howItWorks": "Como Funciona",
    "nav.tokenomics": "Tokenomics",
    "nav.security": "Segurança",
    "nav.contact": "Contato",
    "nav.dashboard": "Painel",
    "nav.launchApp": "Iniciar App",
    
    // Dashboard sidebar
    "sidebar.overview": "Visão Geral",
    "sidebar.tokens": "Tokens",
    "sidebar.staking": "Staking",
    "sidebar.avatar": "Avatar",
    "sidebar.timeCapsule": "Cápsula do Tempo",
    "sidebar.legacy": "Legado Digital",
    "sidebar.settings": "Configurações",
    
    // Dashboard
    "dashboard.welcome": "Bem-vindo de volta ao seu painel SingulAI",
    "dashboard.sglBalance": "Saldo SGL",
    "dashboard.stakedAmount": "Valor Apostado",
    "dashboard.pendingRewards": "Recompensas Pendentes",
    "dashboard.nftAvatars": "Avatares NFT",
    "dashboard.claimRewards": "Resgatar Recompensas",
    "dashboard.quickActions": "Ações Rápidas",
    "dashboard.recentActivity": "Atividade Recente",
    "dashboard.viewAll": "Ver Tudo",
    "dashboard.transfer": "Transferir",
    "dashboard.stake": "Apostar",
    "dashboard.mintAvatar": "Criar Avatar",
    "dashboard.createCapsule": "Criar Cápsula",
    
    // Settings
    "settings.title": "Configurações",
    "settings.subtitle": "Gerencie suas preferências de conta",
    "settings.profile": "Perfil",
    "settings.displayName": "Nome de Exibição",
    "settings.email": "Email (para notificações)",
    "settings.saveProfile": "Salvar Perfil",
    "settings.preferences": "Preferências",
    "settings.language": "Idioma",
    "settings.theme": "Tema",
    "settings.currency": "Moeda de Exibição",
    "settings.wallet": "Carteira",
    "settings.connectedWallet": "Carteira Conectada",
    "settings.switchWallet": "Trocar Carteira",
    "settings.disconnect": "Desconectar",
    "settings.notifications": "Notificações",
    "settings.emailNotifications": "Notificações por Email",
    "settings.browserNotifications": "Notificações do Navegador",
    "settings.transactionAlerts": "Alertas de Transações",
    "settings.receiveUpdates": "Receber atualizações por email",
    "settings.getNotified": "Receber notificações no navegador",
    "settings.notifyOnTransactions": "Notificar em todas as transações",
    
    // Themes
    "theme.light": "Branco",
    "theme.dark": "Preto",
    "theme.cyberpunk": "Cyberpunk",
    
    // Languages
    "lang.en": "English",
    "lang.pt": "Português",
    
    // Common
    "common.loading": "Carregando...",
    "common.error": "Erro",
    "common.success": "Sucesso",
    "common.cancel": "Cancelar",
    "common.confirm": "Confirmar",
    "common.save": "Salvar",
    "common.delete": "Excluir",
    "common.edit": "Editar",
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("singulai-language");
    return (saved as Language) || "en";
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("singulai-theme");
    return (saved as Theme) || "cyberpunk";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("singulai-language", lang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("singulai-theme", newTheme);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-cyberpunk", "theme-light", "theme-dark");
    root.classList.add(`theme-${theme}`);
    
    // Also toggle dark class for shadcn compatibility
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
