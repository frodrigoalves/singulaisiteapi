import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { ShieldCheck, Lock, Eye, FileCode } from "lucide-react";
import { useApp } from "@/contexts/app-context";

export function SecuritySection() {
  const { t } = useApp();

  const securityFeatures = [
    {
      icon: Lock,
      title: t("security.nonCustodial"),
      description: t("security.nonCustodialDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("security.audited"),
      description: t("security.auditedDesc"),
    },
    {
      icon: FileCode,
      title: t("security.openSource"),
      description: t("security.openSourceDesc"),
    },
    {
      icon: Eye,
      title: t("security.ethereum"),
      description: t("security.ethereumDesc"),
    },
  ];

  return (
    <Section id="security" spacing="xl" className="relative px-4 md:px-0">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <GlassCard variant="glow" size="xl" className="relative overflow-hidden p-4 md:p-8">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-primary to-green-500" />
        
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs md:text-sm font-medium mb-4 md:mb-6">
            <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />
            {t("security.badge")}
          </div>
          <h2 className="text-2xl md:text-h2 font-bold text-foreground mb-3 md:mb-4">
            {t("security.title1")} <span className="text-gradient">{t("security.title2")}</span>
          </h2>
          <p className="text-sm md:text-body-lg text-muted-foreground max-w-2xl mx-auto">
            {t("security.description")}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-muted/50 border border-border hover:border-green-500/30 transition-colors group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-green-500/20 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-green-500/30 transition-colors">
                <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2">{feature.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
