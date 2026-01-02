import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { useApp } from "@/contexts/app-context";
import logo from "@/assets/logo-singulai.png";
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  Server, 
  Database, 
  Shield, 
  Code2, 
  Blocks, 
  Wallet, 
  Timer, 
  ScrollText,
  Cpu,
  Globe,
  Layers,
  GitBranch,
  Activity,
  Fingerprint,
  Eye,
  MapPin,
  Smartphone,
  Mic,
  Zap,
  Lock,
  AlertTriangle,
  User
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface Endpoint {
  method: string;
  path: string;
}

interface Module {
  name: string;
  icon: React.ElementType;
  endpoints: Endpoint[];
}

interface Contract {
  name: string;
  address: string;
  integrated: boolean;
  description: string;
  functions: string[];
}

interface Metric {
  label: string;
  value: string;
  icon: React.ElementType;
}

interface DeviceFeature {
  title: string;
  description: string;
  icon: React.ElementType;
}

const Roadmap = () => {
  const { t } = useApp();

  const apiModules: Module[] = [
    {
      name: "Blockchain",
      icon: Blocks,
      endpoints: [
        { method: "GET", path: "/api/v1/blockchain/health" },
        { method: "GET", path: "/api/v1/blockchain/status" },
        { method: "GET", path: "/api/v1/blockchain/wallet/:address" },
        { method: "GET", path: "/api/v1/blockchain/sgl/info" },
        { method: "GET", path: "/api/v1/blockchain/sgl/balance/:address" },
        { method: "POST", path: "/api/v1/blockchain/sgl/transfer" },
        { method: "POST", path: "/api/v1/blockchain/sgl/mint" },
        { method: "POST", path: "/api/v1/blockchain/sgl/airdrop" },
        { method: "GET", path: "/api/v1/blockchain/avatar/balance/:address" },
        { method: "POST", path: "/api/v1/blockchain/avatar/mint" },
      ]
    },
    {
      name: "Staking",
      icon: Wallet,
      endpoints: [
        { method: "GET", path: "/api/v1/staking/info" },
        { method: "GET", path: "/api/v1/staking/user/:address" },
        { method: "GET", path: "/api/v1/staking/leaderboard" },
        { method: "POST", path: "/api/v1/staking/stake" },
        { method: "POST", path: "/api/v1/staking/unstake" },
        { method: "POST", path: "/api/v1/staking/claim" },
      ]
    },
    {
      name: "TimeCapsule",
      icon: Timer,
      endpoints: [
        { method: "GET", path: "/api/v1/timecapsule/info" },
        { method: "GET", path: "/api/v1/timecapsule/user/:address" },
        { method: "GET", path: "/api/v1/timecapsule/capsule/:id" },
        { method: "POST", path: "/api/v1/timecapsule/create" },
        { method: "POST", path: "/api/v1/timecapsule/unlock/:id" },
      ]
    },
    {
      name: "Legacy",
      icon: ScrollText,
      endpoints: [
        { method: "GET", path: "/api/v1/legacy/info" },
        { method: "GET", path: "/api/v1/legacy/user/:address" },
        { method: "GET", path: "/api/v1/legacy/legacy/:id" },
        { method: "POST", path: "/api/v1/legacy/create" },
        { method: "POST", path: "/api/v1/legacy/execute/:id" },
      ]
    }
  ];

  const contracts: Contract[] = [
    { 
      name: "SGLToken", 
      address: "0xF281a68ae5Baf227bADC1245AC5F9B2F53b7EDe1", 
      integrated: true,
      description: "Token ERC20 principal da plataforma SingulAI",
      functions: ["transfer()", "approve()", "mint()", "burn()"]
    },
    { 
      name: "AvatarBase", 
      address: "0x95F531cafca627A447C0F1119B8b6aCC730163E5", 
      integrated: true,
      description: "Contrato ERC721 para criacao e gerenciamento de avatares",
      functions: ["mint()", "attributes()", "nextId", "tokenURI()"]
    },
    { 
      name: "AvatarWalletLink", 
      address: "0x9F475e5D174577f2FB17a9D94a8093e2D8c9ED41", 
      integrated: true,
      description: "Sistema de vinculacao avatar-carteira",
      functions: ["link()", "ownerOf()", "unlink()", "isLinked()"]
    },
    { 
      name: "TimeCapsule", 
      address: "0x6A58aD664071d450cF7e794Dac5A13e3a1DeD172", 
      integrated: true,
      description: "Capsulas do tempo com unlock temporal",
      functions: ["createCapsule()", "unlockIfReady()", "getCapsule()"]
    },
    { 
      name: "DigitalLegacy", 
      address: "0x0Ee8f5dC7E9BC9AF344eB987B8363b33E737b757", 
      integrated: true,
      description: "Sistema de heranca digital",
      functions: ["createLegacy()", "unlockLegacy()", "addBeneficiary()"]
    },
  ];

  const metrics: Metric[] = [
    { label: "Total Endpoints", value: "25+", icon: Code2 },
    { label: "Modulos", value: "4", icon: Layers },
    { label: "Tempo de Resposta", value: "< 100ms", icon: Activity },
    { label: "Uptime", value: "99.9%", icon: Server },
  ];

  const techStack = [
    { name: "NestJS + TypeScript", icon: Code2 },
    { name: "Swagger API Docs", icon: ScrollText },
    { name: "Sepolia Network", icon: Globe },
    { name: "Systemd Service", icon: Server },
    { name: "Hardhat 2.22.5", icon: Blocks },
    { name: "Solidity 0.8.24", icon: Database },
  ];

  const deviceFeatures: DeviceFeature[] = [
    {
      title: "Biometria Multi-Camadas",
      description: "Leitura facial integrada + sensores de impressao digital 360 graus na empunhadura natural da caneta. Exige posicao correta da mao + digitais + reconhecimento facial simultaneo.",
      icon: Fingerprint
    },
    {
      title: "Reconhecimento Facial",
      description: "Camera no topo da caneta para validacao facial. Usuario precisa olhar diretamente para a lente enquanto segura na posicao de assinatura.",
      icon: Eye
    },
    {
      title: "Geolocalizacao e Rastreamento",
      description: "Captura e envia localizacao exata em tempo real. Alertas automaticos quando usado fora de localidades habituais.",
      icon: MapPin
    },
    {
      title: "Integracao Bluetooth 5.2",
      description: "Sincronizacao em tempo real com app oficial. Notificacoes instantaneas de autenticacoes e tentativas suspeitas.",
      icon: Smartphone
    },
    {
      title: "Autenticacao por Voz",
      description: "Comandos de voz exclusivos para acessibilidade. Sistema de IA reconhece a voz do dono e bloqueia terceiros.",
      icon: Mic
    },
    {
      title: "Deteccao de Fraude",
      description: "Apos 3 tentativas falhas: bloqueio temporario. Apos 5: foto do fraudador + captura de digital + geolocalizacao enviados ao dono.",
      icon: AlertTriangle
    },
    {
      title: "Modo Autodestruicao Digital",
      description: "Auto-wipe remoto em caso de roubo. Limpa todos os dados e torna o dispositivo inutilizavel para terceiros.",
      icon: Zap
    },
    {
      title: "Hardware Wallet Avancada",
      description: "Integracao com Ledger e carteiras cripto. Assinatura digital de contratos importantes na blockchain.",
      icon: Lock
    }
  ];

  const roadmapPhases = [
    {
      phase: "Fase 1",
      title: "Smart Contracts",
      status: "completed",
      items: [
        "SGLToken ERC20 deployado",
        "AvatarBase ERC721 implementado",
        "AvatarWalletLink vinculacao",
        "TimeCapsule com unlock temporal",
        "DigitalLegacy heranca digital",
        "16 testes passando"
      ]
    },
    {
      phase: "Fase 2",
      title: "Backend API",
      status: "completed",
      items: [
        "NestJS + TypeScript",
        "25+ endpoints REST",
        "Swagger documentacao",
        "Integracao Sepolia",
        "Systemd persistente",
        "CORS habilitado"
      ]
    },
    {
      phase: "Fase 3",
      title: "Frontend Dashboard",
      status: "completed",
      items: [
        "React + Vite + TypeScript",
        "Tailwind CSS + Shadcn/UI",
        "wagmi/viem Web3",
        "RainbowKit wallet",
        "Supabase auth",
        "Dashboard completo"
      ]
    },
    {
      phase: "Fase 4",
      title: "Dispositivo Fisico",
      status: "in_progress",
      items: [
        "Design do hardware",
        "Prototipo biometrico",
        "App mobile Bluetooth",
        "Integracao blockchain",
        "Testes de seguranca",
        "Parcerias fabricacao"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <Container size="xl">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3 logo-container">
              <img src={logo} alt="SingulAI" className="h-7 md:h-9 w-auto logo-adaptive" />
            </Link>
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t("nav.backToHome")}
              </Button>
            </Link>
          </nav>
        </Container>
      </header>

      {/* Main Content */}
      <main className="pt-24 md:pt-32 pb-16">
        <Container size="lg">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <GitBranch className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">MVP Completo - Fase 4 em Desenvolvimento</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("roadmap.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Sistema completo de contratos inteligentes para avatares digitais, heranca digital e capsulas do tempo na blockchain Ethereum.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                Solidity 0.8.24
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                Hardhat 2.22.5
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">
                16 Testes Passando
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {metrics.map((metric, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-center"
              >
                <metric.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl md:text-3xl font-bold mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Roadmap Timeline */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
              <GitBranch className="w-6 h-6 text-primary" />
              Fases do Desenvolvimento
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roadmapPhases.map((phase, index) => (
                <GlassCard key={index} variant={phase.status === "in_progress" ? "glow" : "default"} size="default">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      phase.status === "completed" 
                        ? "bg-green-500/20 text-green-400"
                        : "bg-primary/20 text-primary"
                    }`}>
                      {phase.phase}
                    </span>
                    {phase.status === "completed" && (
                      <Check className="w-4 h-4 text-green-400" />
                    )}
                    {phase.status === "in_progress" && (
                      <Clock className="w-4 h-4 text-primary animate-pulse" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-4">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                          phase.status === "completed" ? "bg-green-400" : "bg-primary"
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Cpu className="w-6 h-6 text-primary" />
              Stack Tecnico
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {techStack.map((tech, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/30"
                >
                  <tech.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Contracts Architecture */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Database className="w-6 h-6 text-primary" />
              Arquitetura dos Smart Contracts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contracts.map((contract, index) => (
                <GlassCard key={index} variant="default" size="default">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">{contract.name}</h3>
                    <span className="inline-flex items-center gap-1 text-green-400 text-sm">
                      <Check className="w-4 h-4" />
                      Integrado
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{contract.description}</p>
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Contract Address</p>
                    <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono block overflow-hidden text-ellipsis">
                      {contract.address}
                    </code>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Funcoes Principais</p>
                    <div className="flex flex-wrap gap-1">
                      {contract.functions.map((fn, idx) => (
                        <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-mono">
                          {fn}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* API Modules */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Server className="w-6 h-6 text-primary" />
              API Endpoints ({apiModules.reduce((acc, m) => acc + m.endpoints.length, 0)} rotas)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {apiModules.map((module, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <module.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{module.name} Module</h3>
                    <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {module.endpoints.length} endpoints
                    </span>
                  </div>
                  <div className="space-y-2">
                    {module.endpoints.map((endpoint, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 text-sm font-mono bg-muted/50 px-3 py-2 rounded-lg"
                      >
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          endpoint.method === "GET" 
                            ? "bg-green-500/20 text-green-500" 
                            : "bg-blue-500/20 text-blue-500"
                        }`}>
                          {endpoint.method}
                        </span>
                        <span className="text-muted-foreground truncate">{endpoint.path}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Device Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
                <Fingerprint className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Fase 4 - Em Desenvolvimento</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Caneta SingulAI - Dispositivo de Seguranca Fisica
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                O futuro da autenticacao biometrica portatil. Um dispositivo revolucionario que combina 
                reconhecimento facial, impressao digital dinamica e tecnologia blockchain.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deviceFeatures.map((feature, index) => (
                <GlassCard key={index} variant="default" size="default">
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </GlassCard>
              ))}
            </div>

            {/* Device Highlights */}
            <div className="mt-8 p-6 rounded-xl border border-primary/20 bg-primary/5">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Diferenciais de Seguranca
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="font-medium mb-2">Blindagem Contra Fraudes</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Combinacao obrigatoria de multiplas biometrias</li>
                    <li>Verificacao de posicao natural da mao</li>
                    <li>Deteccao de tentativas suspeitas</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Expansoes Futuras</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Integracao com Ledger e carteiras cripto</li>
                    <li>Assinatura digital de contratos</li>
                    <li>Hardware wallet avancada</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Integracoes Oficiais</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>CNH Digital e passaporte</li>
                    <li>Blockchain juridico</li>
                    <li>Versao premium (titanio, carbono)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="p-6 rounded-xl border border-border bg-card/30 flex items-start gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Seguranca e Persistencia</h3>
              <p className="text-sm text-muted-foreground">
                O servico API roda via Systemd com auto-restart configurado. CORS esta habilitado e a conexao com a rede Sepolia e persistente.
                Todos os contratos foram testados com 16 testes automatizados passando. Licenca MIT.
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link to="/">
              <Button variant="hero" size="lg" className="gap-2">
                <ArrowLeft className="w-5 h-5" />
                {t("nav.backToHome")}
              </Button>
            </Link>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Roadmap;