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
  Activity
} from "lucide-react";

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
}

interface Metric {
  label: string;
  value: string;
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
      ]
    },
    {
      name: "TimeCapsule",
      icon: Timer,
      endpoints: [
        { method: "GET", path: "/api/v1/timecapsule/info" },
        { method: "GET", path: "/api/v1/timecapsule/user/:address" },
        { method: "GET", path: "/api/v1/timecapsule/capsule/:id" },
      ]
    },
    {
      name: "Legacy",
      icon: ScrollText,
      endpoints: [
        { method: "GET", path: "/api/v1/legacy/info" },
        { method: "GET", path: "/api/v1/legacy/user/:address" },
        { method: "GET", path: "/api/v1/legacy/legacy/:id" },
      ]
    }
  ];

  const contracts: Contract[] = [
    { name: "SGLToken", address: "0xF281a68ae5Baf227bADC1245AC5F9B2F53b7EDe1", integrated: true },
    { name: "AvatarBase", address: "0x95F531cafca627A447C0F1119B8b6aCC730163E5", integrated: true },
    { name: "AvatarWalletLink", address: "0x9F475e5D174577f2FB17a9D94a8093e2D8c9ED41", integrated: false },
    { name: "TimeCapsule", address: "0x6A58aD664071d450cF7e794Dac5A13e3a1DeD172", integrated: true },
    { name: "DigitalLegacy", address: "0x0Ee8f5dC7E9BC9AF344eB987B8363b33E737b757", integrated: true },
  ];

  const metrics: Metric[] = [
    { label: "Total Endpoints", value: "19", icon: Code2 },
    { label: "Módulos", value: "4", icon: Layers },
    { label: "Tempo de Resposta", value: "< 100ms", icon: Activity },
    { label: "Uptime", value: "Persistente", icon: Server },
  ];

  const techStack = [
    { name: "NestJS + TypeScript", icon: Code2 },
    { name: "Swagger API Docs", icon: ScrollText },
    { name: "Sepolia Network", icon: Globe },
    { name: "Systemd Service", icon: Server },
  ];

  const nextSteps = [
    "Next.js 14 + TypeScript",
    "Tailwind CSS + Shadcn/UI",
    "Integração wagmi/viem (Web3)",
    "Dashboard completo",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <Container size="xl">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="SingulAI" className="h-8 md:h-10 w-auto logo-adaptive" />
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
              <span className="text-sm font-medium text-primary">Etapa 3 Completa</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("roadmap.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("roadmap.subtitle")}
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <Clock className="w-4 h-4 inline mr-1" />
              01/01/2026 13:30 BRT | API v2.0.0
            </p>
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

          {/* Tech Stack */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Cpu className="w-6 h-6 text-primary" />
              Stack Técnico
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

          {/* API Modules */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Server className="w-6 h-6 text-primary" />
              API Endpoints (19 rotas)
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

          {/* Smart Contracts */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Database className="w-6 h-6 text-primary" />
              Smart Contracts Integrados
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Contrato</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Endereço</th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((contract, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">{contract.name}</td>
                      <td className="py-4 px-4">
                        <code className="text-xs md:text-sm bg-muted/50 px-2 py-1 rounded font-mono">
                          {contract.address.slice(0, 10)}...{contract.address.slice(-8)}
                        </code>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {contract.integrated ? (
                          <span className="inline-flex items-center gap-1 text-green-500">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Integrado</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-yellow-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">Pendente</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <GitBranch className="w-6 h-6 text-primary" />
              Próxima Etapa: Frontend Dashboard
            </h2>
            <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
              <div className="grid md:grid-cols-2 gap-4">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="p-6 rounded-xl border border-border bg-card/30 flex items-start gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Segurança e Persistência</h3>
              <p className="text-sm text-muted-foreground">
                O serviço API roda via Systemd com auto-restart configurado. CORS está habilitado e a conexão com a rede Sepolia é persistente.
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
