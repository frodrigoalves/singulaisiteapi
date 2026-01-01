import { Section } from "@/components/layout/section";
import { GlassCard } from "@/components/ui/glass-card";
import { User, Coins, Clock, Shield } from "lucide-react";
import { useApp } from "@/contexts/app-context";

export function FeaturesSection() {
  const { t } = useApp();

  const features = [
    {
      icon: User,
      title: t("features.avatar"),
      description: t("features.avatarDesc"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Coins,
      title: t("features.token"),
      description: t("features.tokenDesc"),
      gradient: "from-primary to-accent",
    },
    {
      icon: Clock,
      title: t("features.capsule"),
      description: t("features.capsuleDesc"),
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      icon: Shield,
      title: t("features.legacy"),
      description: t("features.legacyDesc"),
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <Section id="features" spacing="xl" className="px-4 md:px-0">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-2xl md:text-h2 font-bold text-foreground mb-3 md:mb-4">
          {t("features.title1")}{" "}
          <span className="text-gradient">{t("features.title2")}</span>
        </h2>
        <p className="text-sm md:text-body-lg text-muted-foreground max-w-2xl mx-auto">
          {t("features.description")}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {features.map((feature, index) => (
          <GlassCard
            key={feature.title}
            variant="default"
            size="lg"
            hover="lift"
            className="group relative overflow-hidden p-4 md:p-6"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient accent line */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
            
            <div className="space-y-3 md:space-y-4">
              <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                <feature.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              
              <h3 className="text-sm md:text-h4 font-bold text-foreground">{feature.title}</h3>
              <p className="text-xs md:text-body text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
