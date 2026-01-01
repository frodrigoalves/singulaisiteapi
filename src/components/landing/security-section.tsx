import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { ShieldCheck, Lock, Eye, FileCode } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Non-Custodial",
    description: "You always control your private keys. We never have access to your funds.",
  },
  {
    icon: ShieldCheck,
    title: "Audited Contracts",
    description: "All smart contracts are audited by leading security firms.",
  },
  {
    icon: FileCode,
    title: "Open Source",
    description: "Our code is fully open source and verifiable by anyone.",
  },
  {
    icon: Eye,
    title: "Ethereum Secured",
    description: "Built on Ethereum, the most secure smart contract platform.",
  },
];

export function SecuritySection() {
  return (
    <Section id="security" spacing="xl" className="relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <GlassCard variant="glow" size="xl" className="relative overflow-hidden">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-primary to-green-500" />
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            Enterprise-Grade Security
          </div>
          <h2 className="text-h2 font-bold text-foreground mb-4">
            Security <span className="text-gradient">First</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Your security is our top priority. We employ industry-leading practices to protect your assets.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-muted/50 border border-border hover:border-green-500/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                <feature.icon className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
