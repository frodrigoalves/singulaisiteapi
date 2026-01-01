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
    
    // Hero
    "hero.badge": "Secured by Ethereum",
    "hero.title1": "The Future of",
    "hero.title2": "Digital Identity",
    "hero.title3": "on Blockchain",
    "hero.description": "SingulAI empowers you to own your digital identity, manage your assets with full custody, and create programmable legacies for the future.",
    "hero.launchApp": "Launch App",
    "hero.whitepaper": "Read Whitepaper",
    "hero.tvl": "Total Value Locked",
    "hero.avatars": "Active Avatars",
    "hero.tokens": "Tokens Distributed",
    "hero.legacy": "Legacy Plans Created",
    "hero.stakingReward": "Staking Reward",
    "hero.timeCapsule": "Time Capsule",
    "hero.opensIn": "Opens in 365d",
    
    // Avatar Cards
    "avatar.familyLegacy": "Family Legacy",
    "avatar.familyDesc": "Preserve precious memories and stories for future generations. Create guided conversations with grandchildren and personalized messages via TimeCapsule.",
    "avatar.personal": "Personal",
    "avatar.mentor": "Professional Mentor",
    "avatar.mentorDesc": "Transform your expertise into an immortal advisor. Preserve know-how, offer virtual consultations, and monetize your knowledge through AvatarPro.",
    "avatar.business": "Business",
    "avatar.fanExp": "Fan Experience",
    "avatar.fanDesc": "Connect with your audience forever. Artists can offer exclusive paid sessions, personalized interactions, and unique experiences powered by SGL tokens.",
    "avatar.creator": "Creator",
    
    // Features
    "features.title1": "Powerful Features for Your",
    "features.title2": "Digital Life",
    "features.description": "Everything you need to manage your digital identity and assets on the blockchain.",
    "features.avatar": "Digital Avatar",
    "features.avatarDesc": "Create your unique blockchain identity. Your avatar represents you in the decentralized world.",
    "features.token": "SGL Token",
    "features.tokenDesc": "Native utility token powering the ecosystem. Stake, transfer, and earn rewards.",
    "features.capsule": "Time Capsule",
    "features.capsuleDesc": "Send messages to the future. Lock content until a specific date with blockchain security.",
    "features.legacy": "Digital Legacy",
    "features.legacyDesc": "Plan your digital inheritance. Ensure your assets reach loved ones automatically.",
    
    // How It Works
    "how.title1": "How It",
    "how.title2": "Works",
    "how.description": "Get started in minutes with our simple three-step process.",
    "how.step1": "Connect or Create Wallet",
    "how.step1Desc": "Use your existing wallet or create a new one in seconds. We support MetaMask, WalletConnect, and more.",
    "how.step2": "Set Up Your Profile",
    "how.step2Desc": "Mint your unique avatar NFT and configure your preferences. Your identity, your rules.",
    "how.step3": "Explore Features",
    "how.step3Desc": "Stake tokens, create time capsules, plan your digital legacy. The blockchain is yours to explore.",
    
    // Security
    "security.badge": "Enterprise-Grade Security",
    "security.title1": "Security",
    "security.title2": "First",
    "security.description": "Your security is our top priority. We employ industry-leading practices to protect your assets.",
    "security.nonCustodial": "Non-Custodial",
    "security.nonCustodialDesc": "You always control your private keys. We never have access to your funds.",
    "security.audited": "Audited Contracts",
    "security.auditedDesc": "All smart contracts are audited by leading security firms.",
    "security.openSource": "Open Source",
    "security.openSourceDesc": "Our code is fully open source and verifiable by anyone.",
    "security.ethereum": "Ethereum Secured",
    "security.ethereumDesc": "Built on Ethereum, the most secure smart contract platform.",
    
    // Tokenomics
    "tokenomics.title": "Tokenomics",
    "tokenomics.description": "A deflationary token model designed for long-term value creation.",
    "tokenomics.totalSupply": "Total Supply",
    "tokenomics.stakingApy": "Staking APY",
    "tokenomics.burnRate": "Burn Rate",
    "tokenomics.vesting": "Vesting Period",
    "tokenomics.distribution": "Token Distribution",
    "tokenomics.community": "Community Rewards",
    "tokenomics.team": "Team & Advisors",
    "tokenomics.ecosystem": "Ecosystem Development",
    "tokenomics.reserve": "Reserve",
    
    // Contact
    "contact.title1": "Get in",
    "contact.title2": "Touch",
    "contact.description": "Have questions about SingulAI? We'd love to hear from you.",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "your@email.com",
    "contact.phone": "Phone",
    "contact.phonePlaceholder": "+55 (00) 00000-0000",
    "contact.subject": "Subject",
    "contact.subjectPlaceholder": "What is this about?",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Tell us more about your inquiry...",
    "contact.emailUs": "Or email us directly at",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.sent": "Message sent",
    "contact.sentDesc": "We'll get back to you soon.",
    
    // CTA
    "cta.title": "Ready to Own Your Digital Future?",
    "cta.description": "Join thousands of users who are already securing their digital identity and assets on the blockchain.",
    "cta.getStarted": "Get Started Now",
    "cta.explore": "Explore Features",
    
    // Footer
    "footer.description": "The future of digital identity on blockchain. Secure, decentralized, and truly yours.",
    "footer.product": "Product",
    "footer.resources": "Resources",
    "footer.community": "Community",
    "footer.legal": "Legal",
    "footer.rights": "All rights reserved.",
    "footer.developedBy": "Developed by",
    "footer.nativeCurrency": "SGL - Native Currency",
    
    // Connect Page
    "connect.welcome": "Welcome to SingulAI",
    "connect.subtitle": "Connect or create a wallet to continue",
    "connect.connectWallet": "Connect Wallet",
    "connect.walletOptions": "MetaMask, WalletConnect, etc.",
    "connect.socialLogin": "Social Login",
    "connect.socialOptions": "Google, Apple",
    "connect.email": "Email",
    "connect.passwordless": "Passwordless login",
    "connect.or": "or",
    "connect.noWallet": "I don't have a wallet - Create new",
    "connect.backToOptions": "Back to options",
    "connect.goBack": "Go back",
    "connect.backToHome": "Back to Home",
    "connect.showMore": "Show more wallets",
    "connect.popular": "Popular",
    "connect.continueGoogle": "Continue with Google",
    "connect.continueApple": "Continue with Apple",
    "connect.walletCreated": "A wallet will be created automatically for you",
    "connect.sendMagicLink": "Send Magic Link",
    "connect.magicLinkDesc": "We'll send you a passwordless login link",
    "connect.createWallet": "Let's create your wallet",
    "connect.createWalletDesc": "A wallet is your digital identity on the blockchain. It's secured by a recovery phrase that only you know.",
    "connect.generateWallet": "Generate Wallet",
    "connect.savePhrase": "Save your recovery phrase",
    "connect.savePhraseDesc": "Write these 12 words down in order. Never share them with anyone.",
    "connect.warning": "Anyone with this phrase can access your wallet. Store it securely offline.",
    "connect.copy": "Copy",
    "connect.downloadPdf": "Download PDF",
    "connect.savedPhrase": "I have saved this phrase securely",
    "connect.continue": "Continue",
    "connect.verifyPhrase": "Verify your phrase",
    "connect.verifyPhraseDesc": "Enter the words at positions 2, 5, and 9",
    "connect.wordNumber": "Word #",
    "connect.enterWord": "Enter word #",
    "connect.verify": "Verify",
    "connect.setPassword": "Set a password (optional)",
    "connect.setPasswordDesc": "Add an extra layer of security for local access",
    "connect.enterPassword": "Enter password",
    "connect.confirmPassword": "Confirm password",
    "connect.skipForNow": "Skip for now",
    "connect.walletSuccess": "Wallet Created Successfully",
    "connect.walletReady": "Your new wallet is ready to use",
    "connect.enterDashboard": "Enter Dashboard",
    
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
    
    // Hero
    "hero.badge": "Protegido por Ethereum",
    "hero.title1": "O Futuro da",
    "hero.title2": "Identidade Digital",
    "hero.title3": "na Blockchain",
    "hero.description": "SingulAI permite que você possua sua identidade digital, gerencie seus ativos com custódia total e crie legados programáveis para o futuro.",
    "hero.launchApp": "Iniciar App",
    "hero.whitepaper": "Ler Whitepaper",
    "hero.tvl": "Valor Total Bloqueado",
    "hero.avatars": "Avatares Ativos",
    "hero.tokens": "Tokens Distribuídos",
    "hero.legacy": "Planos de Legado",
    "hero.stakingReward": "Recompensa Staking",
    "hero.timeCapsule": "Cápsula do Tempo",
    "hero.opensIn": "Abre em 365d",
    
    // Avatar Cards
    "avatar.familyLegacy": "Legado Familiar",
    "avatar.familyDesc": "Preserve memórias preciosas e histórias para futuras gerações. Crie conversas guiadas com netos e mensagens personalizadas via TimeCapsule.",
    "avatar.personal": "Pessoal",
    "avatar.mentor": "Mentor Profissional",
    "avatar.mentorDesc": "Transforme sua expertise em um consultor imortal. Preserve know-how, ofereça consultorias virtuais e monetize seu conhecimento através do AvatarPro.",
    "avatar.business": "Negócios",
    "avatar.fanExp": "Experiência Fandom",
    "avatar.fanDesc": "Conecte-se com seu público para sempre. Artistas podem oferecer sessões pagas exclusivas, interações personalizadas e experiências únicas com tokens SGL.",
    "avatar.creator": "Criador",
    
    // Features
    "features.title1": "Recursos Poderosos para Sua",
    "features.title2": "Vida Digital",
    "features.description": "Tudo que você precisa para gerenciar sua identidade digital e ativos na blockchain.",
    "features.avatar": "Avatar Digital",
    "features.avatarDesc": "Crie sua identidade única na blockchain. Seu avatar representa você no mundo descentralizado.",
    "features.token": "Token SGL",
    "features.tokenDesc": "Token utilitário nativo que alimenta o ecossistema. Faça staking, transfira e ganhe recompensas.",
    "features.capsule": "Cápsula do Tempo",
    "features.capsuleDesc": "Envie mensagens para o futuro. Bloqueie conteúdo até uma data específica com segurança blockchain.",
    "features.legacy": "Legado Digital",
    "features.legacyDesc": "Planeje sua herança digital. Garanta que seus ativos cheguem aos entes queridos automaticamente.",
    
    // How It Works
    "how.title1": "Como",
    "how.title2": "Funciona",
    "how.description": "Comece em minutos com nosso simples processo de três etapas.",
    "how.step1": "Conectar ou Criar Carteira",
    "how.step1Desc": "Use sua carteira existente ou crie uma nova em segundos. Suportamos MetaMask, WalletConnect e mais.",
    "how.step2": "Configure Seu Perfil",
    "how.step2Desc": "Crie seu NFT avatar único e configure suas preferências. Sua identidade, suas regras.",
    "how.step3": "Explore os Recursos",
    "how.step3Desc": "Faça staking de tokens, crie cápsulas do tempo, planeje seu legado digital. A blockchain é sua para explorar.",
    
    // Security
    "security.badge": "Segurança de Nível Empresarial",
    "security.title1": "Segurança",
    "security.title2": "em Primeiro Lugar",
    "security.description": "Sua segurança é nossa maior prioridade. Empregamos práticas líderes da indústria para proteger seus ativos.",
    "security.nonCustodial": "Não-Custodial",
    "security.nonCustodialDesc": "Você sempre controla suas chaves privadas. Nunca temos acesso aos seus fundos.",
    "security.audited": "Contratos Auditados",
    "security.auditedDesc": "Todos os contratos inteligentes são auditados por empresas líderes em segurança.",
    "security.openSource": "Código Aberto",
    "security.openSourceDesc": "Nosso código é totalmente open source e verificável por qualquer pessoa.",
    "security.ethereum": "Protegido por Ethereum",
    "security.ethereumDesc": "Construído no Ethereum, a plataforma de contratos inteligentes mais segura.",
    
    // Tokenomics
    "tokenomics.title": "Tokenomics",
    "tokenomics.description": "Um modelo deflacionário de token projetado para criação de valor a longo prazo.",
    "tokenomics.totalSupply": "Fornecimento Total",
    "tokenomics.stakingApy": "APY Staking",
    "tokenomics.burnRate": "Taxa de Queima",
    "tokenomics.vesting": "Período Vesting",
    "tokenomics.distribution": "Distribuição de Tokens",
    "tokenomics.community": "Recompensas da Comunidade",
    "tokenomics.team": "Equipe & Consultores",
    "tokenomics.ecosystem": "Desenvolvimento do Ecossistema",
    "tokenomics.reserve": "Reserva",
    
    // Contact
    "contact.title1": "Entre em",
    "contact.title2": "Contato",
    "contact.description": "Tem perguntas sobre o SingulAI? Adoraríamos ouvir você.",
    "contact.name": "Nome",
    "contact.namePlaceholder": "Seu nome",
    "contact.email": "Email",
    "contact.emailPlaceholder": "seu@email.com",
    "contact.phone": "Telefone",
    "contact.phonePlaceholder": "+55 (00) 00000-0000",
    "contact.subject": "Assunto",
    "contact.subjectPlaceholder": "Sobre o que é isso?",
    "contact.message": "Mensagem",
    "contact.messagePlaceholder": "Conte-nos mais sobre sua consulta...",
    "contact.emailUs": "Ou envie email diretamente para",
    "contact.send": "Enviar Mensagem",
    "contact.sending": "Enviando...",
    "contact.sent": "Mensagem enviada",
    "contact.sentDesc": "Retornaremos em breve.",
    
    // CTA
    "cta.title": "Pronto para Possuir Seu Futuro Digital?",
    "cta.description": "Junte-se a milhares de usuários que já estão protegendo sua identidade digital e ativos na blockchain.",
    "cta.getStarted": "Começar Agora",
    "cta.explore": "Explorar Recursos",
    
    // Footer
    "footer.description": "O futuro da identidade digital na blockchain. Seguro, descentralizado e verdadeiramente seu.",
    "footer.product": "Produto",
    "footer.resources": "Recursos",
    "footer.community": "Comunidade",
    "footer.legal": "Legal",
    "footer.rights": "Todos os direitos reservados.",
    "footer.developedBy": "Desenvolvido por",
    "footer.nativeCurrency": "SGL - Moeda Nativa",
    
    // Connect Page
    "connect.welcome": "Bem-vindo ao SingulAI",
    "connect.subtitle": "Conecte ou crie uma carteira para continuar",
    "connect.connectWallet": "Conectar Carteira",
    "connect.walletOptions": "MetaMask, WalletConnect, etc.",
    "connect.socialLogin": "Login Social",
    "connect.socialOptions": "Google, Apple",
    "connect.email": "Email",
    "connect.passwordless": "Login sem senha",
    "connect.or": "ou",
    "connect.noWallet": "Não tenho carteira - Criar nova",
    "connect.backToOptions": "Voltar às opções",
    "connect.goBack": "Voltar",
    "connect.backToHome": "Voltar ao Início",
    "connect.showMore": "Mostrar mais carteiras",
    "connect.popular": "Popular",
    "connect.continueGoogle": "Continuar com Google",
    "connect.continueApple": "Continuar com Apple",
    "connect.walletCreated": "Uma carteira será criada automaticamente para você",
    "connect.sendMagicLink": "Enviar Link Mágico",
    "connect.magicLinkDesc": "Enviaremos um link de login sem senha",
    "connect.createWallet": "Vamos criar sua carteira",
    "connect.createWalletDesc": "Uma carteira é sua identidade digital na blockchain. É protegida por uma frase de recuperação que só você conhece.",
    "connect.generateWallet": "Gerar Carteira",
    "connect.savePhrase": "Salve sua frase de recuperação",
    "connect.savePhraseDesc": "Anote estas 12 palavras em ordem. Nunca compartilhe com ninguém.",
    "connect.warning": "Qualquer pessoa com esta frase pode acessar sua carteira. Armazene-a offline com segurança.",
    "connect.copy": "Copiar",
    "connect.downloadPdf": "Baixar PDF",
    "connect.savedPhrase": "Salvei esta frase com segurança",
    "connect.continue": "Continuar",
    "connect.verifyPhrase": "Verifique sua frase",
    "connect.verifyPhraseDesc": "Digite as palavras nas posições 2, 5 e 9",
    "connect.wordNumber": "Palavra #",
    "connect.enterWord": "Digite a palavra #",
    "connect.verify": "Verificar",
    "connect.setPassword": "Definir senha (opcional)",
    "connect.setPasswordDesc": "Adicione uma camada extra de segurança para acesso local",
    "connect.enterPassword": "Digite a senha",
    "connect.confirmPassword": "Confirme a senha",
    "connect.skipForNow": "Pular por enquanto",
    "connect.walletSuccess": "Carteira Criada com Sucesso",
    "connect.walletReady": "Sua nova carteira está pronta para uso",
    "connect.enterDashboard": "Entrar no Painel",
    
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
