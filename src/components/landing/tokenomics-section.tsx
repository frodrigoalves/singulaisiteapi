import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import tokenomicsChart from "@/assets/tokenomics-chart.png";
import { Coins, TrendingUp, Flame, Lock } from "lucide-react";
import { useApp } from "@/contexts/app-context";

export function TokenomicsSection() {
  const { t } = useApp();

  const metrics = [
    {
      icon: Coins,
      label: t("tokenomics.totalSupply"),
      value: "1,000,000,000",
      suffix: "SGL",
    },
    {
      icon: TrendingUp,
      label: t("tokenomics.stakingApy"),
      value: "Up to 25%",
      suffix: "",
    },
    {
      icon: Flame,
      label: t("tokenomics.burnRate"),
      value: "2%",
      suffix: "per tx",
    },
    {
      icon: Lock,
      label: t("tokenomics.vesting"),
      value: "24",
      suffix: "months",
    },
  ];

  const distribution = [
    { label: t("tokenomics.community"), value: "40%", color: "bg-primary" },
    { label: t("tokenomics.team"), value: "25%", color: "bg-blue-500" },
    { label: t("tokenomics.ecosystem"), value: "20%", color: "bg-accent" },
    { label: t("tokenomics.reserve"), value: "15%", color: "bg-slate-500" },
  ];

  return (
    <Section id="tokenomics" spacing="xl" className="relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute top-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-accent/10 rounded-full blur-[128px]" />
      </div>

      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-xl md:text-h2 font-bold text-foreground mb-2 md:mb-4">
          <span className="text-gradient">SGL</span> {t("tokenomics.title")}
        </h2>
        <p className="text-sm md:text-body-lg text-muted-foreground max-w-2xl mx-auto px-4">
          {t("tokenomics.description")}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
        {/* Chart */}
        <div className="relative">
          <GlassCard variant="default" size="lg" className="p-3 md:p-4">
            <img
              src={tokenomicsChart}
              alt="SGL Token Distribution"
              className="w-full h-auto rounded-lg md:rounded-xl"
            />
          </GlassCard>
        </div>

        {/* Metrics */}
        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {metrics.map((metric) => (
              <GlassCard
                key={metric.label}
                variant="default"
                size="default"
                hover="glow"
                className="group p-3 md:p-4"
              >
                <div className="flex items-start gap-2 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors flex-shrink-0">
                    <metric.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground mb-0.5 md:mb-1 truncate">{metric.label}</p>
                    <p className="text-sm md:text-xl font-bold text-foreground">
                      {metric.value}
                      {metric.suffix && (
                        <span className="text-xs md:text-sm font-normal text-muted-foreground ml-1">
                          {metric.suffix}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard variant="subtle" size="default" className="p-3 md:p-4">
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-sm md:text-lg font-semibold text-foreground">{t("tokenomics.distribution")}</h4>
              <div className="space-y-2 md:space-y-3">
                {distribution.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 md:gap-3">
                    <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${item.color}`} />
                    <span className="flex-1 text-xs md:text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-xs md:text-sm font-semibold text-foreground">{item.value}</span>
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
