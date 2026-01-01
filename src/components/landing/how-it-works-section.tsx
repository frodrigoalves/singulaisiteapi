import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Wallet, UserCircle, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wallet,
    title: "Connect or Create Wallet",
    description: "Use your existing wallet or create a new one in seconds. We support MetaMask, WalletConnect, and more.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: UserCircle,
    title: "Set Up Your Profile",
    description: "Mint your unique avatar NFT and configure your preferences. Your identity, your rules.",
    gradient: "from-primary to-accent",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Explore Features",
    description: "Stake tokens, create time capsules, plan your digital legacy. The blockchain is yours to explore.",
    gradient: "from-orange-500 to-yellow-500",
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" spacing="xl" className="relative">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[128px] -translate-y-1/2" />

      <div className="text-center mb-16">
        <h2 className="text-h2 font-bold text-foreground mb-4">
          How It <span className="text-gradient">Works</span>
        </h2>
        <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
          Get started in minutes with our simple three-step process.
        </p>
      </div>

      <div className="relative">
        {/* Connection line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <GlassCard
                variant="default"
                size="lg"
                hover="glow"
                className="h-full text-center group"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-sm font-bold text-white shadow-glow-sm`}>
                    {step.number}
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-h4 font-bold text-foreground">{step.title}</h3>
                  <p className="text-body text-muted-foreground">{step.description}</p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
