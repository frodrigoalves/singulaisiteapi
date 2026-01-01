import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import tokenomicsChart from "@/assets/tokenomics-chart.png";
import { Coins, TrendingUp, Flame, Lock } from "lucide-react";

const metrics = [
  {
    icon: Coins,
    label: "Total Supply",
    value: "1,000,000,000",
    suffix: "SGL",
  },
  {
    icon: TrendingUp,
    label: "Staking APY",
    value: "Up to 25%",
    suffix: "",
  },
  {
    icon: Flame,
    label: "Burn Rate",
    value: "2%",
    suffix: "per tx",
  },
  {
    icon: Lock,
    label: "Vesting Period",
    value: "24",
    suffix: "months",
  },
];

export function TokenomicsSection() {
  return (
    <Section id="tokenomics" spacing="xl" className="relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
      </div>

      <div className="text-center mb-16">
        <h2 className="text-h2 font-bold text-foreground mb-4">
          <span className="text-gradient">SGL</span> Tokenomics
        </h2>
        <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
          A deflationary token model designed for long-term value creation.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Chart */}
        <div className="relative">
          <GlassCard variant="default" size="lg" className="p-4">
            <img
              src={tokenomicsChart}
              alt="SGL Token Distribution"
              className="w-full h-auto rounded-xl"
            />
          </GlassCard>
        </div>

        {/* Metrics */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <GlassCard
                key={metric.label}
                variant="default"
                size="default"
                hover="glow"
                className="group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <metric.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-xl font-bold text-foreground">
                      {metric.value}
                      {metric.suffix && (
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {metric.suffix}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard variant="subtle" size="default">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Token Distribution</h4>
              <div className="space-y-3">
                {[
                  { label: "Community Rewards", value: "40%", color: "bg-primary" },
                  { label: "Team & Advisors", value: "25%", color: "bg-blue-500" },
                  { label: "Ecosystem Development", value: "20%", color: "bg-accent" },
                  { label: "Reserve", value: "15%", color: "bg-slate-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="flex-1 text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}
